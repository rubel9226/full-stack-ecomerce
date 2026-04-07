const slugify = require("slugify");

const Category = require("../models/category.model");
const createError = require("http-errors");



const createCategory = async (name) => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });
  return newCategory;
};



const getCategories = async () => {
  const category = await Category.find({}).select('name slug').lean();
  return category;
};



const getCategory = async (slug='') => {
  const category = await Category.find({slug}).select('name slug').lean();
  return category;
};



const updateCategory = async (slug='', name='') => {
  const filter = { slug };
  const updates = { $set: {name: name, slug: slugify(name)}};
  const option = { new: true }

  const updateCategory = await Category.findOneAndUpdate(
    filter,
    updates,
    option
  )
  return updateCategory;
};

module.exports = { 
  createCategory, 
  getCategories, 
  getCategory,
  updateCategory
};
