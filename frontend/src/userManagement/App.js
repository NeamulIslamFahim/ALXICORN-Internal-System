import React, { Component } from "react";
import { AppProvider, AppContext, PAGE_OPTIONS, STATUS_OPTIONS } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";
import styles from "./AppShell.module.css";

// Admin roles switch between dashboard pages, while employees get a single profile view.
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

    const DashboardPage = isEmployee ? ProfilePage : DASHBOARD_PAGES[app.page] || UsersPage;

    return (
      <div className={styles.appShell}>
        <Sidebar />
        <main className={styles.mainContent}>
          {app.notice ? <div className={styles.noticeBar}>{app.notice}</div> : null}
          <DashboardPage />
        </main>
      </div>
    );
  }
}

class AppContent extends Component {
  static contextType = AppContext;

  render() {
    const currentUser = this.context?.currentUser;

    // The same shell wrapper is used for both auth and app screens so tokens stay consistent.
    return (
      <div className={styles.theme}>
        {!currentUser || currentUser.status !== STATUS_OPTIONS.ACTIVE ? <LoginPage /> : <AppShell />}
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <AppProvider
        routePage={this.props.routePage}
        onNavigateToPage={this.props.onNavigateToPage}
        onNavigateToLogin={this.props.onNavigateToLogin}
        onNavigateToHome={this.props.onNavigateToHome}
      >
        <AppContent />
      </AppProvider>
    );
  }
}
