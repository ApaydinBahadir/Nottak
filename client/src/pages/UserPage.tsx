export default function UserPage() {
  return (
    <div className="w-[calc(100vw-4rem)] ml-16 
    bg-primary-bg text-primary-text p-6 h-screen
    flex flex-col">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>

      <div className="bg-secondary-bg p-6 rounded-lg shadow-lg
       flex-grow">
        <form>
          {/* Display for Email (non-editable) */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Email:</label>
            <p className="text-gray-400">user@example.com</p>
          </div>

          {/* Display for Username (non-editable) */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Username:</label>
            <p className="text-gray-400">username123</p>
          </div>

          {/* Password Input Field */}
          <div className="mb-4">
            <label className="block text-sm font-bold">New Password:</label>
            <input
              type="password"
              className="w-full p-2 mt-1 bg-gray-800 text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-text"
              placeholder="Enter new password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent-text text-primary-bg py-2 px-4 rounded-lg hover:bg-accent-hover transition duration-300 ease-in-out"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
