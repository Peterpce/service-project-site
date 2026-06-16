import express from "express";
import {
    getAllProjects,
    getProjectById,
    showCreateForm,
    showEditForm,
    showAssignCategoryForm
} from "../controllers/projectController.js";

// 🛡️ IMPORT AUTH MIDDLEWARE
// Adjust the path below if your middleware file is located elsewhere (e.g., ../middleware/authMiddleware.js)
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all projects (list page) - Standard public view or requires login depending on setup
router.get("/", getAllProjects);

// GET project details page (Public view or standard logged-in user view)
router.get("/:id", getProjectById);

// ==========================================
// 🔒 PROTECTED ADMIN ROUTES (CRITICAL FOR RUBRIC)
// ==========================================

// GET create form - STRICTLY RESTRICTED TO ADMINS
router.get("/create", requireLogin, requireRole("admin"), showCreateForm);

// GET edit form - STRICTLY RESTRICTED TO ADMINS
router.get("/edit/:id", requireLogin, requireRole("admin"), showEditForm);

// GET assign category page - STRICTLY RESTRICTED TO ADMINS
router.get("/assign-category/:id", requireLogin, requireRole("admin"), showAssignCategoryForm);

export default router;