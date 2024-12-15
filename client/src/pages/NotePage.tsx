export default function NotePage() {
  return (
    <div
      className="bg-primary-bg h-screen
                   w-[calc(100vw-4rem)] ml-16
                   text-primary-text flex flex-col
                   p-3 gap-5"
    >
      {/* Title Section */}
      <div className="flex flex-row gap-4 justify-center">
        <label className="text-secondary-text">Title:</label>
        <input
          type="text"
          className="bg-secondary-bg
                       text-primary-text
                       pl-2 border border-tertiary-bg
                       rounded-md focus:outline-none focus:ring-2
                       focus:ring-accent-text focus:border-transparent"
        />
      </div>

      {/* Text Area Section */}
      <div className="flex-grow">
        <textarea
          className="bg-secondary-bg w-full h-full
                       text-primary-text
                       border border-tertiary-bg
                       resize-none pl-2 rounded-md
                       focus:outline-none focus:ring-2
                       focus:ring-accent-text focus:border-transparent"
          placeholder="Start typing..."
        ></textarea>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-row justify-end gap-4">
        <button
          className="bg-accent-text text-primary-bg
                       px-4 py-2 rounded-md
                       hover:bg-primary-text hover:text-accent-text
                       transition duration-200"
        >
          Save Note
        </button>
        <button
          className="bg-secondary-bg text-primary-text
                       px-4 py-2 rounded-md
                       border border-accent-text
                       hover:bg-primary-bg hover:text-accent-text
                       transition duration-200"
        >
          Delete Note
        </button>
      </div>
    </div>
  );
}
