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
            category,
        } = req.body;

        const colors = JSON.parse(req.body.colors || '');
        const sizes = JSON.parse(req.body.sizes || ''); 

        // variants create
        const variants = {};
        if(colors){
            variants.colors = colors.map(color => color.trim()).filter(Boolean);
        }
        if(sizes){
            variants.size = sizes.map(size => size.trim()).filter(Boolean);
        } 

        // image
        const image = req.file?.path;
        if(!image){
            throw createError(400, 'image not found.')
        }

        

        console.log(variants);

        const productData = {
            name,
            description,
            details,
            price,
            discount,
            quantity,
            shipping,
            categorySlug: category,
            image,
            variants
        }; 
        console.log(productData)

        const product = await createProduct(productData);

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
        const sort = req.query.sort || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : null;

        const searchRegExp = new RegExp('.*' + search + '.*', 'i')

        const filter = {
            $or: [
                {name: {$regex: searchRegExp}},
                {slug: {$regex: searchRegExp}},
                {price: Number(search) || 0},
                // {email: {$regex: searchRegExp}},
            ]
        };
        

        if (categorySlug) {
            const categoryDoc = await Category.findOne({ slug: categorySlug});

            if(categoryDoc){
                filter.category = categoryDoc._id;
            }
        }

        // SORT OPTION 
        let sortOption = {};

        if (sort === 'latest') {
            sortOption = { createdAt: -1 };
        }
        else if (sort === 'oldest') {
            sortOption = { createdAt: 1 };
        }
        else if (sort === 'high') {
            sortOption = { newPrice: -1 };
        }
        else if (sort === 'low') {
            sortOption = { newPrice: 1 };
        }
        else if (sort === 'az') {
            sortOption = { name: 1 };
        }
        else if (sort === 'za') {
            sortOption = { name: -1 };
        }
        else { 
            sortOption = { };
        } 

        const {products, count} = await getProducts(page, limit, filter, sortOption);
 
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


