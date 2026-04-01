import { useApp } from "../context/AppContext";

// Sidebar for navigation and logout.
export default function Sidebar() {
  const { currentUser, page, setPage, logout } = useApp();
  const isEmployee = currentUser?.role === "EMPLOYEE";

  return (
    <aside className="sidebar">
      <div>
        <p className="eyebrow">User system</p>
        <h1>{currentUser?.role || "Menu"}</h1>
        <p className="sidebar-note">{currentUser ? currentUser.full_name : ""}</p>
      </div>

      <nav className="nav-list">
        {isEmployee ? (
          <button
            type="button"
            className={page === "profile" ? "nav-button active" : "nav-button"}
            onClick={() => setPage("profile")}
          >
            Profile
          </button>
        ) : (
          <>
            <button
              type="button"
              className={page === "users" ? "nav-button active" : "nav-button"}
              onClick={() => setPage("users")}
            >
              Users
            </button>
            <button
              type="button"
              className={page === "teams" ? "nav-button active" : "nav-button"}
              onClick={() => setPage("teams")}
            >
              Teams
            </button>
          </>
        )}
      </nav>

      <div className="sidebar-card">
        <p className="sidebar-note">Signed in as <strong>{currentUser?.full_name}</strong></p>
        <button type="button" className="ghost-button" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
