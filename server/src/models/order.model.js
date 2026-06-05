const {Schema, model} = require('mongoose');

const counterSchema = new Schema({
    name: String,
    value: {
        type: Number,
        default: 0,
    },
});

const Counter = model("counter", counterSchema);


const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'user is required.'],
        },
        orderId: {
            type: String,
            unique: true,
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "product",
                },

                quantity: Number,
                description: String,
                name: String,
                color: String,
                size: String,
                image: String,

                price: Number,
                newPrice: Number
            }
        ],
        pricing: {
            subtotal: Number,
            shippingFee: {
                type: Number,
                default: 150
            },
            discount: {
                type: Number,
                default: 0
            },
            total: Number
        },
        orderStatus: {
            type: String,
            enum: [ 
                "initiated",
                "pending",
                "confirmed", 
                "processing", 
                "shipped", 
                "out_for_delivery", 
                "delivered", 
                "completed", 
                "cancelled" 
            ],
            default: "initiated",
        },
        shippingAddress: {
            name: String,
            phone: {
                type: String, 
                required: true
            },
            email: String,

            country: String,
            district: String,
            upazila: String,

            address: String,
            postCode: String
        },
        payment: {
            method: {
                type: String,
                enum: ["sslcommerz", "bkash", "cash_on_delivery" ],
                default: null
            },
            status: {
                type: String,
                enum: ["pending", "paid", "failed", "unpaid"],
                default: "pending"
            },
            transactionId: {
                type: String,
                default: ""
            },
            senderNumber: {
                type: String,
                default: ""
            }
        }        
    }, 
    {timestamps: true}
);


orderSchema.pre("save", async function () {
    if (this.isNew && !this.orderId) {
        const counter = await Counter.findOneAndUpdate(
            { name: "order" },
            { $inc: { value: 1 } },
            { new: true, upsert: true }
        );

        this.orderId = `order-${String(counter.value).padStart(3, "0")}`;
    }
});

const Order = model('order', orderSchema);

module.exports = Order;