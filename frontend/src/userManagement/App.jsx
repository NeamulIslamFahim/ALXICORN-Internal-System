import React, { Component } from "react";
import { AppProvider, AppContext, PAGE_OPTIONS, STATUS_OPTIONS } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";

const DASHBOARD_PAGES = {
  [PAGE_OPTIONS.USERS]: UsersPage,
  [PAGE_OPTIONS.TEAMS]: TeamsPage,
};

class AppShell extends Component {
  static contextType = AppContext;

  render() {
    const app = this.context;
    const currentUser = app?.currentUser;
    const isEmployee = currentUser?.role === "EMPLOYEE";

    if (!currentUser || currentUser.status !== STATUS_OPTIONS.ACTIVE) {
      return <LoginPage />;
    }

    const DashboardPage = isEmployee ? ProfilePage : DASHBOARD_PAGES[app.page] || UsersPage;

    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          {app.notice ? <div className="notice-bar">{app.notice}</div> : null}
          <DashboardPage />
        </main>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <AppShell />
      </AppProvider>
    );
  }
}
