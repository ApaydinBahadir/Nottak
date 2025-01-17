import { useNavigate } from "react-router";

// Define the props for the NoteCard
interface NoteCardProps {
  id: string; // The unique identifier for the note
  title: string;
  created_time: string;
  tags: string[];
}

export default function NoteCard({
  id,
  title,
  created_time,
  tags,
}: NoteCardProps) {
  const navigate = useNavigate();

  // Handle click event to navigate to the note's detail page
  const handleClick = () => {
    navigate(`/note/${id}`); // Navigate to /note/{id}
  };

  return (
    <div
      className="bg-secondary-bg h-56 w-56 p-4
                 flex flex-col justify-between
                 rounded-lg shadow-lg
                 text-primary-text transition duration-300
                 hover:scale-105 hover:shadow-xl cursor-pointer" // Added cursor-pointer for visual indication
      onClick={handleClick} // Added the click handler for navigation
    >
      {/* Title */}
      <div>
        <h2 className="font-bold text-lg truncate mb-2">📌 {title}</h2>
      </div>

      {/* Created Time */}
      <div>
        <p className="text-sm text-secondary-text">Created Time:</p>
        <p className="text-sm">{created_time}</p>
      </div>

      {/* Tags */}
      <div>
        <p className="text-sm text-secondary-text">Tags:</p>
        <ul className="flex flex-wrap gap-2 mt-2">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <li
                key={index}
                className="bg-tertiary-bg px-3 py-1 text-xs
                           rounded-md text-primary-text shadow-md
                           hover:bg-accent-text hover:text-primary-bg
                           transition duration-200"
              >
                {tag}
              </li>
            ))
          ) : (
            <span className="text-tertiary-text italic">No tags</span>
          )}
        </ul>
      </div>
    </div>
  );
}
