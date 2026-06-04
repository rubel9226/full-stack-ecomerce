require('dotenv').config();
const createError = require("http-errors");


const Order = require("../models/order.model");
const { successResponse } = require("./response.controller");
const TestModel = require("../models/text.model");

const SSLCommerzPayment = require('sslcommerz-lts');
const Product = require("../models/product.model");
const Shipping = require("../models/shipping.model");
const sendEmail = require('../helper/sendEmail');
const { findOrders } = require('../services/order.service');




// Create Order
const paymentSLCZ = async (req, res, next) => {
    try {
        const {orderId} = req.body;

        const store_id = process.env.STORE_ID;
        const store_passwd = process.env.STORE_PASSWORD;
        const is_live = process.env.IS_LIVE === 'true';
        
        const order = await Order.findOne({orderId}).select("-createdAt -updatedAt ");
        if (!order) {
            throw createError(404, "Order not found");
        }
        // 🔒 যদি COD বা confirmed হয়ে যায়, block payment
        if (order.payment.method === "cash_on_delivery") {
            throw createError(400, "Order already confirmed by Cash on Delivery");
        }
        // 🔒 যদি already paid হয়
        if (order.orderStatus === "confirmed" || order.payment.status === "paid") {
            throw createError(400, "Order already paid");
        }

        console.log(order._id)


        const data = {
            total_amount: order?.pricing?.total,
            currency: 'BDT',
            tran_id: orderId, // use unique tran_id for each api call
            success_url: `${process.env.BACKEND_URL}/api/orders/payment-sslcommerz/success/${orderId}`,
            fail_url: `${process.env.BACKEND_URL}/api/orders/payment-sslcommerz/fail/${orderId}`,
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(
            store_id, 
            store_passwd, 
            is_live
        );

        const apiResponse = await sslcz.init(data);

        console.log(apiResponse.GatewayPageURL)
        return successResponse(res, {
            statusCode: 200, 
            message: 'orders was return successfully',
            payload: apiResponse.GatewayPageURL
        });
        
    } catch (error) {
        next(error)
    }
};




// Order confirm.
const handlePaymentSuccessSSLCZ = async (req, res, next) => {
    try {
        const {tranId} = req.params;
        console.log(tranId, 'trans id');
        const order = await Order.findOneAndUpdate(
            {orderId: tranId}, 
            {
                payment: {
                    method: 'sslcommerz', 
                    status: 'paid',

                },
                orderStatus: 'pending',
            },
            { new: true }
        );

        // quantity update,
        for (const item of order.products) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        quantity: -item.quantity,
                        sold: item.quantity,
                    }
                }
            );
        }

        console.log(order.products);

        if(!order){
            throw createError(404, "Order not found.");
        }

        // ==== Email Send ====
        const emailData = {
            email: order?.shippingAddress?.email,
            subject: `🎉 Order Confirmed - ${order?.orderId}`,

            html: `
            <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:30px;">
                
                <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.08);">

                    <h2 style="color:#2c3e50; margin-bottom:5px;">
                        Hello ${order?.shippingAddress?.name || "Customer"} 👋
                    </h2>

                    <p style="color:#555;">
                        Thank you for your order! Your payment has been successfully received.
                    </p>

                    <div style="background:#e8f5e9; padding:10px 15px; border-radius:8px; margin:15px 0;">
                        <strong style="color:green; text-align: center;">✅ Order Pending</strong>
                    </div>

                    <hr style="border:none; border-top:1px solid #eee;" />

                    <h3 style="color:#333;">🧾 Order Summary</h3>

                    <p><b>Order ID:</b> ${order?.orderId}</p>
                    <p><b>Status:</b> ${order?.orderStatus}</p>
                    <p><b>Payment Method:</b> SSLCommerz</p>

                    <h3 style="margin-top:20px;">📦 Product Details</h3>

                    ${order?.products?.map(p => `
                        <div style="display:flex; gap:10px; margin-bottom:15px; border:1px solid #eee; padding:10px; border-radius:8px;">
                            <img src="${p.image}" width="70" height="70" style="border-radius:8px; object-fit:cover;" />

                            <div>
                                <p style="margin:0; font-weight:bold;">${p.name}</p>
                                <p style="margin:2px 0; color:#777;">Qty: ${p.quantity}</p>
                                <p style="margin:2px 0; color:#2c3e50;">Price: ৳${p.price}</p>
                            </div>
                        </div>
                    `).join("")}

                    <hr style="border:none; border-top:1px solid #eee;" />

                    <h3>💰 Payment Summary</h3>

                    <p>Subtotal: ৳${order?.pricing?.subtotal}</p>
                    <p>Shipping Fee: ৳${order?.pricing?.shippingFee}</p>
                    <p>Discount: -৳${order?.pricing?.discount}</p>

                    <h2 style="color:green;">
                        Total: ৳${order?.pricing?.total}
                    </h2>

                    <hr style="border:none; border-top:1px solid #eee;" />

                    <h3>🚚 Shipping Address</h3>

                    <p>
                        ${order?.shippingAddress?.address},<br/>
                        ${order?.shippingAddress?.district}, ${order?.shippingAddress?.country}<br/>
                        📞 ${order?.shippingAddress?.phone}
                    </p>

                    <div style="margin-top:20px; padding:10px; background:#f1f1f1; border-radius:8px;">
                        <p style="margin:0; color:#666;">
                            💡 Your order is being processed. You will get another update once it is shipped.
                        </p>
                    </div>

                    <p style="margin-top:25px; color:#888; font-size:12px;">
                        If you have any questions, contact our support team anytime.
                    </p>

                </div>
            </div>
            `
        };

        await sendEmail(emailData); 

        // res.redirect(`${process.env.CLIENT_URL}/dashboard/account/my-orders`);
        res.redirect(`${process.env.CLIENT_URL}/dashboard/payment-success?invoiceNo=${tranId}&tran_status=success`);

    } catch (error) {
        next(error)
    }
};