// GET -> /api/products/discount/:category
const handleGetDiscountProducts = async (req, res, next) => {
    try {
        const categorySlug = req.params.category;
        const page = parseInt(req.query.page) || 1;
        const limit = req.query.limit
            ? parseInt(req.query.limit)
            : 10;

        console.log(limit);

        // Find Category
        const category = await Category.findOne({
            slug: categorySlug
        });

        // Category not found
        if (!category) {
            throw createError(404, 'category not found.')

        }

        // Filter
        const filter = {
            category: category._id,
            discount: { $gt: 0 }
        };

        // Count Total Products
        const count = await Product.countDocuments(filter);
        // Pagination
        const skip = (page - 1) * limit;
        // Products
        const products = await Product.find(filter)
            .populate('category')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        return successResponse(res, {
            statusCode: 200,
            message: 'Discount products returned successfully',
            payload: {
                products: products,
                pagination: {
                    totalPages: Math.ceil(count/limit),
                    currentPage: page,
                    previousPage: page-1,
                    nextPage: page+1,
                    totalProducts: count,
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

            if(result !== 'ok' && result !== 'not found' ){
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
const handleUpdateProductHomeSection = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { section } = req.query; 

        const product = Product.findOne({slug});
        if(!product){
            throw createError(400, 'Product not found.');
        }

        let updates = {}

        if(section === 'dailyOffer'){
            updates = 
                {
                    $set: {
                       "homeSections.dailyOffer": true
                   }
                }
        } else if(section === 'newCollection'){
            updates = 
                {
                    $set: {
                       "homeSections.newCollection": true
                   }
                }
        } else if(section === 'bagsLuggage'){
            updates = 
                {
                    $set: {
                       "homeSections.bagsLuggage": true
                   }
                }
        } else if(section === 'watch'){
            updates = 
                {
                    $set: {
                       "homeSections.watch": true
                   }
                }
        } else if(section === 'shavingTrimming'){
            updates = 
                {
                    $set: {
                       "homeSections.shavingTrimming": true
                   }
                }
        } else if(section === 'headphones'){
            updates = 
                {
                    $set: {
                       "homeSections.headphones": true
                   }
                }
        }else{
            throw createError(400, 'Section not match.')
        } 

        const updatedProduct = await Product.findOneAndUpdate(
            {slug},
            updates,
            {returnDocument: 'after'}
        )
        
        if(!updatedProduct){
            throw createError(400, 'Adding Field!')
        } 

        return successResponse(res, {
            statusCode: 200,
            message: 'products featured update successfully.',
            payload: updatedProduct
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products/:slug -> update single product
const handleDeleteProductHomeSection = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { section } = req.query; 
        console.log('slug=' + slug, 'section=' + section);

        const product = Product.findOne({slug});
        if(!product){
            throw createError(400, 'Product not found.');
        }

        let updates = {}

        if(section === 'dailyOffer'){
            updates = 
                {
                    $set: {
                       "homeSections.dailyOffer": false
                   }
                }
        } else if(section === 'newCollection'){
            updates = 
                {
                    $set: {
                       "homeSections.newCollection": false
                   }
                }
        } else if(section === 'bagsLuggage'){
            updates = 
                {
                    $set: {
                       "homeSections.bagsLuggage": false
                   }
                }
        } else if(section === 'watch'){
            updates = 
                {
                    $set: {
                       "homeSections.watch": false
                   }
                }
        } else if(section === 'shavingTrimming'){
            updates = 
                {
                    $set: {
                       "homeSections.shavingTrimming": false
                   }
                }
        } else if(section === 'headphones'){
            updates = 
                {
                    $set: {
                       "homeSections.headphones": false
                   }
                }
        }else {
            throw createError(400, 'section not match.')
        }
        console.log(updates);

        const updatedProduct = await Product.findOneAndUpdate(
            {slug},
            updates,
            {returnDocument: 'after'}
        )
        
        if(!updatedProduct){
            throw createError(400, 'Adding Field!')
        } 

        return successResponse(res, {
            statusCode: 200,
            message: 'products featured update successfully.',
            payload: updatedProduct
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products/:slug -> update single product
const handleGetProductHomeSection = async (req, res, next) => {
    try { 
        const { section } = req.query;
        if(!section){
            throw createError(400, 'Enter section.')
        }
        
        let find = {}

        if(section === 'dailyOffer'){
            find = {"homeSections.dailyOffer": true}
        } else if(section === 'newCollection'){
            find = {"homeSections.newCollection": true}
        } else if(section === 'bagsLuggage'){
            find = {"homeSections.bagsLuggage": true}
        } else if(section === 'watch'){
            find = {"homeSections.watch": true}
        } else if(section === 'shavingTrimming'){
            find = {"homeSections.shavingTrimming": true}
        } else if(section === 'headphones'){
            find = {"homeSections.headphones": true}
        } else{
            throw createError(400, 'section not match.')
        }

        const products = await Product.find(find).sort({updatedAt: -1})

        return successResponse(res, {
            statusCode: 200,
            message: 'products return successfully.',
            payload: products
        });
    } catch (error) {
        next(error);
       
    } 
};


// GET -> /api/products/:slug -> update single product
const handleUpdateProduct = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const {
            name, 
            description, 
            price, 
            discount, 
            quantity, 
            sold, 
            shipping, 
            category
        } = req.body;

        console.log(price, discount)

        const colors = JSON.parse(req.body.colors || '[]');
        const sizes = JSON.parse(req.body.sizes || '[]'); 


        // variants create
        const variants = {} ;
        
        if(colors){
            variants.colors = colors.map(color => color.trim()).filter(Boolean);
        }
        if(sizes){
            variants.size = sizes.map(size => size.trim()).filter(Boolean);
        } 
        
        const product = await Product.findOne({slug});
        
        if(name){
            const nameSlug = slugify(name);
            const nameProduct = await Product.findOne({slug: nameSlug});
            
            if(nameProduct){
                throw createError('This name product already exist.')
            }
        }
        
        if(!product){
            throw createError('This Product not found.')
        } 

        console.log(Number(price) < Number(discount))

        if(Number(price) < Number(discount)){ 
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
        };

        if(variants){
            updates.variants = variants;
        }
        
        
        const image = req.file?.path;        
        console.log(updates);

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
                
                if(result !== 'ok' && result !== 'not found' ){
                    throw createError(500, 'product image was not deleted successfully from cloudinary. Please try again');
                }
            }
        }

        console.log(updatedProduct)

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
    handleGetDiscountProducts,
    handleGetProduct,
    handleDeleteProduct,
    handleUpdateProductHomeSection,
    handleDeleteProductHomeSection,
    handleGetProductHomeSection,
    handleUpdateProduct,
};