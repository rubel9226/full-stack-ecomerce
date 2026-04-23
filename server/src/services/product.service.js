const slugify = require("slugify");

const Category = require("../models/category.model");
const createError = require("http-errors");
const Product = require("../models/product.model");
const deleteImage = require("../helper/delete.image");
const cloudinary = require("../config/cloudinary");




const createProduct = async (productData) => {
  const { description, details, price, discount, quantity, shipping, category, image } = productData;
  let { name } = productData;
  name= name.toLowerCase();


  const productExists = await Product.exists({ name: name });

  if (productExists) {
    // deleteImage(image);
    throw createError(409, "Product with this name already exists.");
  }

  console.log('image is: ', image);
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
    category: category,
    image: newImage
  });

  
  

  return product;
};



const getProducts = async (page, limit, filter ={}) => {

  let query = Product.find(filter)
  .populate('category')
  .sort({createdAt: -1});
   
  console.log(limit)

  if(limit) {
    query = query.skip((page - 1) * limit).limit(limit);
  }
  const products = await query;



  // const products = await Product.find(filter)
  //     .populate('category')
  //     .skip(page-1)
  //     .limit(limit)
  //     .sort({createdAt: -1});

  if(!products){
      throw createError(404, 'no products found');
  }

  const count = await Product.countDocuments(filter);
  // const productData = [products, count]
  const productData = {products: products, count: count}

  // const {products2, count2} = productData;

  // console.log('productData', products2, 'and', count2)

  return productData;
};

module.exports = {
  createProduct,
  getProducts
};
