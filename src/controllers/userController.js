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
      message: req.flash("message")[0] || null
    });

  } catch (error) {
    next(error);
  }
}