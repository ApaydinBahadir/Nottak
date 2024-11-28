import Note from "./note";

class User {
  constructor(
    public readonly id: string,           // Unique user ID (UUID)
    public username: string,              // Username
    public email: string,                 // User's email
    public password: string,              // Hashed password
    public notes: Note[] = [],            // Notes associated with the user
    public created_at: Date = new Date(), // Timestamp for user creation
    public updated_at: Date = new Date()  // Timestamp for user updates
  ) {}
}

export default User;