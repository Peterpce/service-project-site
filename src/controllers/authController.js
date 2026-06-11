import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";

/**
 * REGISTER USER
 */
export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password) {
      req.flash("message", "All fields are required");
      return res.redirect("/register");
    }

    // check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      req.flash("message", "User already exists");
      return res.redirect("/register");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user (default role = user)
    await createUser(name, email, hashedPassword, "user");

    req.flash("message", "Registration successful. Please login.");
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
}

/**
 * LOGIN USER
 */
export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("message", "Email and password required");
      return res.redirect("/login");
    }

    const user = await findUserByEmail(email);

    if (!user) {
      req.flash("message", "Invalid credentials");
      return res.redirect("/login");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("message", "Invalid credentials");
      return res.redirect("/login");
    }

    // create session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
}

/**
 * LOGOUT USER
 */
export function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}