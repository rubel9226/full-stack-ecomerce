const express = require("express");
const categoryRouter = express.Router();

const runValidation = require("../validators"); 
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleAddPopular,
  handleDeletePopular,
  handleGetPopular,
  handleGetRandomCategories,
} = require("../controllers/category.controller");
const { validateCategory } = require("../validators/category");
const { uploadProductImage } = require("../middlewares/upload");

// POST /api/categories
categoryRouter.post(
  "/",
  uploadProductImage.single('image'),
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateCategory,
);

// GET /api/categories
categoryRouter.get("/random-categories", handleGetCategories);

// GET /api/categories get random category.
categoryRouter.get("/", handleGetRandomCategories);

// get single category
categoryRouter.get("/:slug", handleGetCategory);

categoryRouter.put(
  "/:slug",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleUpdateCategory,
);



// add popular category PUT /api/categories/add-popular/?slug
categoryRouter.get(
  "/popular/get-popular",
  handleGetPopular,
);

// add popular category PUT /api/categories/add-popular/?slug
categoryRouter.put(
  "/popular/add-popular/:slug", 
  isLoggedIn,
  isAdmin,
  handleAddPopular,
);

// add popular category PUT /api/categories/add-popular/?slug
categoryRouter.put(
  "/popular/delete-popular/:slug", 
  isLoggedIn,
  isAdmin,
  handleDeletePopular,
);


categoryRouter.delete( "/:slug", isLoggedIn, isAdmin, handleDeleteCategory, );




module.exports = categoryRouter;
