import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class Database {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = new Pool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "5432", 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      Database.instance.on("connect", () => {
        console.log("Database connected.");
      });

      Database.instance.on("error", (err) => {
        console.error("Database connection error:", err);
      });
    }

    return Database.instance;
  }
}

export default Database;
