import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import organizationRoutes from "./src/routes/organizationRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// VIEW ENGINE SETUP
// =========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// =========================
// STATIC FILES
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// HOME ROUTE
// =========================
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});

// =========================
// MVC ROUTES
// =========================
app.use(organizationRoutes);
app.use(projectRoutes);
app.use(categoryRoutes);

// =========================
// 404 ERROR HANDLER
// =========================
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

// =========================
// 500 ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).render("500", {
    title: "Server Error"
  });
});

// =========================
// START SERVER
// =========================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});