// Create Order
const handlePaymentFailSSLCZ = async (req, res, next) => {
    try {
        const {tranId} = req.params;
        console.log(tranId, 'trans id');
        const order = await Order.findOneAndUpdate({orderId: tranId}, {
            payment: {
                status: 'failed',

            },
            orderStatus: 'cancelled',
        });
        console.log(order, 'order');


        res.redirect(`${process.env.CLIENT_URL}/dashboard/payment?invoiceNo=${tranId}&tran_status=failed`)
        // res.redirect(`http://localhost:5173/dashboard/my-orders`)
    } catch (error) {
        next(error)
    }
};



const handleCashOnDelivery = async (req, res, next) => {
    try {
        const { orderId } = req.body;


        const order = await Order.findOne({ orderId });

        if (!order) {
            throw createError(404, "Order not found");
        }

        // 🔒 যদি আগেই paid/confirmed হয়ে যায় তাহলে block
        if (order.payment.status === "paid" || order.orderStatus === "confirmed" || order.payment.method === "cash_on_delivery") {
            throw createError(400, "Order already confirmed");
        }
        

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            {
                payment: {
                method: "cash_on_delivery",
                status: "pending",
                },
                orderStatus: "pending",
            },
            { new: true }
        );
                // quantity update,
        for (const item of order.products) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        quantity: -item.quantity,
                        sold: item.quantity,
                    }
                }
            );
        }

                // ==== Email Send ====
        const emailData = {
            email: order?.shippingAddress?.email,
            subject: `🎉 Order Confirmed - ${order?.orderId}`,

            html: `
            <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:30px;">
                
                <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.08);">

                    <h2 style="color:#2c3e50; margin-bottom:5px;">
                        Hello ${order?.shippingAddress?.name || "Customer"} 👋
                    </h2>

                    <p style="color:#555;">
                        Thank you for your order! Your payment has been successfully received.
                    </p>

                    <div style="background:#e8f5e9; padding:10px 15px; border-radius:8px; margin:15px 0;">
                        <strong style="color:green; text-align: center;">✅ Order Pending</strong>
                    </div>

                    <hr style="border:none; border-top:1px solid #eee;" />

                    <h3 style="color:#333;">🧾 Order Summary</h3>

                    <p><b>Order ID:</b> ${order?.orderId}</p>
                    <p><b>Status:</b> ${order?.orderStatus}</p>
                    <p><b>Payment Method:</b> SSLCommerz</p>

                    <h3 style="margin-top:20px;">📦 Product Details</h3>

                    ${order?.products?.map(p => `
                        <div style="display:flex; gap:10px; margin-bottom:15px; border:1px solid #eee; padding:10px; border-radius:8px;">
                            <img src="${p.image}" width="70" height="70" style="border-radius:8px; object-fit:cover;" />

                            <div>
                                <p style="margin:0; font-weight:bold;">${p.name}</p>
                                <p style="margin:2px 0; color:#777;">Qty: ${p.quantity}</p>
                                <p style="margin:2px 0; color:#2c3e50;">Price: ৳${p.price}</p>
                            </div>
                        </div>
                    `).join("")}

                    <hr style="border:none; border-top:1px solid #eee;" />

                    <h3>💰 Payment Summary</h3>

                    <p>Subtotal: ৳${order?.pricing?.subtotal}</p>
                    <p>Shipping Fee: ৳${order?.pricing?.shippingFee}</p>
                    <p>Discount: -৳${order?.pricing?.discount}</p>

                    <h2 style="color:green;">
                        Total: ৳${order?.pricing?.total}
                    </h2>

                    <hr style="border:none; border-top:1px solid #eee;" />

                    <h3>🚚 Shipping Address</h3>

                    <p>
                        ${order?.shippingAddress?.address},<br/>
                        ${order?.shippingAddress?.district}, ${order?.shippingAddress?.country}<br/>
                        📞 ${order?.shippingAddress?.phone}
                    </p>

                    <div style="margin-top:20px; padding:10px; background:#f1f1f1; border-radius:8px;">
                        <p style="margin:0; color:#666;">
                            💡 Your order is being processed. You will get another update once it is shipped.
                        </p>
                    </div>

                    <p style="margin-top:25px; color:#888; font-size:12px;">
                        If you have any questions, contact our support team anytime.
                    </p>

                </div>
            </div>
            `
        };

        await sendEmail(emailData); 
        
        return successResponse(res, {
            statusCode: 200, 
            message: 'orders was updated successfully',
            payload: updatedOrder
        });
    } catch (error) {
        next(error);
    }
};




