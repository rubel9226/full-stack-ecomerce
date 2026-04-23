const {Schema, model} = require('mongoose');
const { defaultImagePath } = require('../secret');


// name, slug, description, price, quantity, sold, shipping, image, 
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            unique: true, 
            minlength: [3, 'Product name can be minimum 3 characters'],
            maxlength: [150, 'The length of product name can be maximum 150 characters.'],
        },
        slug: {
            type: String,
            required: [true, 'Product slug is required'],
            lowercase: true,
            unique: true, 
        },
        description: {
            type: String,
            required: [true, 'description is required'],
            trim: true,
            minlength: [3, 'Product description can be minimum 3 characters'],
        },
        details: {
            type: String,
            required: [true, 'Product Details is required'],
            trim: true,
            minlength: [3, 'Product description can be minimum 3 characters'],
        },
        price: {
            type: Number,
            required: [true, ' price is required'],
            trim: true,
            validate: {
                validator: (v) => ( v > 0 ),
                message: (props) => 
                    `${props.value} is not a valid price! Price must be greater than 0.`
            },
        },
        discount: {
            type: Number,
            default: 0
        },
        newPrice: {
            type: Number,
            default: 0
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
            trim: true,
            default: 0,
        },
        shipping: {
            type: Number,
            default: 0 // shipping free 0 or paid  something amount.,
        },
        image: {
            type: String,
            default: defaultImagePath,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: [true, 'image is required.'],
            ref: 'Category',
        }
    }, 
    {timestamps: true}
);

productSchema.pre("save", async function () {
  this.newPrice =
    this.discount > 0 ? this.price - this.discount : this.price;
});

productSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();

  const doc = await this.model.findOne(this.getQuery());


  const price = update.price ?? doc.price;
  const discount = update.discount ?? doc.discount;
  if(discount > price){
    throw new Error("Discount cannot be grater then price")
  }

  update.newPrice =
    discount > 0 ? price - discount : price;

//   next();
});

const Product = model('product', productSchema);

module.exports = Product;