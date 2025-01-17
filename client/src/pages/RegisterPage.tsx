import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { register_user } from "../services/userAPI";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("authToken");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/notes");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await register_user(username, password, email);

      if (response.success === true) {
        alert("Registration successful! Please log in.");
        navigate("/");
      } else {
        alert(
          `Registration failed. Please try again.\n${
            response?.data?.response?.data?.message || "Unknown error."
          }`
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        `Registration failed. Please try again.\n${error || "Unknown error."}`
      );
    }
  };

  return (
    <div
      className="w-screen h-screen bg-primary-bg text-primary-text flex 
    items-center justify-center"
    >
      <div
        className="bg-secondary-bg p-8 rounded-lg shadow-lg w-full 
      max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text 
              rounded-md focus:outline-none focus:ring-2 
              focus:ring-accent-text"
              placeholder="Enter your email"
            />
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text 
              rounded-md focus:outline-none focus:ring-2 
              focus:ring-accent-text"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text 
              rounded-md focus:outline-none focus:ring-2 
              focus:ring-accent-text"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-bold"
            >
              Confirm Password:
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text 
              rounded-md focus:outline-none focus:ring-2 
              focus:ring-accent-text"
              placeholder="Confirm your password"
            />
          </div>

          <div className="space-y-2">
            {/* Submit Button */}
            <button
              type="submit"
              className="mb-1 w-full bg-accent-text text-primary-bg py-2 px-4 
              rounded-lg hover:bg-accent-hover transition duration-300 
              ease-in-out"
            >
              Register
            </button>

            {/* Login Page Link */}
            <Link to="/">
              <button
                type="button"
                className="mt-1 w-full bg-accent-text text-primary-bg py-2 
                px-4 rounded-lg hover:bg-accent-hover transition duration-300 
                ease-in-out"
              >
                Login Page
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
