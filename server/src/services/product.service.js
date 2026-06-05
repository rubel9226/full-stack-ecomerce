const slugify = require("slugify");

const Category = require("../models/category.model");
const createError = require("http-errors");
const Product = require("../models/product.model");
const deleteImage = require("../helper/delete.image");
const cloudinary = require("../config/cloudinary");




const createProduct = async (productData) => {
  const { description, details, price, discount, quantity, shipping, categorySlug, image, variants } = productData;
  let { name } = productData;
  name= name.toLowerCase();

  console.log(variants, 'variants');

  const category = await Category.findOne({slug: categorySlug});
  console.log(category._id);


  const productExists = await Product.exists({ name: name });

  if (productExists) {
    // deleteImage(image);
    throw createError(409, "Product with this name already exists.");
  } 

  let newImage = '';
  if(image){
      const response = await cloudinary.uploader.upload(image, {
          folder: 'Trivon_fashion/products'
      });
      console.log('response: ', response);
      newImage = response.secure_url;
  }

  // create product
  const product = await Product.create({
    name: name,
    slug: slugify(name),
    description: description,
    details: details,
    price: price,
    discount: discount,
    quantity: quantity,
    shipping: shipping,
    category: category._id,
    image: newImage, 
    variants
  });

  console.log(product)

  
  

  return product;
};



const getProducts = async (page, limit, filter ={}, sortOption = {}) => {

  let query = Product.find(filter)
  .populate('category')
  .sort(sortOption);
   

  if(limit) {
    query = query.skip((page - 1) * limit).limit(limit);
  }
  const products = await query; 

  if(!products){
      throw createError(404, 'no products found');
  }

  const count = await Product.countDocuments(filter);
  // const productData = [products, count]
  const productData = {products: products, count: count}

  return productData;
};

module.exports = {
  createProduct,
  getProducts
};
