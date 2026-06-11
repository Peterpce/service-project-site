import express from "express";
import { getUsersPage } from "../controllers/userController.js";
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ADMIN ONLY: VIEW ALL USERS
 * Must be logged in AND must be admin
 */
router.get(
  "/users",
  requireLogin,
  requireRole("admin"),
  getUsersPage
);

export default router;