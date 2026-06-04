const createError = require('http-errors'); 
const mongoose = require('mongoose');


const { successResponse } = require('./response.controller');
const Shipping = require('../models/shipping.model');
const { findWithId } = require('../services/find.item');




const handleCreateShipping = async (req, res, next) => {
    try {
        const {name, phone, email, district, area, postCode, address} = req.body;
        const userId = req.user._id;

        const data = {
            userId, 
            name, 
            phone, 
            email,
            district, 
            area, 
            postCode, 
            address
        };

        await Shipping.updateMany(
            { userId },
            { isDefault: false }
        );
        
        const shipping = await Shipping.create({ ...data });


        return successResponse(res, {
            statusCode: 201, 
            message: 'Shipping address created successfully.',
            payload: shipping
        });
    } catch (error) {
        next(error);       
    } 
};


// GET -> /api/products -> get all products
const handleGetShipping = async (req, res, next) => {
    try {
        const {_id} = req.user;
        const addresses = await Shipping.find({userId: _id});

        return successResponse(res, {
            statusCode: 200,
            message: 'address was return successfully',
            payload: addresses,
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products -> get all products
const handleGetShippingActive = async (req, res, next) => {
    try {
        const {_id} = req.user;
        const addresses = await Shipping.findOne({userId: _id, isDefault: true});

        return successResponse(res, {
            statusCode: 200,
            message: 'active address was return successfully',
            payload: addresses,
        });
    } catch (error) {
        next(error);
       
    } 
};



// PUT -> /api/shipping/:userId
const handleUpdateShippingActive = async (req, res, next) => {
    try {
        const {userId} = req.params;

        const updateOptions = { new: true };
        const updates = {};

        const allowedFields = ['name', 'phone', 'email', 'district', 'area', 'postCode', 'address', 'location'];
        for(const key in req.body){
            if( allowedFields.includes(key) ){
                updates[key] = req.body[key];
            }
        }
        

        const addresses = await Shipping.findOneAndUpdate(
            {userId, isDefault: true}, 
            { $set: updates}, 
            updateOptions
        );

        return successResponse(res, {
            statusCode: 200,
            message: 'address was active successfully',
            payload: addresses,
        });
    } catch (error) {
        next(error);
       
    } 
};



// PUT -> /api/shipping/:userId
const handleUpdateStatus = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const {id} = req.params;

        await Shipping.updateMany(
            { userId },
            { isDefault: false }
        );

        const addresses = await Shipping.findByIdAndUpdate(
            id,
            { isDefault: true },
            { new: true }
        );

        return successResponse(res, {
            statusCode: 200,
            message: 'Address was update successfully',
            payload: addresses,
        });
    } catch (error) {
        next(error);
       
    } 
};



// PUT -> /api/shipping/:userId
const handleDeleteShipping = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const {id} = req.params;

        const selectAddress = await Shipping.findById( id );
        if(!selectAddress){
            throw createError(404, "Shipping not found.")
        }else if(selectAddress.isDefault){
            throw createError(404, "Active address can't delete.")
        }
        
        const addresses = await Shipping.findByIdAndDelete(
            id,
            { isDefault: true },
        );

        return successResponse(res, {
            statusCode: 200,
            message: 'Address was delete successfully',
            payload: addresses,
        });
    } catch (error) {
        next(error);
       
    } 
};


// // GET -> /api/products/:slug -> get single product
// const handleDeleteProduct = async (req, res, next) => {
//     try {
//         const slug = req.params.slug
//         const product = await Product.findOne({slug});
//         console.log(product)
        
//         if(!product){
//             throw createError(400, 'This product not available.')
//         }

//         // product image delete
//         if(product.image){
//             const publicId = await publicIdWithoutExtensionFromUrl(product.image);
//             const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/products/${publicId}`);

//             if(result !== 'ok' && result !== 'not found' ){
//                 throw createError(404, 'product image was not deleted successfully from cloudinary. Please try again');
//             }
//         }
        
//         const deleteProduct = await  Product.findOneAndDelete({slug});

//         return successResponse(res, {
//             statusCode: 200,
//             message: 'products deleted successfully',
//             payload: deleteProduct
//         });
//     } catch (error) {
//         next(error);
       
//     } 
// };


module.exports = { 
    handleCreateShipping,
    handleGetShipping,
    handleGetShippingActive,
    handleUpdateShippingActive, 
    handleUpdateStatus,
    handleDeleteShipping
};