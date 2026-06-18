import { getAllUsers } from "../models/userModel.js";

/**
 * GENERAL USER LANDING: DASHBOARD
 * Accessible by any logged-in user
 */
export async function getDashboardPage(req, res, next) {
  try {
    res.render("dashboard", { 
      title: "Dashboard",
      user: req.session.user
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ADMIN: GET ALL USERS
 * Only accessible by admin (protected in routes via middleware)
 */
export async function getUsersPage(req, res, next) {
  try {
    const users = await getAllUsers();

    // ✨ FIXED: Point explicitly to the "users/list" subfolder view path
    res.render("users/list", {
      title: "Registered Users",
      users,
      user: req.session.user
    });

  } catch (error) {
    next(error);
  }
}