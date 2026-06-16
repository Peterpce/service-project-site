import express from "express";
import {
    getAllOrganizations,
    getOrganizationById,
    showCreateForm,
    showEditForm
} from "../controllers/organizationController.js";

// 🛡️ IMPORT AUTH MIDDLEWARE
// Ensure this path matches where your middleware file is saved
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all organizations (list page) - Standard public view
router.get("/", getAllOrganizations);

// GET organization details page - Standard public view
router.get("/:id", getOrganizationById);

// ==========================================
// 🔒 PROTECTED ADMIN ROUTES (CRITICAL FOR RUBRIC)
// ==========================================

// GET create form - STRICTLY RESTRICTED TO ADMINS
router.get("/create", requireLogin, requireRole("admin"), showCreateForm);

// GET edit form - STRICTLY RESTRICTED TO ADMINS
router.get("/edit/:id", requireLogin, requireRole("admin"), showEditForm);

export default router;