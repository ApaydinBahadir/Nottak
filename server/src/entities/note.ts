class Note {
    constructor(
      public title: string,
      public content: string,
      public user_id: string,
      public created_at: Date = new Date(),
      public updated_at: Date = new Date(),
      public tags: string[] = [],
      public readonly id?: string
    ) {}
  }
  
  export default Note;
  