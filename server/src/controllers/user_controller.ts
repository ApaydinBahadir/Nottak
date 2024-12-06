import { Request, Response } from "express";
import {
  db_create_user,
  db_find_user_by_id,
} from "../data_access/user_data_access";
import User from "../models/user";

export async function create_user(req: Request, res: Response): Promise<any> {
  const { username, email, password } = req.body;
  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new user instance
  const user = new User(username, email, password, []);

  // Attempt to save the user
  try {
    const success = await db_create_user(user);
    if (success) {
      return res.status(200).json({ message: "User created successfully" });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}

export async function find_user_by_id(
  req: Request,
  res: Response
): Promise<any> {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const success = await db_create_user(user_id);
    if (success) {
      return res.status(200).json({ message: "User finded successfully" });
    } else {
      return res.status(500).json({ message: "Failed to find user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}
