import express from "express";
import { getAllCategories, getCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

// GET all categories (list page)
router.get("/categories", getAllCategories);

// GET category details page
router.get("/category/:id", getCategoryById);

export default router;