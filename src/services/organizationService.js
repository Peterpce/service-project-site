import * as organizationModel from "../models/organizationModel.js";

// Get all organizations
export const getAllOrganizations = async () => {
  return await organizationModel.getAllOrganizations();
};

// Get organization by ID
export const getOrganizationById = async (id) => {
  return await organizationModel.getOrganizationById(id);
};

// Create organization
export const createOrganization = async (organizationData) => {
  return await organizationModel.createOrganization(organizationData);
};

// Update organization
export const updateOrganization = async (id, organizationData) => {
  return await organizationModel.updateOrganization(id, organizationData);
};

// Delete organization
export const deleteOrganization = async (id) => {
  return await organizationModel.deleteOrganization(id);
};