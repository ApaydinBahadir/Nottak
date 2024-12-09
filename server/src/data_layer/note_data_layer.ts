import Database from "./database_connection";
import return_data from "../utils/return_data";
import Note from "../entities/note";

const db = Database.getInstance();

export async function db_create_note(note: Note) {
  const query = `
  INSERT INTO notes (title, content, created_at, updated_at, user_id)
  VALUES ($1, $2, NOW(), NOW(), $3)
  RETURNING id;
`;
  try {
    const result = await db.query(query, [
      note.title,
      note.content,
      note.user_id,
    ]);
    return new return_data(true, "Note Created", []);
  } catch (error) {
    console.error("Error creating note:", error);
    return new return_data(false, "Error wher note created", [error]);
  }
}

export async function db_show_notes_by_note_id(note_id: string) {
  const query = `
    SELECT *
    FROM notes
    WHERE id = $1;
    `;

  try {
    const result = await db.query(query, [note_id]);
    return new return_data(true, "Note retrived successfully", result.rows);
  } catch (error) {
    console.error("Error retrieving note:", error);
    return new return_data(false, "Failed to retrieve notes", []);
  }
}

export async function db_delete_by_note_id(note_id: string) {
  const query = `
      DELETE FROM notes WHERE id = $1 RETURNING *;
    `;

  try {
    const result = await db.query(query, [note_id]);

    if (result.rowCount === 0) {
      // No note was deleted
      return new return_data(false, "Note not found", []);
    }

    // Return the deleted note's details
    return new return_data(true, "Note deleted successfully", result.rows);
  } catch (error) {
    console.error("Error deleting note:", error);
    return new return_data(false, "Failed to delete note", []);
  }
}

export async function db_list_notes(
  user_id: string,
  options?: {
    date_start?: Date;
    date_end?: Date;
    tags?: string[];
    title?: string;
  }
) {
  let query = `
          SELECT n.*, u.username, u.email
          FROM notes n
          JOIN users u ON n.user_id = u.id
          WHERE n.user_id = $1
        `;
  const queryParams: any[] = [user_id];

  // Add dynamic conditions
  if (options?.date_start) {
    query += ` AND n.created_at >= $${queryParams.length + 1}`;
    queryParams.push(options.date_start);
  }

  if (options?.date_end) {
    query += ` AND n.created_at <= $${queryParams.length + 1}`;
    queryParams.push(options.date_end);
  }

  if (options?.title) {
    query += ` AND n.title ILIKE $${queryParams.length + 1}`;
    queryParams.push(`%${options.title}%`);
  }

  if (options?.tags && options.tags.length > 0) {
    query += ` AND n.tags && $${queryParams.length + 1}`; // Assuming `tags` is a PostgreSQL array
    queryParams.push(options.tags);
  }

  try {
    const result = await db.query(query, queryParams);
    return new return_data(true, "Notes retrieved successfully", result.rows);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    return new return_data(false, "Failed to retrieve notes", []);
  }
}

export async function db_update_note(
  note_id: string,
  options?: {
    content?: string;
    title?: string;
    date_start?: Date | null;
    date_end?: Date | null;
    tags?: string[] | null;
  }
): Promise<any> {
  const query = `
      UPDATE notes
      SET 
        content = COALESCE($1, content),
        title = COALESCE($2, title),
        date_start = COALESCE($3, date_start),
        date_end = COALESCE($4, date_end),
        tags = COALESCE($5, tags),
        updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;

  try {
    const result = await db.query(query, [
      options?.content || null,
      options?.title || null,
      options?.date_start || null,
      options?.date_end || null,
      options?.tags ? JSON.stringify(options.tags) : null,
      note_id,
    ]);

    if (result.rows.length) {
      return new return_data(true, "Note updated successfully", result.rows[0]);
    }

    return new return_data(false, "Note not found", []);
  } catch (error) {
    console.error("Error updating note:", error);
    return new return_data(false, "Failed to update note", []);
  }
}
