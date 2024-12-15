import Note from "./note";


//TODO: Make password hashed
class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public notes: Note[] = [],
    public created_at: Date = new Date(),
    public updated_at: Date = new Date(),
    public readonly id?: string
  ) {}
}

export default User;
