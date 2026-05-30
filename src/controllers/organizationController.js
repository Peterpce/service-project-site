import * as organizationModel from "../models/organizationModel.js";

// GET all organizations (list page)
export async function getAllOrganizations(req, res, next) {
    try {
        const organizations =
            await organizationModel.getAllOrganizations();

        res.render("organizations", {
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

        res.render("organization-details", {
            title: organization.name,
            organization,
            projects
        });

    } catch (error) {
        next(error);
    }
}