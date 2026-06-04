const express = require('express');
const productRouter = express.Router();

const runValidation = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { 
    handleCreateProduct, 
    handleGetProducts, 
    handleGetProduct, 
    handleUpdateProduct, 
    handleDeleteProduct,
    handleUpdateProductHomeSection,
    handleGetProductHomeSection,
    handleDeleteProductHomeSection,
    handleGetDiscountProducts, 
     } = require('../controllers/product.controller');
const { validateProduct } = require('../validators/product');
const { uploadProductImage } = require('../middlewares/upload');




// post api/products
productRouter.post(
    '/', 
    uploadProductImage.single('image'),
    validateProduct,
    runValidation,
    isLoggedIn,
    isAdmin,
    handleCreateProduct
);


// GET api/products -> get all products
productRouter.get( '/', handleGetProducts );


// GET api/products/discount/:slug -> get discount products
productRouter.get( '/discount/:category', handleGetDiscountProducts );



// GET api/products -> get single product
productRouter.get( '/:slug', handleGetProduct );




// DELETE api/products/:slug -> delete single product
productRouter.delete( '/:slug', isLoggedIn, isAdmin, handleDeleteProduct );



// home section.
// put api/products/home-sections/ -> get single product home-sections
productRouter.get( 
    '/home-sections/all-product',
    handleGetProductHomeSection
);
// put api/products/home-sections/:slug -> update single product home-sections
productRouter.put( 
    '/home-sections/:slug',
    isLoggedIn,
    isAdmin,
    handleUpdateProductHomeSection
);
// put api/products/home-sections/delete/:slug -> update single product home-sections
productRouter.put( 
    '/home-sections/delete/:slug',
    isLoggedIn,
    isAdmin,
    handleDeleteProductHomeSection
);





// put api/products/:slug -> update single product
productRouter.put( 
    '/:slug',
    uploadProductImage.single('image'),
    isLoggedIn,
    isAdmin,
    handleUpdateProduct
);





module.exports = productRouter;