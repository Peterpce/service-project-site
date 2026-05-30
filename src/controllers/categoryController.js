import * as categoryModel from "../models/categoryModel.js";

// GET all categories (list page)
export async function getAllCategories(req, res, next) {
    try {
        const categories = await categoryModel.getAllCategories();

        res.render("categories", {
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

        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).render("404", {
                title: "Category Not Found"
            });
        }

        // Get all projects under this category
        const projects = await categoryModel.getProjectsByCategory(id);

        res.render("category-details", {
            title: category.name,
            category,
            projects
        });

    } catch (error) {
        next(error);
    }
}