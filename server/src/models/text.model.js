const {Schema, model} = require('mongoose');

// name, slug, description, price, quantity, sold, shipping, image, 

const productSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'user is required.'],
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: [true, 'user is required.'],
        },
        quantity: {
            type: Number, 
            required: [true, 'quantity is required.']
        },
        totalAmount: {
            type: Number,
            required: [true, 'total amount is required.'],
        },
              
    }, 
    {timestamps: true}
);



const TestModel = model('TestModel', productSchema);

module.exports = TestModel;