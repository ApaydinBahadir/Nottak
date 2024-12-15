export default function RegisterPage() {
  return (
    <div className="w-screen h-screen bg-primary-bg text-primary-text flex items-center justify-center">
      <div className="bg-secondary-bg p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Email:</label>
            <input
              type="email"
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text"
              placeholder="Enter your email"
            />
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Username:</label>
            <input
              type="text"
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Password:</label>
            <input
              type="password"
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-bold">Confirm Password:</label>
            <input
              type="password"
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text"
              placeholder="Confirm your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent-text text-primary-bg py-2 px-4 rounded-lg hover:bg-accent-hover transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
