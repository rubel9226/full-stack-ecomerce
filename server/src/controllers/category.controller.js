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

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    await createCategory(name);

    return successResponse(res, {
      statusCode: 201,
      message: "Category was created successfully.",
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
        payload: category
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

    const result = await deleteCategory(slug);
    if(!result){
        throw createError(404, 'No category found and delete.');
    }

    return successResponse(res, {
        statusCode: 200,
        message: 'category delete successfully',
        payload: result
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
    handleDeleteCategory
 };
