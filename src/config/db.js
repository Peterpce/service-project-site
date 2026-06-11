import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost") 
    ? false 
    : { rejectUnauthorized: false }
});

// Test connection cleanly
db.query("SELECT NOW()")
  .then(() => {
    console.log("🚀 Connected to PostgreSQL database successfully!");
  })
  .catch((err) => {
    console.error("❌ Database query failed:", err.message);
  });

export default db;