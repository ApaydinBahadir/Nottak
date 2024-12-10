import express, { Request, Response, json } from "express";
import note_route from "./routes/note_route";
import user_route from "./routes/user_route";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import save_log from "./utils/save_log";
import helmet from "helmet";
import User from "./entities/user";
const session = require("express-session");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// CORS options
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(
  session({
    secret: "güvenli-bir-anahtar",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
    maxAge: 1000 * 60 * 60,
  })
);

declare module "express-session" {
  interface SessionData {
    user: { id: string; username: string };
  }
}

export {};

// Middleware setup
app.use(
  helmet({ contentSecurityPolicy: process.env.NODE_ENV === "production" })
);
app.use(cors(corsOptions));
app.use(json());
app.use(
  morgan((tokens, req, res) => {
    const logData = {
      method: tokens.method(req, res) || "-",
      url: tokens.url(req, res) || "-",
      status: parseInt(tokens.status(req, res) || "0", 10),
      responseTime: parseFloat(tokens["response-time"](req, res) || "0"),
      userAgent: req.headers["user-agent"] || "-",
    };

    // Save the log to the database
    save_log(
      logData.method,
      logData.url,
      logData.status,
      logData.responseTime,
      logData.userAgent
    ).catch((err) => {
      console.error("Failed to save log:", err);
    });

    // Return null or empty string to suppress console output
    return null; // Alternatively, return "" to be explicit
  })
);

// Routes
app.use("/api/note", note_route);
app.use("/api/user", user_route);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is the backend server for the nottak app");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
