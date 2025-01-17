// SidebarIcon Component
export default function SidebarIcon({
  icon,
  tooltip,
  onClick, // Accept onClick as a prop
}: {
  icon: string;
  tooltip: string;
  onClick?: () => void; // Make it optional
}) {
  return (
    <div className="sidebar-icon group" onClick={onClick}>
      {" "}
      {/* Attach the onClick to the div */}
      <i className={`icon-${icon} text-lg`}>{icon}</i>
      <div className="sidebar-tooltip group-hover:scale-100">{tooltip}</div>
    </div>
  );
}
