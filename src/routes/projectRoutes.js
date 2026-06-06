import express from "express";
import {
    getAllProjects,
    getProjectById,
    showCreateForm,
    showEditForm,
    showAssignCategoryForm
} from "../controllers/projectController.js";

const router = express.Router();

// GET all projects (list page)
router.get("/", getAllProjects);

// GET create form
router.get("/create", showCreateForm);

// GET project details page
router.get("/:id", getProjectById);

// GET edit form
router.get("/edit/:id", showEditForm);

// GET assign category page (VERY IMPORTANT)
router.get("/assign-category/:id", showAssignCategoryForm);

export default router;