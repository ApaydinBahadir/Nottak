import NoteCard from "../component/subcomponent/NoteCard";

export default function NoteListPage() {
  // Mock Data
  const notes = [
    {
      title: "Shopping List",
      created_time: "2024-12-12 10:45 AM",
      tags: ["groceries", "errands", "weekly"],
    },
    {
      title: "Meeting Notes",
      created_time: "2024-12-13 03:30 PM",
      tags: ["work", "project"],
    },
    {
      title: "Holiday Ideas",
      created_time: "2024-12-14 08:00 AM",
      tags: ["vacation", "travel", "family"],
    },
  ];

  return (
    <div
      className="ml-16 flex-grow min-h-screen bg-primary-bg text-primary-text
                 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {notes.map((note, index) => (
        <NoteCard
          key={index}
          title={note.title}
          created_time={note.created_time}
          tags={note.tags}
        />
      ))}
    </div>
  );
}
