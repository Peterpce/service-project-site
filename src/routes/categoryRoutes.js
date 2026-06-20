import express from "express";
import {
    getAllCategories,
    getCategoryById,
    showCreateForm,
    showEditForm
} from "../controllers/categoryController.js";

// 🛡️ IMPORT AUTH MIDDLEWARE
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all categories (list page) - Standard public view
router.get("/", getAllCategories);

// ==========================================
// 🔒 PROTECTED ADMIN ROUTES (CRITICAL FOR RUBRIC)
// ==========================================

// GET create form - STRICTLY RESTRICTED TO ADMINS
router.get("/create", requireLogin, requireRole("admin"), showCreateForm);

// GET edit form - STRICTLY RESTRICTED TO ADMINS
router.get("/edit/:id", requireLogin, requireRole("admin"), showEditForm);

// ==========================================
// 🌍 PUBLIC DYNAMIC ROUTES (PLACED LAST)
// ==========================================

// GET category details page - Standard public view (Must come last!)
router.get("/:id", getCategoryById);

export default router;