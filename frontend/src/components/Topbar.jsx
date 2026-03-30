// Top section with the page title and logout button.
export default function Topbar({ onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-copy">
        <p className="eyebrow">User management</p>
        <h1>Control Center</h1>
        <p>
          Monitor accounts, permissions, team boundaries, session enforcement, and compliance rules from a polished control surface.
        </p>
      </div>

      <div className="topbar-actions">
        <label className="searchbox" aria-label="Search dashboard">
          <span>Search</span>
          <input type="search" placeholder="Users, teams, roles..." />
        </label>
        <div className="action-row">
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
