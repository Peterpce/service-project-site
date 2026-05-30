import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Create PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Test database connection
pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL database");
    })
    .catch((err) => {
        console.error("Database connection error:", err.message);
    });

export default pool;