const {Schema, model} = require('mongoose');

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
            unique: true, 
            minlength: [3, 'Category name can be minimum 3 characters'],
        },
        slug: {
            type: String,
            required: [true, 'Category slug is required'],
            lowercase: true,
            unique: true, 
        },
        image: {
            type: String,
            required: [true, 'Category image is required'],
            default: '',
        },
        section: {
            isPopular: {
                type: Boolean,
                default: false,
            },
            isUnlimitedTop: {
                type: Boolean,
                default: false,
            },
            isUnlimitedBottom: {
                type: Boolean,
                default: false,
            },
            isGadget: {
                type: Boolean,
                default: false,
            },
        }
    
    }, 
    {timestamps: true}
);


const Category = model('Category', categorySchema);

module.exports = Category;