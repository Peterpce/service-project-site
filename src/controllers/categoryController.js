import * as categoryModel from "../models/categoryModel.js";

// GET all categories (list page)
export async function getAllCategories(req, res, next) {
    try {
        const categories =
            await categoryModel.getAllCategories();

        res.render("category/list", {
            title: "Categories",
            categories
        });

    } catch (error) {
        next(error);
    }
}

// GET category details page
export async function getCategoryById(req, res, next) {
    try {
        const id = req.params.id;

        const category =
            await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).render("404", {
                title: "Category Not Found"
            });
        }

        const projects =
            await categoryModel.getProjectsByCategory(id);

        res.render("category/detail", {
            title: category.name,
            category,
            projects
        });

    } catch (error) {
        next(error);
    }
}

// SHOW CREATE FORM
export function showCreateForm(req, res) {
    res.render("category/create", {
        title: "Create Category",
        errors: [] 
    });
}

// SHOW EDIT FORM
export async function showEditForm(req, res, next) {
    try {
        const id = req.params.id;

        const category =
            await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).render("404", {
                title: "Category Not Found"
            });
        }

        // Updated to pass 'success' variable required by edit.ejs line 19
        res.render("category/edit", {
            title: "Edit Category",
            category,
            errors: [],
            success: null // ✅ FIX ADDED HERE
        });

    } catch (error) {
        next(error);
    }
}