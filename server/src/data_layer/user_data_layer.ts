import Database from "../utils/database_connection";
import User from "../entities/user";
import return_data from "../utils/return_data";

const db = Database.getInstance();

// Create user in the database
export async function db_create_user(user: User): Promise<return_data> {
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
    return new return_data(true, "User created", []); // Success message should be clear
  } catch (error) {
    console.error("Error creating user:", error);
    return new return_data(false, "Error when user created", [error]); // Provide more specific error
  }
}

// Find user by ID
export async function db_find_user_by_id(user_id: string) {
  const query = `
      SELECT * FROM users WHERE id = $1;
    `;

  try {
    const result = await db.query(query, [user_id]); // Correctly passing user_id as a parameter
    console.log("User found:", result.rows[0]);
    return new return_data(true, "User found", [result.rows[0]]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new return_data(false, "Error fetching user", [error]);
  }
}
export async function db_delete_user_by_id(user_id: string) {
  const query = `
      DELETE FROM users WHERE id = $1 RETURNING *;
    `;

  try {
    // Execute the query to delete the user and return the deleted row
    const result = await db.query(query, [user_id]);

    // If a row is deleted, the result will contain that deleted row
    if (result.rows.length > 0) {
      console.log("User deleted:", result.rows[0]);
      return new return_data(true, "User deleted successfully", [
        result.rows[0],
      ]);
    } else {
      // If no rows are deleted, it means the user was not found
      return new return_data(false, "User not found", []);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return new return_data(false, "Error deleting user", [error]);
  }
}

export async function db_login_user(username: string) {
  const query = `
      SELECT id, username, password FROM users WHERE username = $1;
    `;

  try {
    const result = await db.query(query, [username]); // Securely pass parameters to avoid SQL injection
    if (result.rows.length > 0) {
      return new return_data(true, "User found", [result.rows[0]]);
    } else {
      return new return_data(false, "User not found", []);
    }
  } catch (error) {
    return new return_data(false, "Error during user login", [error]);
  }
}
