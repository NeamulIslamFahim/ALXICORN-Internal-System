import { AppProvider, STATUS_OPTIONS, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";

function AppShell() {
  const { currentUser, page, notice } = useApp();

  if (!currentUser || currentUser.status !== STATUS_OPTIONS.ACTIVE) {
    return <LoginPage />;
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        {notice ? <div className="notice-bar">{notice}</div> : null}

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
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
