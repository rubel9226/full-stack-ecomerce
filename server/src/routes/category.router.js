const express = require("express");
const categoryRouter = express.Router();

const runValidation = require("../validators");
const uploadUserImage = require("../middlewares/upload");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
} = require("../controllers/category.controller");
const { validateCategory } = require("../validators/category");

// POST /api/categories
categoryRouter.post(
  "/",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateCategory,
);

// GET /api/categories
categoryRouter.get("/", handleGetCategories);

categoryRouter.get("/:slug", handleGetCategory);

categoryRouter.put(
  "/:slug",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleUpdateCategory,
);

module.exports = categoryRouter;
