import express from "express";
import {
    getAllProjects,
    getProjectById,
    showCreateForm,
    showEditForm,
    showAssignCategoryForm
} from "../controllers/projectController.js";

// 🛡️ IMPORT AUTH MIDDLEWARE
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/create", requireLogin, requireRole("admin"), showCreateForm);
router.get("/edit/:id", requireLogin, requireRole("admin"), showEditForm);
router.get("/assign-category/:id", requireLogin, requireRole("admin"), showAssignCategoryForm);
router.get("/:id", getProjectById);

export default router;