const {Schema, model} = require('mongoose');

const homeImageSchema = new Schema(
    {
        image: {
            type: String,
            required: [true, 'Category image is required'],
            default: '',
        },
        name: {
            type: String,
            default: 'image',
        },
        section: {
            slide: {
                type: Boolean,
                default: false,
            },
            slideBottom: {
                type: Boolean,
                default: false,
            }, 
            videoSide: {
                type: Boolean,
                default: false,
            }, 
            videoBottom: {
                type: Boolean,
                default: false,
            }, 
            bottomBanner: {
                type: Boolean,
                default: false,
            }, 
        }
    
    }, 
    {timestamps: true}
);


const HomeImages = model('HomeImages', homeImageSchema);

module.exports = HomeImages;