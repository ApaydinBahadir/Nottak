import { Request, Response } from "express";
import Note from "../entities/note";
import {
  db_create_note,
  db_delete_by_note_id,
  db_list_notes,
  db_show_notes_by_note_id,
  db_update_note,
} from "../data_layer/note_data_layer";

export async function create_note(req: Request, res: Response): Promise<any> {
  const { title, content, user_id } = req.body;

  if (!title || !content || !user_id) {
    return res
      .status(400)
      .json({ message: "All fields are required. \n title, content, user_id" });
  }

  const note = new Note(title, content, user_id, new Date(), new Date(), []);

  try {
    const result = await db_create_note(note);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Note created successfully", data: result.data });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to create note", error: result });
    }
  } catch (error) {
    console.error("Error creating note:", error);
    return res
      .status(500)
      .json({ message: "An unexpected error occurred", error });
  }
}

export async function list_by_user_id(
  req: Request,
  res: Response
): Promise<any> {
  const { user_id, date_start, date_end, tags, title } = req.query;

  // Validate user_id
  if (!user_id || typeof user_id !== "string") {
    return res
      .status(400)
      .json({ message: "User ID is required and should be a string." });
  }

  let parsedDateStart: Date | undefined;
  let parsedDateEnd: Date | undefined;

  if (date_start) {
    parsedDateStart = new Date(date_start as string);
    if (isNaN(parsedDateStart.getTime())) {
      return res.status(400).json({ message: "Invalid start date provided." });
    }
  }

  if (date_end) {
    parsedDateEnd = new Date(date_end as string);
    if (isNaN(parsedDateEnd.getTime())) {
      return res.status(400).json({ message: "Invalid end date provided." });
    }
  }

  const tagArray: string[] = tags ? (tags as string).split(",") : [];

  try {
    const result = await db_list_notes(user_id as string, {
      date_start: parsedDateStart,
      date_end: parsedDateEnd,
      tags: tagArray,
      title: title as string,
    });

    if (result.success) {
      return res
        .status(200)
        .json({ message: "Notes listed successfully", data: result.data });
    } else {
      return res
        .status(404)
        .json({ message: "No notes found for the given criteria." });
    }
  } catch (error) {
    console.error("Error retrieving notes:", error);
    return res
      .status(500)
      .json({ message: "An unexpected error occurred.", error });
  }
}

export async function show_by_id(req: Request, res: Response): Promise<any> {
  const { note_id } = req.query;

  if (!note_id || typeof note_id !== "string") {
    return res
      .status(400)
      .json({ message: "Note ID is required and should be string." });
  }

  try {
    const result = await db_show_notes_by_note_id(note_id);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Note showed successfully", data: result.data });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to retrive note", error: result });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An unexpected error occurred", error });
  }
}

export async function delete_by_id(req: Request, res: Response): Promise<any> {
  const { note_id } = req.query;

  if (!note_id || typeof note_id !== "string") {
    return res
      .status(400)
      .json({ message: "Note ID is required and should be string." });
  }

  try {
    const result = await db_delete_by_note_id(note_id);
    if (result.success) {
      return res.status(200).json({ message: "Note deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to delete note", error: result });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An unexpected error occured", error });
  }
}

export async function update_note(req: Request, res: Response): Promise<any> {
  // Destructure required fields from the request body
  const { note_id, content, date_start, date_end, tags, title } = req.body;

  // Validate that note_id is provided and is a string
  if (!note_id || typeof note_id !== "string") {
    return res.status(400).json({
      message: "Note ID is required and must be a valid string.",
    });
  }

  let parsedDateStart: Date | undefined;
  let parsedDateEnd: Date | undefined;
  let tagArray: string[] = [];

  // Parse and validate `date_start` if it's provided
  if (date_start) {
    parsedDateStart = new Date(date_start);
    if (isNaN(parsedDateStart.getTime())) {
      return res.status(400).json({
        message: "Invalid date_start provided.",
      });
    }
  }

  // Parse and validate `date_end` if it's provided
  if (date_end) {
    parsedDateEnd = new Date(date_end);
    if (isNaN(parsedDateEnd.getTime())) {
      return res.status(400).json({
        message: "Invalid date_end provided.",
      });
    }
  }

  // Safely parse tags into a string array
  if (tags && typeof tags === "string") {
    tagArray = tags.split(",").map((tag) => tag.trim());
  }

  try {
    // Pass parsed and validated input to the database function
    const result = await db_update_note(note_id as string, {
      content: content as string,
      title: title as string,
      date_start: parsedDateStart,
      date_end: parsedDateEnd,
      tags: tagArray,
    });

    if (result.success) {
      return res.status(200).json({
        message: "Note updated successfully",
        data: result.data,
      });
    }

    return res.status(500).json({
      message: "Failed to update note",
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({
      message: "An unexpected error occurred.",
      error,
    });
  }
}
