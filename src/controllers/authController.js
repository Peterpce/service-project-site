import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";

/**
 * REGISTER USER
 */
export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.flash("message", "All fields are required"); // ✅ Aligned to match route view key
      return res.redirect("/register");
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      req.flash("message", "User already exists"); // ✅ Aligned to match route view key
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword, "user");

    req.flash("message", "Registration successful! Please login."); // ✅ Aligned to match route view key
    
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

    if (!email || !password) {
      req.flash("message", "Email and password are required"); // ✅ Aligned to match route view key
      return res.redirect("/login");
    }

    const user = await findUserByEmail(email);

    if (!user) {
      req.flash("message", "Invalid credentials"); // ✅ Aligned to match route view key
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("message", "Invalid credentials"); // ✅ Aligned to match route view key
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    req.flash("message", "Login successful! Welcome back."); // ✅ Aligned to match route view key

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
  req.flash("message", "You have been logged out successfully."); // ✅ Aligned to match route view key

  req.session.user = null;
  req.session.save((err) => {
    if (err) {
      console.error("❌ Session save error during logout:", err);
    }
    res.redirect("/login");
  });
}