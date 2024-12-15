import SidebarIcon from "./subcomponent/SidebarIcon";

export default function Sidebar() {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
                 bg-secondary-bg shadow-lg text-primary-text border-r border-gray-800"
    >
      <SidebarIcon icon="L" tooltip="List all notes." />
      <SidebarIcon icon="R" tooltip="Last note seen." />
      <SidebarIcon icon="P" tooltip="Profile of user." />
    </div>
  );
}
