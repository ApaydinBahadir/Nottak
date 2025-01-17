import { useNavigate } from "react-router";
import NoteCard from "../component/subcomponent/NoteCard";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { get_notes_by_id } from "../services/notesAPI";

// Define the type for a note that comes from the API
interface NoteAPI {
  id: string;
  title: string;
  created_at: string;
  tags: string[] | null;
}

// Define the type for a note in the UI
interface Note {
  id: string; // Add id for navigation
  title: string;
  created_time: string;
  tags: string[];
}

export default function NoteListPage() {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated, user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  // Check authentication status using the session
  useEffect(() => {
    if (isAuthenticated !== true) {
      const checkSession = async () => {
        const response = await checkAuth();
        if (!response.success) {
          navigate("/"); // Redirect to login if not authenticated
        }
      };
      checkSession();
    }
  }, [isAuthenticated, checkAuth, navigate]);

  // Fetch notes when user ID changes or component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      if (user?.id) {
        const response = await get_notes_by_id(user.id.toString());
        if (response.success) {
          const notesData: Note[] = response.data.data.map((note: NoteAPI) => ({
            id: note.id, // Add the ID to the note
            title: note.title,
            created_time: note.created_at,
            tags: note.tags || [], // Default tags to an empty array if null
          }));
          setNotes(notesData);
        } else {
          console.error("Failed to fetch notes", response.data);
          setNotes([]);
        }
      }
    };
    fetchNotes();
  }, [user?.id]);

  return (
    <div
      className="ml-16 flex-grow min-h-screen bg-primary-bg text-primary-text
                 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id} // Use the id as the key for each note
          id={note.id} // Pass id as a prop to NoteCard
          title={note.title}
          created_time={note.created_time}
          tags={note.tags}
        />
      ))}
    </div>
  );
}
