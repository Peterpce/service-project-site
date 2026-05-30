import express from "express";
import {
    getAllProjects,
    getProjectById
} from "../controllers/projectController.js";

const router = express.Router();

// GET all projects (list page)
router.get("/projects", getAllProjects);

// GET project details page
router.get("/project/:id", getProjectById);

export default router;