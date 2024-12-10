import { Request, Response } from "express";
import {
  db_create_user,
  db_delete_user_by_id,
  db_find_user_by_id,
  db_login_user,
} from "../data_layer/user_data_layer";
import User from "../entities/user";

// Create a new user
export async function create_user(req: Request, res: Response): Promise<any> {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required. \n username, email, password.",
    });
  }

  // Create a new user instance
  const user = new User(username, email, password, []);

  try {
    // Attempt to save the user
    const result = await db_create_user(user);
    if (result.success) {
      return res.status(200).json({ message: "User created successfully" });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    // Catch any error during user creation
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to create user", error: error });
  }
}

// Find a user by ID
export async function find_user_by_id(
  req: Request,
  res: Response
): Promise<any> {
  const { user_id } = req.query;

  if (!user_id || typeof user_id !== "string") {
    return res
      .status(400)
      .json({ message: "User ID is required and should be a string" });
  }

  try {
    const result = await db_find_user_by_id(user_id as string);

    if (result.success && result.data.length > 0) {
      return res.status(200).json({ message: "User found", data: result.data });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return res
      .status(500)
      .json({ message: "Error finding user", error: error });
  }
}

// Delete a user by ID
export async function delete_by_user_id(
  req: Request,
  res: Response
): Promise<any> {
  const { user_id } = req.query;

  if (!user_id || typeof user_id !== "string") {
    return res
      .status(400)
      .json({ message: "User ID is required and should be a string" });
  }

  try {
    const result = await db_delete_user_by_id(user_id as string);

    if (result.success && result.data.length > 0) {
      return res
        .status(200)
        .json({ message: "User deleted successfully", data: result.data });
    } else {
      return res
        .status(404)
        .json({ message: "User not found", data: result.data });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "An unexpected error occurred", error: error });
  }
}

export async function login_user(req: Request, res: Response): Promise<any> {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  try {
    const userResponse = await db_login_user(username);

    if (!userResponse.success || !userResponse.data.length) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = userResponse.data[0];

    // Directly compare passwords (for simplicity/testing only, **NOT secure for production**)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Save user information to session
    req.session.user = { id: user.id, username: user.username };

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
