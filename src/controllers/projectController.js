import * as projectModel from "../models/projectModel.js";
import * as categoryModel from "../models/categoryModel.js";

// GET all projects (list page)
export async function getAllProjects(req, res, next) {
    try {
        const projects =
            await projectModel.getAllProjects();

        res.render("project/list", {
            title: "Projects",
            projects
        });

    } catch (error) {
        next(error);
    }
}

// GET project details page
export async function getProjectById(req, res, next) {
    try {
        const id = req.params.id;

        const project =
            await projectModel.getProjectById(id);

        if (!project) {
            return res.status(404).render("404", {
                title: "Project Not Found"
            });
        }

        const organization =
            await projectModel.getOrganizationByProject(id);

        const categories =
            await projectModel.getCategoriesByProject(id);

        res.render("project/detail", {
            title: project.name,
            project,
            organization,
            categories
        });

    } catch (error) {
        next(error);
    }
}

// SHOW CREATE FORM
export function showCreateForm(req, res) {
    res.render("project/create", {
        title: "Create Project",
        errors: [] // ✅ FIX ADDED
    });
}

// SHOW EDIT FORM
export async function showEditForm(req, res, next) {
    try {
        const id = req.params.id;

        const project =
            await projectModel.getProjectById(id);

        if (!project) {
            return res.status(404).render("404", {
                title: "Project Not Found"
            });
        }

        res.render("project/edit", {
            title: "Edit Project",
            project,
            errors: [] // ✅ FIX ADDED
        });

    } catch (error) {
        next(error);
    }
}

// SHOW ASSIGN CATEGORY FORM
export async function showAssignCategoryForm(req, res, next) {
    try {
        const id = req.params.id;

        const project =
            await projectModel.getProjectById(id);

        if (!project) {
            return res.status(404).render("404", {
                title: "Project Not Found"
            });
        }

        const categories =
            await categoryModel.getAllCategories();

        const assigned =
            await projectModel.getCategoriesByProject(id);

        const assignedCategories = assigned.map(c => c.id);

        res.render("project/assign-category", {
            title: "Assign Categories",
            project,
            categories,
            assignedCategories,
            errors: [] // ✅ FIX ADDED
        });

    } catch (error) {
        next(error);
    }
}