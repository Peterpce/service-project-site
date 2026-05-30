import express from "express";
import {
    getAllOrganizations,
    getOrganizationById
} from "../controllers/organizationController.js";

const router = express.Router();

// GET all organizations (list page)
router.get("/organizations", getAllOrganizations);

// GET organization details page
router.get("/organization/:id", getOrganizationById);

export default router;