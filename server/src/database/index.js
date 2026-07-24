import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in your .env file.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test the database connection when the server starts
pool
  .connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL database");

    client.query("SELECT NOW()", (err, result) => {
      if (err) {
        console.error("❌ Test query failed:", err.message);
      } else {
        console.log("🕒 Database time:", result.rows[0].now);
      }

      client.release();
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to PostgreSQL:");
    console.error(err.message);
  });

export default pool;