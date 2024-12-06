class Note {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public created_at: Date,
    public updated_at: Date,
    public user_id: string,
    public tags: string[]
  ) {}
}

export default Note;
