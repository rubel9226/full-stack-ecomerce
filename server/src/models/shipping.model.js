const {Schema, model} = require('mongoose');
const { defaultImagePath } = require('../secret');


const shippingAddress = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, 'User id is required.']
        },
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            lowercase: true,
            minlength: [3, 'Product name can be minimum 3 characters'],
            maxlength: [150, 'The length of product name can be maximum 150 characters.'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator:  (v) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: 'Please enter a valid email',
            }
        },
        phone: {
            type: Number,
            required: [true, 'Phone number is required.'],
            minlength: [10, 'Phone number can be minimum 3 characters'],
            maxlength: [11, 'The length of phone number can be maximum 150 characters.'],
        },
        country: {
            type: String, 
            default: 'bangladesh',
        },
        district: {
            type: String,
            required: [true, 'district is required.'],
        },
        area: {
            type: String,
            required: [true, 'upazilla is required.'],
        },
        postCode: {
            type: Number,
            default: 0
        },
        address: {
            type: String,
            lowercase: true,
            required: [true, 'address is required.'],
            minlength: [3, 'upazilla can be minimum 3 characters'],
            maxlength: [150, 'The length of upazilla can be maximum 150 characters.'],
        },
        location: {
            type: String,
            default: 'Home'
        },
        isDefault: {
            type: Boolean, 
            default: true,
        }
    }, 
    {timestamps: true}
);

const Shipping = model('shippingAddress', shippingAddress);

module.exports = Shipping;