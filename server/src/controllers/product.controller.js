const createError = require('http-errors'); 
const mongoose = require('mongoose');
const slugify = require('slugify')


const { successResponse } = require('./response.controller');
const { findWithId } = require('../services/find.item');
const deleteImage = require('../helper/delete.image');
const Product = require('../models/product.model');
const { createProduct, getProducts } = require('../services/product.service');
const { publicIdWithoutExtensionFromUrl } = require('../helper/cloudinary.helper');
const cloudinary = require('../config/cloudinary');
const Category = require('../models/category.model');



const handleCreateProduct = async (req, res, next) => {
    try {
        const {
            name, 
            description,
            details,
            price,
            discount,
            quantity, 
            shipping,
            category
        } = req.body;
        
        // add new image
        const image = req.file?.path;
        if(image && image.size > 1024 * 1024 * 2){
            throw createError(400, 'File too large. It must be less then 2 MB')
        }


        const productData = { name, description, details, price, discount, quantity, shipping, category, image }

        const product = await createProduct(productData)


        return successResponse(res, {
            statusCode: 200, 
            message: 'Product was created successfully.',
            payload: product
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products -> get all products
const handleGetProducts = async (req, res, next) => {
    try {
        const categorySlug = req.query.category || '';
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : null;

        const searchRegExp = new RegExp('.*' + search + '.*', 'i')
        const filter = {
            isAdmin: {$ne: true},
            $or: [
                {name: {$regex: searchRegExp}},
                // {email: {$regex: searchRegExp}},
            ]
        };
        console.log(categorySlug);
        console.log(page);

        if (categorySlug) {
            const categoryDoc = await Category.findOne({ slug: categorySlug});

            if(categoryDoc){
                filter.category = categoryDoc._id;
            }
        }

        const {products, count} = await getProducts(page, limit, filter);
        
        return successResponse(res, {
            statusCode: 200,
            message: 'products was return successfully',
            payload: {
                products: products,
                pagination: {
                    totalPages: Math.ceil(count/limit),
                    currentPage: page,
                    previousPage: page-1,
                    nextPage: page+1,
                    totalNumberOfProducts: count,
                }
             }
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products/:slug -> get single product
const handleGetProduct = async (req, res, next) => {
    try {
        const slug = req.params.slug
        const product = await Product.findOne({slug}).populate('category');
        
        if(!product){
            throw createError(400, 'This product not available.')
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'product was return successfully',
            payload: product
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products/:slug -> get single product
const handleDeleteProduct = async (req, res, next) => {
    try {
        const slug = req.params.slug
        const product = await Product.findOne({slug});
        console.log(product)
        
        if(!product){
            throw createError(400, 'This product not available.')
        }

        // product image delete
        if(product.image){
            const publicId = await publicIdWithoutExtensionFromUrl(product.image);
            const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/products/${publicId}`);

            if(result !== 'ok'){
                throw createError(404, 'product image was not deleted successfully from cloudinary. Please try again');
            }
        }
        
        const deleteProduct = await  Product.findOneAndDelete({slug});

        return successResponse(res, {
            statusCode: 200,
            message: 'products deleted successfully',
            payload: deleteProduct
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products/:slug -> update single product
const handleUpdateProduct = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const {name, description, price, discount, quantity, sold, shipping, category} = req.body

        const product = await Product.findOne({slug});
        if(!product){
            throw createError('This Product not found.')
        }

        if(product.price < discount){
            throw new Error("Discount not be greater than price")
        }

        const updateOptions = { returnDocument: 'after', runValidators: true, context: 'query'};
        const updates = {};

        const filter = { slug };
        
        // jei jei field ache .
        // name, description, price, quantity, sold, shipping, category
        const updateFields = [
            'name',
            'description', 
            'price',
            'discount',
            'sold', 
            'quantity', 
            'shipping'
        ];

        for(const key in req.body){
            if(updateFields.includes(key)){
                if(key === 'name'){
                    updates.slug = slugify(name)
                }
                updates[key] = req.body[key];
            }
        }
        
        

        const image = req.file?.path;
        if(image){
            if(image.size > 2097152){
                throw createError(400, 'File too large. it must be less than 2 MB');
            }
            const response = await cloudinary.uploader.upload(image, {
                folder: 'Trivon_fashion/products',
            });
            updates.image = response.secure_url;

            // // This image upload on server.
            // updates.image = image;
            // image !== 'default.png' && deleteImage(product.image)
        };

        const updatedProduct = await Product.findOneAndUpdate(
            filter, 
            updates, 
            updateOptions
        );

        if(!updatedProduct){
            throw createError(404, 'updating product was not possible');
        }

        if(image){
            if(product.image){
                console.log(product.image)
                const publicId = await publicIdWithoutExtensionFromUrl(product.image);
                console.log(`Trivon_fashion/products/${publicId}`);
                const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/products/${publicId}`);
                
                if(result !== 'ok'){
                    throw createError(404, 'product image was not deleted successfully from cloudinary. Please try again');
                }
            }
        }

        

        return successResponse(res, {
            statusCode: 200,
            message: 'products update successfully',
            payload: updatedProduct
        });
    } catch (error) {
        next(error);
       
    } 
};



module.exports = { 
    handleCreateProduct,
    handleGetProducts,
    handleGetProduct,
    handleDeleteProduct,
    handleUpdateProduct
};