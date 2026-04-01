import { AppProvider, STATUS_OPTIONS, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";

function AppShell() {
  // Read the current signed-in user, current page, and any notice message.
  const { currentUser, page, notice } = useApp();

  // Show the login screen until a valid active user is signed in.
  if (!currentUser || currentUser.status !== STATUS_OPTIONS.ACTIVE) {
    return <LoginPage />;
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        {/* Small message area for save and delete feedback. */}
        {notice ? <div className="notice-bar">{notice}</div> : null}

        {/* Employees only see their profile, other roles use the dashboard pages. */}
        {currentUser.role === "EMPLOYEE" ? (
          <ProfilePage />
        ) : page === "teams" ? (
          <TeamsPage />
        ) : (
          <UsersPage />
        )}
      </main>
    </div>
  );
}

export default function App() {
  // The provider keeps all app state available everywhere in the UI.
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
