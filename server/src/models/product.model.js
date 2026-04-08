const {Schema, model} = require('mongoose');


// name, slug, description, price, quantity, sold, shipping, image, 
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            unique: true, 
            minlength: [3, 'Product name can be minimum 3 characters'],
            maxlenth: [150, 'The length of product name can be maximum 150 characters.'],
        },
        slug: {
            type: String,
            required: [true, 'Product slug is required'],
            lowercase: true,
            unique: true, 
        },
        description: {
            type: String,
            required: [true, 'description slug is required'],
            trim: true,
            minlength: [3, 'Product description can be minimum 3 characters'],
        },
        price: {
            type: Number,
            required: [true, 'description price is required'],
            trim: true,
            validate: {
                validator: (v) => ( v > 0 ),
                message: (props) => 
                    `${props.value} is not a valid price! Price must be greater than 0.`
            },
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
            trim: true,
            validate: {
                validator: (v) => ( v > 0 ),
                message: (props) => 
                    `${props.value} is not a valid quantity! Quantity must be greater than 0.`
            },
        },
        sold: {
            type: Number,
            required: [true, 'sold quantity is required'],
            trim: true,
            default: 0,
            validate: {
                validator: (v) => ( v > 0 ),
                message: (props) => 
                    `${props.value} is not a valid sold quantity! sold quantity must be greater than 0.`
            },
        },
        shipping: {
            type: Number,
            default: 0 // shipping free 0 or paid  something amount.,
        },
    image: {
        type: String,
        default: defaultImagePath
    },
    
    }, 
    {timestamps: true}
);


const Product = model('productSchema', productSchema);

module.exports = Product;