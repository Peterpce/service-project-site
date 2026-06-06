import express from "express";
import {
    getAllCategories,
    getCategoryById,
    showCreateForm,
    showEditForm
} from "../controllers/categoryController.js";

const router = express.Router();

// GET all categories (list page)
router.get("/", getAllCategories);

// GET create form
router.get("/create", showCreateForm);

// GET category details page
router.get("/:id", getCategoryById);

// GET edit form
router.get("/edit/:id", showEditForm);

export default router;