// Create Order
const handleCreateOrder = async (req, res, next) => {
    try {
        const { products } = req.body;
        const userId = req.user._id;
        const addresses = await Shipping.findOne({userId, isDefault: true}).select("-createdAt -updatedAt");

        console.log(addresses, 'Address');

        const subtotal = products.reduce((sum, item) => {
            return sum + (item.price * item.cartQuantity);
        }, 0);


        const shippingFee = 150;

        const discount = products.reduce((sum, item) => {
            return sum + (item.discount * item.cartQuantity);
        }, 0);

        const totalNewPrice = products.reduce((sum, item) => {
            return sum + (item.newPrice * item.cartQuantity);
        }, 0);
        
        const total = totalNewPrice + shippingFee;

        const details = products.map((item) => item.description);
        console.log(details);

        const modifiedProducts = products.map((item) => ({
            product: item._id,

            quantity: item.cartQuantity,

            name: item.name,
            image: item.image,

            price: item.price,
            newPrice: item.newPrice,

            description: item.description
        }));

        

        const order = await Order.create({
            user:userId, 
            products: modifiedProducts,
            shippingAddress: addresses,

            pricing: {
                subtotal,
                shippingFee: 150,
                discount, 
                total,
            },

            payment: {
                status: 'pending'
            },
            orderStatus: 'initiated'
        });

        
        return successResponse(res, {
            statusCode: 200,
            message: 'products was return successfully',
            payload: order
        });
    } catch (error) {
        next(error);
    } 
};




// get my Order
const handleMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
            orderStatus: {$ne: 'initiated'}
        }).sort({createdAt: -1});
        if(orders.length === 0){
            throw createError(404, 'No order found')
        }

        console.log(orders.length);


        return successResponse(res, {
            statusCode: 200, 
            message: 'orders was return successfully',
            payload: orders
        });
    } catch (error) {
        next(error)
    }
}




// get my Order
const handleGetAllOrders = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const status = req.query.status || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        
        const { orders, pagination, status: orderStatus } = await findOrders(search, limit, page, status);

        console.log(orders);
        console.log(pagination);

        return successResponse(res, {
            statusCode: 200, 
            message: 'orders was return successfully',
            payload: {
                orders,
                pagination,
                status: orderStatus
            }
        });
    } catch (error) {
        next(error)
    }
}


// get Order
const handleGetOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        console.log(orderId);
        
        const order = await Order.findOne({orderId}).select("-createdAt -updatedAt ");
        


        return successResponse(res, {
            statusCode: 200, 
            message: 'Order was return successfully.',
            payload: order
        });
    } catch (error) {
        next(error)
    }
}


