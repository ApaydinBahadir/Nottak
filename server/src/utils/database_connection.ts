import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database Singleton class
class Database {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!Database.instance) {
      // Ensure environment variables are valid before proceeding
      const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

      if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
        throw new Error("Database connection configuration is incomplete.");
      }

      Database.instance = new Pool({
        host: DB_HOST,
        port: parseInt(DB_PORT || "5432", 10),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      });

      Database.instance.on("connect", () => {
        console.log("Database connected.");
      });

      Database.instance.on("error", (err) => {
        console.error("Database connection error:", err);
      });

      // Handle process termination
      process.on("SIGTERM", async () => {
        console.log("Closing database connection...");
        await Database.instance.end();
        process.exit(0);
      });
    }

    return Database.instance;
  }
}

export default Database;
