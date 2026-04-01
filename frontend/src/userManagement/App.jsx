import { AppProvider, PAGE_OPTIONS, STATUS_OPTIONS, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";

const DASHBOARD_PAGES = {
  [PAGE_OPTIONS.USERS]: UsersPage,
  [PAGE_OPTIONS.TEAMS]: TeamsPage,
};

function AppShell() {
  // Read the current signed-in user, current page, and any notice message.
  const { currentUser, page, notice } = useApp();
  const isEmployee = currentUser?.role === "EMPLOYEE";

  // Show the login screen until a valid active user is signed in.
  if (!currentUser || currentUser.status !== STATUS_OPTIONS.ACTIVE) {
    return <LoginPage />;
  }
  const DashboardPage = isEmployee ? ProfilePage : DASHBOARD_PAGES[page] || UsersPage;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        {/* Small message area for save and delete feedback. */}
        {notice ? <div className="notice-bar">{notice}</div> : null}

        {/* Employees only see their profile, other roles use the dashboard pages. */}
        <DashboardPage />
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
