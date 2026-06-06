import express from "express";
import {
    getAllOrganizations,
    getOrganizationById,
    showCreateForm,
    showEditForm
} from "../controllers/organizationController.js";

const router = express.Router();

// GET all organizations (list page)
router.get("/", getAllOrganizations);

// GET create form
router.get("/create", showCreateForm);

// GET organization details page
router.get("/:id", getOrganizationById);

// GET edit form
router.get("/edit/:id", showEditForm);

export default router;