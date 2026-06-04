// const createError = require("http-errors");
const createError = require("http-errors");
const cloudinary = require("../config/cloudinary");
const HomeImages = require("../models/homeImage.model");
const { successResponse } = require("./response.controller");
const { publicIdWithoutExtensionFromUrl } = require("../helper/cloudinary.helper");



const handleUploadImage = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { section } = req.params;
        const image = req.file?.path;


        if (!image) {
            throw createError(400, 'image not found.');
        }

        let newImage = '';
        if(image){
            const response = await cloudinary.uploader.upload(image, {
                folder: 'Trivon_fashion/home_images'
            }); 
            newImage = response.secure_url;
        }

        const sectionData = {
            slide: false,
            slideBottom: false,
            videoSide: false,
            videoBottom: false,
            bottomBanner: false,
        };

        // dynamic section active
        if (section === 'slide') {
            sectionData.slide = true; 
        }
        if (section === 'slideBottom') {
            sectionData.slideBottom = true; 
        }
        if (section === 'videoSide') {
            sectionData.videoSide = true; 
        }
        if (section === 'videoBottom') {
            sectionData.videoBottom = true; 
        }
        if (section === 'bottomBanner') {
            sectionData.bottomBanner = true; 
        }

        const data = {
            image: newImage,
            section: sectionData
        }
        if(name){
            data.name  = name;
        } 

        // save database
        const uploadImage = await HomeImages.create(data); 

        return successResponse(res, {
            statusCode: 200,
            message: 'image upload successfully.',
            // payload: uploadImage
        });
    } catch (error) {
        next(error);
    }
};


const handleGetImage = async (req, res, next) => {
    try {
        const { section } = req.params;
        let find = {};

        // dynamic section active
        if (section === 'slide') {
            find["section.slide"] = true;
        }
        if (section === 'slideBottom') {
            find["section.slideBottom"] = true;
        }
        if (section === 'videoSide') {
            find["section.videoSide"] = true;
        }
        if (section === 'videoBottom') {
            find["section.videoBottom"] = true;
        }
        if (section === 'bottomBanner') {
            find["section.bottomBanner"] = true;
        }
        console.log(find);

        const images = await HomeImages.find(find).sort({createdAt: -1});

        return successResponse(res, {
            statusCode: 200,
            message: 'Images return successfully.',
            payload: images
        });

    } catch (error) {
        next(error);
    }
};


const handleDeleteImage = async (req, res, next) => {
    try {

        const { id } = req.params;
        console.log(id);

        // delete image
        const deleteImage = await HomeImages.findOneAndDelete({_id: id});
        if(!deleteImage){
            throw createError(404, 'image not found.')
        }

        // product image delete
        if(deleteImage.image){
            const publicId = await publicIdWithoutExtensionFromUrl(deleteImage.image);
            const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/home_images/${publicId}`);

            if(result !== 'ok' && result !== 'not found' ){
                throw createError(404, 'product image was not deleted successfully from cloudinary. Please try again');
            }
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'Image deleted successfully.',
            payload: deleteImage
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { handleUploadImage, handleDeleteImage, handleGetImage }