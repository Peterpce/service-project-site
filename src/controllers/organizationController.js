import * as organizationModel from "../models/organizationModel.js";

// GET all organizations (list page)
export async function getAllOrganizations(req, res, next) {
    try {
        const organizations =
            await organizationModel.getAllOrganizations();

        res.render("organization/list", {
            title: "Organizations",
            organizations
        });

    } catch (error) {
        next(error);
    }
}

// GET organization details page
export async function getOrganizationById(req, res, next) {
    try {
        const id = req.params.id;

        const organization =
            await organizationModel.getOrganizationById(id);

        if (!organization) {
            return res.status(404).render("404", {
                title: "Organization Not Found"
            });
        }

        const projects =
            await organizationModel.getProjectsByOrganization(id);

        res.render("organization/detail", {
            title: organization.name,
            organization,
            projects
        });

    } catch (error) {
        next(error);
    }
}

// SHOW CREATE FORM
export function showCreateForm(req, res) {
    res.render("organization/create", {
        title: "Create Organization",
        errors: [],      // required
        success: []      // required (prevents crash)
    });
}

// SHOW EDIT FORM
export async function showEditForm(req, res, next) {
    try {
        const id = req.params.id;

        const organization =
            await organizationModel.getOrganizationById(id);

        if (!organization) {
            return res.status(404).render("404", {
                title: "Organization Not Found"
            });
        }

        res.render("organization/edit", {
            title: "Edit Organization",
            organization,
            errors: [],     // required
            success: []     // required (THIS FIXES YOUR ERROR)
        });

    } catch (error) {
        next(error);
    }
}