import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser
} from "../controllers/authController.js";

const router = express.Router();

/**
 * REGISTER ROUTES
 */
router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
    message: req.flash("message")
  });
});

router.post("/register", registerUser);

/**
 * LOGIN ROUTES
 */
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    message: req.flash("message")
  });
});

router.post("/login", loginUser);

/**
 * LOGOUT ROUTE
 */
router.get("/logout", logoutUser);

export default router;