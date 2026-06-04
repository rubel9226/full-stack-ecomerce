const slugify = require("slugify");
const createError = require("http-errors");

const { successResponse } = require("./response.controller");
const Category = require("../models/category.model");
const { 
    createCategory, 
    getCategories, 
    getCategory, 
    updateCategory, 
    deleteCategory
} = require("../services/category.service"); 
const cloudinary = require("../config/cloudinary");
const { publicIdWithoutExtensionFromUrl } = require("../helper/cloudinary.helper");
const Product = require("../models/product.model");

const handleCreateCategory = async (req, res, next) => {
  try { 
    const { name } = req.body;
    const slug = slugify(name); 

    const category = await Category.findOne({slug})
    if(category){
      throw createError(400, 'This category already exists.')
    }

    // image
    const image = req.file?.path;
    console.log(image);
    if(!image){
        throw createError(400, 'image not found.')
    }
 

    let newImage = '';
    if(image){
        const response = await cloudinary.uploader.upload(image, {
            folder: 'Trivon_fashion/categories'
        });
        console.log('response: ', response);
        newImage = response.secure_url;
    }

    const newCategory = await Category.create({
      name: name,
      slug: slugify(name),
      image: newImage,
    }); 

    if(!newCategory){ 
        if(newImage){
            const publicId = await publicIdWithoutExtensionFromUrl(newImage);
            const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/categories/${publicId}`);

            if(result !== 'ok' && result !== 'not found' ){
                throw createError(404, 'product image was not deleted successfully from cloudinary. Please try again');
            }
        }
    }

    return successResponse(res, {
      statusCode: 201,
      message: "Category was created successfully.",
      payload: newCategory
    });
  } catch (error) {
    next(error);
  }
};



const handleGetCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();

    return successResponse(res, {
        statusCode: 200,
        message: 'category was fetch return successfully',
        payload: categories
    });
  } catch (error) {
    next(error);
  }
};



const handleGetCategory = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const category = await getCategory(slug);
    if(!category || category.length === 0){
        throw createError(404, 'This category not available.');
    }

    return successResponse(res, {
        statusCode: 200,
        message: 'category was fetch return successfully',
        payload: category[0]
    });
  } catch (error) {
    next(error);
  }
};



const handleUpdateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;

    const category = await updateCategory(slug, name);
    if(!category){
        throw createError(404, 'No category found with this slug.');
    }

    return successResponse(res, {
        statusCode: 200,
        message: 'category updated successfully',
        payload: category
    });
  } catch (error) {
    next(error);
  }
};


const handleDeleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const findCategory =await Category.findOne({slug});
    const products = await Product.find({category: findCategory._id});

    if(products.length !== 0){
      throw createError(400, 'Category not deleted.')
    }

    const category = await deleteCategory(slug);
    if(!category){
        throw createError(404, 'No category found and delete.');
    } 
    
    if(category.image){
        const publicId = await publicIdWithoutExtensionFromUrl(category.image);
        const { result } = await cloudinary.uploader.destroy(`Trivon_fashion/categories/${publicId}`);

        if(result !== 'ok' && result !== 'not found' ){
            throw createError(404, 'product image was not deleted successfully from cloudinary. Please try again');
        }
    } 

    return successResponse(res, {
        statusCode: 200,
        message: 'category delete successfully',
        payload: category
    });
  } catch (error) {
    next(error);
  }
};






// add popular category. 
const handleAddPopular = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { section } = req.query;

        let updateField = '';
        if(section === 'popular'){
            updateField = 'section.isPopular';
        } 
        else if(section === 'gadget'){
            updateField = 'section.isGadget';
        } 
        else if(section === 'unlimitedTop'){
            updateField = 'section.isUnlimitedTop';
        } 
        else if(section === 'unlimitedBottom'){
            updateField = 'section.isUnlimitedBottom';
        } 
        else {
            throw createError(400, 'section not match');
        }

        console.log(updateField)
        

        const category = await Category.findOneAndUpdate(
            { slug },
            {
                $set: {
                    [updateField]: true
                }
            },
            { returnDocument: 'after' }
        );

        console.log(category)

        if(!category){
            throw createError( 404, 'No category found with this slug.' ); 
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'category updated successfully',
            payload: category
        });
    } catch (error) {
        next(error);
    }
};


// add popular category.
const handleDeletePopular = async (req, res, next) => {
  try { 
    const { slug } = req.params;
    const {section} = req.query;
    console.log(section);

    let updateField = '';
    if(section === 'popular'){
        updateField = 'section.isPopular';
    } 
    else if(section === 'gadget'){
        updateField = 'section.isGadget';
    } 
    else if(section === 'unlimitedTop'){
        updateField = 'section.isUnlimitedTop';
    } 
    else if(section === 'unlimitedBottom'){
        updateField = 'section.isUnlimitedBottom';
    } 
    else {
        throw createError(400, 'section not match');
    }

    console.log(updateField);

    const category = await Category.findOneAndUpdate(
      {slug},
      {
          $set: {
              [updateField]: false
          }
      },
      {returnDocument: 'after'}
    ); 

    console.log(category)

    if(!category){
        throw createError(404, 'No category found with this slug.');
    }

    return successResponse(res, {
        statusCode: 200,
        message: 'category updated successfully',
        payload: category
    });
  } catch (error) {
    next(error);
  }
};

// get popular category.
const handleGetPopular = async (req, res, next) => {
  try {
    const {section} = req.query;
    console.log(section);

    let sectionData = { };
    
    if(section === 'popular'){
      sectionData = {'section.isPopular' : true};
    }
    else if(section === 'gadget'){
      sectionData = {'section.isGadget' : true};
    }
    else if(section === 'unlimitedTop'){
      sectionData = {'section.isUnlimitedTop' : true};
    }
    else if(section === 'unlimitedBottom'){
      sectionData = {'section.isUnlimitedBottom' : true};
    } else {
      throw createError(400, 'section not match');
    }

    const category = await Category.find(sectionData).select('name slug image').sort({ updatedAt: -1 }); 

    if(!category){
        throw createError(404, 'No category found with this slug.');
    }

    return successResponse(res, {
        statusCode: 200,
        message: 'category return successfully',
        payload: category
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
    handleCreateCategory,
    handleGetCategories,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategory, 

    handleAddPopular, 
    handleDeletePopular, 
    handleGetPopular
 };
