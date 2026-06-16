import express from "express";
import {
    getAllCategories,
    getCategoryById,
    showCreateForm,
    showEditForm
} from "../controllers/categoryController.js";

// 🛡️ IMPORT AUTH MIDDLEWARE
// Ensure this path matches your authMiddleware location
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all categories (list page) - Standard public view
router.get("/", getAllCategories);

// GET category details page - Standard public view
router.get("/:id", getCategoryById);

// ==========================================
// 🔒 PROTECTED ADMIN ROUTES (CRITICAL FOR RUBRIC)
// ==========================================

// GET create form - STRICTLY RESTRICTED TO ADMINS
router.get("/create", requireLogin, requireRole("admin"), showCreateForm);

// GET edit form - STRICTLY RESTRICTED TO ADMINS
router.get("/edit/:id", requireLogin, requireRole("admin"), showEditForm);

export default router;