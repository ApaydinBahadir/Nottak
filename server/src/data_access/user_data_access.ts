import Database from "../data_access/database_connection";
import User from "../models/user";

const db = Database.getInstance();

export async function db_create_user(user: User): Promise<boolean> {
  const query = `
    INSERT INTO users (username, email, password, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING id;
  `;

  try {
    const result = await db.query(query, [
      user.username,
      user.email,
      user.password,
    ]);
    console.log("User created with ID:", result.rows[0].id);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

export async function db_find_user_by_id(user_id: string) {
  const query = `
    SELECT * FROM users WHERE id = 'user_id'
    `;

  try {
    const result = await db.query(query, [user_id]);
    console.log("User finded:", result.rows[0]);
    console.log("User finded:", result);
  } catch (error) {
    console.error("Error finding user:", error);
    return false;
  }
}
