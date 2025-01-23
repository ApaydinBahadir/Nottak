import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database Singleton class
class Database {
  private static instance: Pool;

  private constructor() {}

  public static async getInstance(): Promise<Pool> {
    if (!Database.instance) {
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
        console.log("Database connected successfully.");
      });

      Database.instance.on("error", (err) => {
        console.error("Database connection error:", err);
      });

      // Create tables if they don't exist
      await Database.createTables();

      // Handle process termination
      process.on("SIGTERM", async () => {
        await Database.instance.end();
        process.exit(0);
      });
    }

    return Database.instance;
  }

  private static async createTables(): Promise<void> {
    const queries = `
      CREATE TABLE IF NOT EXISTS public.logs (
        id SERIAL PRIMARY KEY,
        method character varying(10),
        url text,
        status integer,
        response_time double precision,
        user_agent text,
        "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS public.notes (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title character varying(255) NOT NULL,
        content text NOT NULL,
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        user_id uuid NOT NULL,
        tags text[]
      );

      CREATE TABLE IF NOT EXISTS public.users (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        username character varying(255) NOT NULL,
        email character varying(255) UNIQUE NOT NULL,
        password text NOT NULL,
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

      ALTER TABLE IF EXISTS public.notes 
      ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
    `;

    try {
      const pool = Database.instance;
      await pool.query(queries);
      console.log("Database tables created or already exist.");
    } catch (error) {
      console.error("Error creating database tables:", error);
      throw error;
    }
  }
}

export default Database;
