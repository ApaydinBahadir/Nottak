import { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth"; // Importing the AuthContext
import { useNavigate, Link } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, checkAuth } = useAuth(); // Get the login function from AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(false);

  // Check if the user is already logged in (based on session)
  useEffect(() => {
    const checkSession = async () => {
      const response = await checkAuth(); // Ensure checkAuth is called

      if (response.success) {
        setSession(true);
        navigate("/notes"); // Redirect to notes page if already logged in
      }
    };

    checkSession();
  }, [session, navigate]); // Re-run effect when session state changes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Call login function from AuthContext
      await login(email, password);
      navigate("/notes"); // Redirect to the notes page after successful login
      alert("Login successful!");
    } catch (error) {
      alert(`Login failed. Please try again.\n${error || "Unknown error."}`);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-primary-bg text-primary-text flex 
    items-center justify-center"
    >
      <div className="bg-secondary-bg p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

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

          {/* Password Field */}
          <div className="mb-6">
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

          <div className="space-y-2">
            {/* Submit Button */}
            <button
              type="submit"
              className="mb-1 w-full bg-accent-text text-primary-bg py-2 
              px-4 rounded-lg hover:bg-accent-hover transition duration-300 
              ease-in-out"
            >
              Login
            </button>

            {/* Register Link */}
            <Link to="/register">
              <button
                type="button"
                className="mt-1 w-full bg-accent-text text-primary-bg py-2 
                px-4 rounded-lg hover:bg-accent-hover transition duration-300 
                ease-in-out"
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
