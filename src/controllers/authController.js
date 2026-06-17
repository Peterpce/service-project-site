import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";

/**
 * REGISTER USER
 */
export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      req.flash("message", "All fields are required");
      return res.redirect("/register");
    }

    // check existing user
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      req.flash("message", "User already exists");
      return res.redirect("/register");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await createUser(name, email, hashedPassword, "user");

    req.flash("message", "Registration successful. Please login.");
    
    // ✨ FIXED: Added explicit session saving before redirect to ensure the flash message is stored
    req.session.save(() => {
      res.redirect("/login");
    });
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

    // validation
    if (!email || !password) {
      req.flash("message", "Email and password are required");
      return res.redirect("/login");
    }

    // find user
    const user = await findUserByEmail(email);

    if (!user) {
      req.flash("message", "Invalid credentials");
      return res.redirect("/login");
    }

    // verify password
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

    req.flash("message", "Login successful");

    // FIXED: Changed redirect back to "/dashboard" to target the correct view route
    req.session.save(() => {
      res.redirect("/dashboard"); 
    });

  } catch (error) {
    next(error);
  }
}

/**
 * LOGOUT USER
 */
export function logoutUser(req, res) {
  // 1. Set the logout message BEFORE touching the session memory state
  req.flash("message", "You have been logged out successfully.");

  // 2. ✨ FIXED: Instead of destroying the entire session object container instantly 
  // (which deletes the flash engine data structure before it can read the redirect),
  // we nullify the user identity properties and save the flash to carry over.
  req.session.user = null;
  
  req.session.save((err) => {
    if (err) {
      console.error("❌ Session save error during logout:", err);
    }
    res.redirect("/login");
  });
}