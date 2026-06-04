const createHttpError = require("http-errors");
const Order = require("../models/order.model");

const findOrders = async (search, limit, page, status) => {
    try {
        const searchRegExp = new RegExp('.*' + search + '.*', 'i')
        const filter = { };
        if (search) {

            const searchRegExp = new RegExp(search, 'i');

            filter = {
                $or: [
                    { orderId: { $regex: searchRegExp } },
                    { orderStatus: { $regex: searchRegExp } },
                    { "shippingAddress.name": { $regex: searchRegExp } },
                    { "shippingAddress.phone": { $regex: searchRegExp } },
                    { "payment.status": { $regex: searchRegExp } },
                ]
            };
        };
        // Status Filter
        if (status && status !== "all") {
            filter.orderStatus = status;
        };

        

        const options = {};


        const orders = await Order.find(filter, options)
            .sort({createdAt: -1})
            .limit(limit)
            .skip((page - 1) * limit);

        // const count = await Order.find(filter).countDocuments();
        const count = await Order.countDocuments(filter);
        const statusOrders = await Order.find({});


        // if(!orders || orders.length === 0) throw createHttpError(404, 'no orders found');

        return {
            orders,
            pagination: {
                totalPages: Math.ceil(count / limit), 
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            },
            status: {
                all: statusOrders.length,

                pending: statusOrders.filter(
                    item => item.orderStatus === "pending"
                ).length,

                confirmed: statusOrders.filter(
                    item => item.orderStatus === "confirmed"
                ).length,

                processing: statusOrders.filter(
                    item => item.orderStatus === "processing"
                ).length,

                shipped: statusOrders.filter(
                    item => item.orderStatus === "shipped"
                ).length,

                delivered: statusOrders.filter(
                    item => item.orderStatus === "delivered"
                ).length,

                cancelled: statusOrders.filter(
                    item => item.orderStatus === "cancelled"
                ).length,
            }
        };

    } catch (error) {
        throw error;
    }
}


module.exports =  { findOrders };