// Update Order status.
const handleUpdateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const orderId = req.params.orderId;


        // ===== STATUS MESSAGES =====
        const statusMessages = {
            initiated: {
                title: "📝 Order Initiated",
                message: "Your order has been created successfully."
            },
            pending: {
                title: "⏳ Payment Pending",
                message: "Your payment is waiting for confirmation."
            },
            confirmed: {
                title: "✅ Order Confirmed",
                message: "Your order has been confirmed successfully."
            },
            processing: {
                title: "⚙️ Order Processing",
                message: "Your order is currently being prepared."
            },
            shipped: {
                title: "🚚 Order Shipped",
                message: "Your order has been shipped and is on the way."
            },
            delivered: {
                title: "🎉 Order Delivered",
                message: "Your order has been delivered successfully."
            },
            cancelled: {
                title: "❌ Order Cancelled",
                message: "Your order has been cancelled."
            }
        };

        const order = await Order.findOne({_id: orderId});
        if (!order) {
            throw createError(404, "Order not found.");
        }
        
        
        
        const updatedOrder = await Order.findByIdAndUpdate(
            {_id: orderId}, 
            {orderStatus: status},
            {new: true}
        );
        
        // ===== CURRENT STATUS =====
        const currentStatus = statusMessages[status];

                // ===== SEND EMAIL =====
        if (currentStatus) {

            const emailData = {
                email: updatedOrder?.shippingAddress?.email,

                subject: `${currentStatus.title} - ${updatedOrder?.orderId}`,

                html: `
                <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:30px;">

                    <div style="max-width:600px; margin:auto; background:#fff; padding:25px; border-radius:10px;">

                        <h2 style="color:#2c3e50;">
                            Hello ${updatedOrder?.shippingAddress?.name} 👋
                        </h2>

                        <div style="background:#f1f1f1; padding:15px; border-radius:8px; margin:20px 0;">
                            <h3 style="margin:0;">
                                ${currentStatus.title}
                            </h3>

                            <p style="margin-top:10px; color:#555;">
                                ${currentStatus.message}
                            </p>
                        </div>

                        <hr style="border:none; border-top:1px solid #eee;" />

                        <h3>🧾 Order Details</h3>

                        <p>
                            <b>Order ID:</b> ${updatedOrder?.orderId}
                        </p>

                        <p>
                            <b>Order Status:</b> ${updatedOrder?.orderStatus}
                        </p>

                        <p>
                            <b>Total Amount:</b> ৳${updatedOrder?.pricing?.total}
                        </p>

                        <hr style="border:none; border-top:1px solid #eee;" />

                        <h3>🚚 Shipping Address</h3>

                        <p>
                            ${updatedOrder?.shippingAddress?.address},
                            ${updatedOrder?.shippingAddress?.district},
                            ${updatedOrder?.shippingAddress?.country}
                        </p>

                        <p>
                            📞 ${updatedOrder?.shippingAddress?.phone}
                        </p>

                        <div style="margin-top:20px; padding:12px; background:#f9f9f9; border-radius:8px;">
                            <p style="margin:0; color:#666;">
                                Thank you for shopping with us ❤️
                            </p>
                        </div>

                    </div>
                </div>
                `
            };
            await sendEmail(emailData);
        }


        return successResponse(res, {
            statusCode: 200, 
            message: 'Order was created successfully.',
            payload: updatedOrder
        });
    } catch (error) {
        next(error)
    }
}


// Create Order
const handleDeleteOrder = async (req, res, next) => {
    try {
        
        const orderId = req.params.orderId;
        console.log(orderId, 'orderid')

        const deletedOrder = await Order.findByIdAndDelete({_id: orderId});
        if(!deletedOrder){
            throw createError(400, 'Order not deleted.')
        }

        return successResponse(res, {
            statusCode: 200, 
            message: 'Order successfully deleted.',
            payload: deletedOrder
        });
    } catch (error) {
        next(error)
    }
}


module.exports = {
    paymentSLCZ, 
    handlePaymentSuccessSSLCZ,
    handlePaymentFailSSLCZ,
    handleCashOnDelivery,
    handleCreateOrder,
    handleMyOrders,
    handleGetAllOrders, 
    handleGetOrder, 
    handleUpdateOrderStatus,
    handleDeleteOrder
}