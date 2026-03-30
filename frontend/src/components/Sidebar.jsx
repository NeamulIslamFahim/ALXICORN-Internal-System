import Badge from "./Badge";

const items = [
  "Overview",
  "Accounts"
];

// Left navigation panel for the dashboard.
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-text">
          <strong>ALXICORN</strong>
          <span>Dashboard</span>
        </div>
      </div>

      <Badge tone="gold">Governance Dashboard</Badge>

      <nav className="nav-list" aria-label="Primary">
        {items.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}
