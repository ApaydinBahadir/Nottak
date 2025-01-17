import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/Auth";
import { password_change } from "../services/userAPI";

export default function UserPage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const { checkAuth, isAuthenticated, user } = useAuth();

  // Check user session on component mount
  useEffect(() => {
    if (isAuthenticated !== true) {
      // Only call checkAuth if the authentication state is not determined yet
      const checkSession = async () => {
        const response = await checkAuth();
        if (!response.success) {
          navigate("/"); // Redirect to login if not authenticated
        }
      };
      checkSession();
    }
  }, [isAuthenticated, checkAuth, navigate]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !newPassword) {
      alert("Please fill in both password fields.");
      return;
    }

    if (!user?.id) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      // Call password_change API
      const result = await password_change(
        user.id.toString(), // Convert user.id to a string if necessary
        password,
        newPassword
      );

      if (result.success) {
        alert("Password changed successfully.");
        setPassword("");
        setNewPassword("");
      } else {
        alert(result.data || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error during password change:", error);
      alert(
        "An error occurred while changing your password. Please try again."
      );
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated, redirecting to login...</div>;
  }

  return (
    <div
      className="w-[calc(100vw-4rem)] ml-16 
    bg-primary-bg text-primary-text p-6 h-screen
    flex flex-col"
    >
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>

      <div
        className="bg-secondary-bg p-6 rounded-lg shadow-lg
       flex-grow"
      >
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-sm font-bold">Email:</label>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold">Username:</label>
            <p className="text-gray-400">{user?.username}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold">Current Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text 
              rounded-md focus:outline-none focus:ring-2 
              focus:ring-accent-text"
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text 
              rounded-md focus:outline-none focus:ring-2 
              focus:ring-accent-text"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent-text text-primary-bg py-2 px-4 
            rounded-lg hover:bg-accent-hover transition duration-300 
            ease-in-out"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
