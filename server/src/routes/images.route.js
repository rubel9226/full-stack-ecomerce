const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { handleUploadImage, handleDeleteImage, handleGetImage } = require('../controllers/homeImage.controller');
const { uploadProductImage } = require('../middlewares/upload');
const ImageRouter = express.Router();


//  post api/images/:section
ImageRouter.post(
    '/:section',
    uploadProductImage.single('image'),
    isLoggedIn, 
    isAdmin, 
    handleUploadImage
);


//delete api/images/slide-image
ImageRouter.get(
    '/get/:section', 
    handleGetImage
);


//delete api/images/slide-image
ImageRouter.delete(
    '/delete/:id',
    isLoggedIn, 
    isAdmin, 
    handleDeleteImage
);




module.exports = ImageRouter;
