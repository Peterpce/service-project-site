import express from "express";
import { getUsersPage, getDashboardPage } from "../controllers/userController.js"; // added getDashboardPage
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GENERAL USER LANDING: DASHBOARD
 * Anyone logged in can access this page
 */
router.get(
  "/dashboard", 
  requireLogin, 
  getDashboardPage
);

/**
 * ADMIN ONLY: VIEW ALL USERS
 * Must be logged in AND must be an admin
 */
router.get(
  "/users",
  requireLogin,
  requireRole("admin"),
  getUsersPage
);

export default router;