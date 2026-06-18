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
      // ✨ locals.error / locals.success / locals.message are handled globally by server.js now!
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ADMIN: GET ALL USERS
 * Only accessible by admin
 */
export async function getUsersPage(req, res, next) {
  try {
    const users = await getAllUsers();

    res.render("users/list", {
      title: "Registered Users",
      users,
      user: req.session.user
    });

  } catch (error) {
    next(error);
  }
}