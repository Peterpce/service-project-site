import { getAllUsers } from "../models/userModel.js";

/**
 * ADMIN: GET ALL USERS
 * Only accessible by admin (protected in routes via middleware)
 */
export async function getUsersPage(req, res, next) {
  try {
    const users = await getAllUsers();

    res.render("users/list", {
      title: "Registered Users",
      users,
      user: req.session.user, // for dashboard/nav role checks
      message: req.flash("message")
    });
  } catch (error) {
    next(error);
  }
}