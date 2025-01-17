import { useNavigate } from "react-router";
import { useAuth } from "../hooks/Auth"; // Importing the AuthContext
import SidebarIcon from "./subcomponent/SidebarIcon";
import Cookies from "js-cookie"; // Importing js-cookie

export default function Sidebar() {
  const navigate = useNavigate(); // Initialize the navigate function
  const { logout } = useAuth(); // Get the logout function from AuthContext

  // Function to handle navigation on click
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to handle the "Last note seen" navigation
  const handleLastSeenNavigate = () => {
    const noteId = Cookies.get("note_id");
    if (noteId) {
      navigate(`/note/${noteId}`); // Navigate to the last seen note page
    } else {
      alert("No Last Seen Page"); // Show alert if there's no note_id cookie
    }
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-secondary-bg
                 shadow-lg text-primary-text border-r border-gray-800"
    >
      <div className="flex flex-col flex-grow">
        {/* On click, navigate to /notes */}
        <SidebarIcon
          icon="L"
          tooltip="List all notes."
          onClick={() => handleNavigate("/notes")}
        />
        <SidebarIcon
          icon="R"
          tooltip="Last note seen."
          onClick={handleLastSeenNavigate} // Using the handleLastSeenNavigate function
        />
        <SidebarIcon
          icon="P"
          tooltip="Profile of user."
          onClick={() => handleNavigate("/user")}
        />
        <SidebarIcon
          icon="N"
          tooltip="New Note"
          onClick={() => handleNavigate("/note")}
        />
      </div>

      <div className="mt-auto">
        {/* Footer with logout icon, calls handleLogout on click */}
        <SidebarIcon icon="✖" tooltip="Logout." onClick={handleLogout} />
      </div>
    </div>
  );
}
