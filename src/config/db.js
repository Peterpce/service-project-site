import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Create PostgreSQL connection pool
const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Test connection
db.connect()
  .then((client) => {
    console.log("Connected to PostgreSQL database");
    client.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

export default db;