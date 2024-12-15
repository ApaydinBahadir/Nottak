// SidebarIcon Component
export default function SidebarIcon({
  icon,
  tooltip,
}: {
  icon: string;
  tooltip: string;
}) {
  return (
    <div className="sidebar-icon group">
      <i className={`icon-${icon} text-lg`}>{icon}</i>
      <div className="sidebar-tooltip group-hover:scale-100">{tooltip}</div>
    </div>
  );
}
