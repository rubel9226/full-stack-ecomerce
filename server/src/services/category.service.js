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
  const categories = await Category
    .find({})
    .lean();

    categories.sort((a, b) => {
      if (a.slug === 'clothing-and-fashion') return -1;
      if (b.slug === 'clothing-and-fashion') return 1;

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  return categories;
};



const getCategory = async (slug='') => {
  const category = await Category.find({slug}).select('name slug section').lean();
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



const deleteCategory = async (slug='') => {
  const result = await Category.findOneAndDelete({slug});
  return result;
};

module.exports = { 
  createCategory, 
  getCategories, 
  getCategory,
  updateCategory,
  deleteCategory
};
