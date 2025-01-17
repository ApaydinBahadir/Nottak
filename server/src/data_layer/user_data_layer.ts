import Database from "../utils/database_connection";
import User from "../entities/user";
import return_data from "../utils/return_data";
import bcrypt from "bcrypt";

const db = Database.getInstance();

// Create user in the database, Function taking User entity as paramater
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
      user.hashed_password,
    ]);
    return new return_data(true, "User created", []);
  } catch (error) {
    console.error("Error creating user:", error);
    return new return_data(false, "Error when user created", [error]);
  }
}

// Find user by ID, Taking user_id as string as parameter
export async function db_find_user_by_id(user_id: string) {
  const query = `
      SELECT * FROM users WHERE id = $1;
    `;

  try {
    const result = await db.query(query, [user_id]);
    return new return_data(true, "User found", [result.rows[0]]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new return_data(false, "Error fetching user", [error]);
  }
}

//delete user by id. Taking user_id as sting as parameter
export async function db_delete_user_by_id(user_id: string) {
  const query = `
      DELETE FROM users WHERE id = $1 RETURNING *;
    `;

  try {
    const result = await db.query(query, [user_id]);

    if (result.rows.length > 0) {
      return new return_data(true, "User deleted successfully", [
        result.rows[0],
      ]);
    } else {
      return new return_data(false, "User not found", []);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return new return_data(false, "Error deleting user", [error]);
  }
}

//For purpose of login. This only getting username as a string as paramater
//TODO:Makesure in database username unique
export async function db_login_user(email: string) {
  const query = `
      SELECT id, username, password FROM users WHERE email = $1;
    `;

  try {
    const result = await db.query(query, [email]); // Securely pass parameters to avoid SQL injection
    if (result.rows.length > 0) {
      return new return_data(true, "User found", [result.rows[0]]);
    } else {
      return new return_data(false, "User not found", []);
    }
  } catch (error) {
    return new return_data(false, "Error during user login", [error]);
  }
}

export async function db_change_password(
  user_id: string,
  hashed_password: string, // Client sends the current hashed password
  new_password: string // Client sends the new plain password
): Promise<return_data> {
  // Query to fetch the current password for validation
  const fetchPasswordQuery = `
    SELECT password FROM users WHERE id = $1;
  `;

  // Query to update the password
  const updatePasswordQuery = `
    UPDATE users
    SET password = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING id;
  `;

  try {
    // Fetch the current hashed password from the database
    const fetchResult = await db.query(fetchPasswordQuery, [user_id]);
    if (fetchResult.rows.length === 0) {
      return new return_data(false, "User not found", []);
    }

    const currentHashedPassword = fetchResult.rows[0].password;

    // Validate the provided hashed password matches the stored hashed password
    const isValid = await bcrypt.compare(
      hashed_password,
      currentHashedPassword
    );
    if (!isValid) {
      return new return_data(false, "Current password is incorrect", []);
    }

    // Hash the new password before storing it in the database
    const newHashedPassword = await bcrypt.hash(new_password, 10);

    // Update the database with the new hashed password
    const updateResult = await db.query(updatePasswordQuery, [
      newHashedPassword,
      user_id,
    ]);

    if (updateResult.rows.length > 0) {
      return new return_data(true, "Password updated successfully", []);
    } else {
      return new return_data(false, "Password update failed", []);
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return new return_data(false, "An error occurred while updating password", [
      error,
    ]);
  }
}
