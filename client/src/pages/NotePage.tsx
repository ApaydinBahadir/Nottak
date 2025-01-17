import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { get_note, save_note, update_note } from "../services/notesAPI";
import { useAuth } from "../hooks/Auth";
import Cookies from "js-cookie"; // Import js-cookie

export default function NotePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>(""); // Default to empty string
  const [content, setContent] = useState<string>(""); // Default to empty string
  const [created_at, setCreated_at] = useState<Date | null>(null);
  const [updated_at, setUpdated_at] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]); // Initialize as empty array
  const { checkAuth, isAuthenticated, user } = useAuth();

  // Check authentication status using the session
  useEffect(() => {
    if (!isAuthenticated) {
      const checkSession = async () => {
        const response = await checkAuth();
        if (!response.success) {
          navigate("/"); // Redirect to login if not authenticated
        }
      };
      checkSession();
    }
  }, [isAuthenticated, checkAuth, navigate]);

  // Fetch note data using id from URL
  useEffect(() => {
    if (id) {
      Cookies.set("note_id", id); // Set the note ID in cookies

      const fetchData = async () => {
        const response = await get_note(id); // Fetch note using id from URL params
        if (response.success) {
          setTitle(response.data.data[0].title || ""); // Default to empty string if undefined
          setContent(response.data.data[0].content || ""); // Default to empty string if undefined
          setCreated_at(new Date(response.data.data[0].created_at)); // Convert to Date object
          setUpdated_at(new Date(response.data.data[0].updated_at)); // Convert to Date object
          setTags(response.data.data[0].tags || []); // Default to empty array if undefined
        } else {
          console.error("Failed to fetch note", response.data);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Title and Content are required.");
      return;
    }

    try {
      if (id) {
        const response = await update_note(id, tags, content, title);

        if (response.success) {
          alert("Note updated successfully");
        } else {
          alert("Failed to update note");
        }
      } else {
        if (user) {
          const response = await save_note(user.id.toString(), title, content);
          if (response.success) {
            alert("Note saved successfully");
            navigate(`/note/${response.data.data[0].note_id}`);
          } else {
            alert("Failed to save note");
          }
        }
      }
    } catch (error) {
      console.error("Error saving the note:", error);
      alert("An error occurred while saving the note.");
    }
  };

  // Format the date to a more user-friendly format
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  // Handle changes in tags
  const handleTagChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTags = [...tags];
    updatedTags[index] = event.target.value;
    setTags(updatedTags);
  };

  // Handle adding a new tag
  const handleTagAdd = () => {
    setTags([...tags, ""]); // Add a new empty tag field
  };

  // Handle removing a tag
  const handleTagRemove = (index: number) => {
    const updatedTags = tags.filter((_, idx) => idx !== index); // Remove tag at given index
    setTags(updatedTags);
  };

  return (
    <div className="bg-primary-bg h-screen w-[calc(100vw-4rem)] ml-16 text-primary-text flex flex-col p-3 gap-5">
      {/* Title Section */}
      <div className="flex flex-row gap-4 justify-center">
        <label className="text-secondary-text">Title:</label>
        <input
          type="text"
          className="bg-secondary-bg text-primary-text pl-2 border border-tertiary-bg rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text focus:border-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Text Area Section */}
      <div className="flex-grow">
        <textarea
          className="bg-secondary-bg w-full h-full text-primary-text border border-tertiary-bg resize-none pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text focus:border-transparent"
          placeholder="Start typing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* Created At and Updated At Section */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <label className="text-secondary-text">Created At:</label>
          <span className="text-primary-text">{formatDate(created_at)}</span>
        </div>
        <div className="flex flex-col">
          <label className="text-secondary-text">Updated At:</label>
          <span className="text-primary-text">{formatDate(updated_at)}</span>
        </div>
      </div>

      {/* Tags Section */}
      <div className="flex flex-col gap-2">
        <label className="text-secondary-text">Tags:</label>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              className="bg-secondary-bg text-primary-text pl-2 border border-tertiary-bg rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text focus:border-transparent"
              value={tag}
              onChange={(e) => handleTagChange(e, index)} // Update tag on change
            />
            <button
              className="bg-accent-text text-primary-bg px-2 py-1 rounded-md hover:bg-primary-text transition duration-200 hover:text-accent-text"
              onClick={() => handleTagRemove(index)} // Remove tag
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-accent-text text-primary-bg px-4 py-2 rounded-md hover:bg-primary-text transition duration-200 hover:text-accent-text"
          onClick={handleTagAdd} // Add new tag
        >
          Add Tag
        </button>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-row justify-end gap-4">
        <button
          className="bg-accent-text text-primary-bg px-4 py-2 rounded-md hover:bg-primary-text hover:text-accent-text transition duration-200"
          onClick={handleSave}
        >
          Save Note
        </button>
        <button className="bg-secondary-bg text-primary-text px-4 py-2 rounded-md border border-accent-text hover:bg-primary-bg hover:text-accent-text transition duration-200">
          Delete Note
        </button>
      </div>
    </div>
  );
}
