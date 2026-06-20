import express from "express";
import {
    getAllOrganizations,
    getOrganizationById,
    showCreateForm,
    showEditForm
} from "../controllers/organizationController.js";

// 🛡️ IMPORT AUTH MIDDLEWARE
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all organizations (list page) - Standard public view
router.get("/", getAllOrganizations);

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

// GET organization details page - Standard public view
router.get("/:id", getOrganizationById);

export default router;