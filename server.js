import express from "express"; 
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// =========================
// SECURITY + HELMET
// =========================
import helmet from "helmet"; 

// =========================
// SESSION + FLASH + DATABASE STORE
// =========================
import session from "express-session";
import flash from "connect-flash";
import pgSession from "connect-pg-simple"; 
import db from "./src/config/db.js";        

// =========================
// DATABASE SYNC AUTOMATION
// =========================
import { initializeUserTable } from "./src/models/userModel.js"; 

// =========================
// CRITICAL ERROR TRACKING
// =========================
process.on("unhandledRejection", (reason, p) => {
  console.error("❌ CRITICAL UNHANDLED REJECTION AT:", p, "REASON:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("❌ CRITICAL UNCAUGHT EXCEPTION:", error);
  process.exit(1);
});

// =========================
// ROUTES
// =========================
import organizationRoutes from "./src/routes/organizationRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 🛡️ SECURITY HEADERS (CRITICAL FOR RED FLAGS)
// ==========================================
app.use(
  helmet({
    contentSecurityPolicy: false, 
  })
);

// =========================
// VIEW ENGINE (FIXED)
// =========================
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "src", "views"),
  path.join(__dirname, "src", "views", "users") 
]);

// =========================
// STATIC FILES
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// BODY PARSING 
// =========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// ==========================================
// 🔒 SECURE SESSION COOKIES (PERSISTENT PG STORE)
// ==========================================
app.set("trust proxy", 1); 

// ✨ FIXED: One single, clean initialization wrapper for connect-pg-simple
const PostgresStore = pgSession(session);
const databaseSessionStore = new PostgresStore({
  pool: db,                  
  tableName: "session",      
  createTableIfMissing: true,
  pruneSessionInterval: 60   
});

// Capture background database store issues gracefully
databaseSessionStore.on("error", (error) => {
  console.error("❌ SESSION STORE ASYNC DB ERROR:", error);
});

app.use(
  session({
    store: databaseSessionStore, // ✨ FIXED: Linked correctly to the definition above
    secret: process.env.SESSION_SECRET || "super-secret-fallback-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production" || process.env.RENDER === "true",
      httpOnly: true, 
      sameSite: "lax", 
      maxAge: 30 * 60 * 1000 
    }
  })
);

// =========================
// FLASH
// =========================
app.use(flash());

// ==========================================
// 🔓 GLOBAL USER ACCESS & ALERTS (FIXED)
// ==========================================
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.message = req.flash("message")[0] || null;
  next();
});

// =========================
// HOME
// =========================
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});

// =========================
// AUTH ROUTES
// =========================
app.use("/", authRoutes);

// =========================
// USER ROUTES (ADMIN)
// =========================
app.use("/", userRoutes);

// =========================
// MVC ROUTES
// =========================
app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

// =========================
// 404
// =========================
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

// =========================
// 500
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", {
    title: "Server Error"
  });
});

// =========================
// START SERVER (UPDATED TO ASYNC)
// =========================
app.listen(port, async () => { 
  console.log(`Server running on port ${port}`);

  try {
    // Automatically verifies/creates the users table and inserts your admin data
    await initializeUserTable(); 
  } catch (err) {
    console.error("⚠️ Post-bind database initialization warning:", err.message);
  }
});