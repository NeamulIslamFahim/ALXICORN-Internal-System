import React, { Component } from "react";
import { AppProvider, AppContext, PAGE_OPTIONS, ROLE_OPTIONS, SIDEBAR_OPTIONS, STATUS_OPTIONS } from "./context/AppContext";
import LoginPage from "../Login/pages/LoginPage";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import NoticePopup from "./components/layout/NoticePopup";
import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";
import styles from "./AppShell.module.css";
import pageStyles from "./pages/pages.module.css";

// Admin roles switch between workspace pages, while employees get a single profile view.
const DASHBOARD_PAGES = {
  [PAGE_OPTIONS.DASHBOARD]: UsersPage,
  [PAGE_OPTIONS.USERS]: UsersPage,
  [PAGE_OPTIONS.TEAMS]: TeamsPage,
  [PAGE_OPTIONS.PROFILE]: ProfilePage,
};

const SIDEBAR_LABELS = {
  [SIDEBAR_OPTIONS.USER_MANAGEMENT]: "User Management",
  [SIDEBAR_OPTIONS.TALENT_ACQUISITION]: "Talent Acquisition",
  [SIDEBAR_OPTIONS.ONBOARDING]: "Onboarding",
  [SIDEBAR_OPTIONS.EMPLOYEE_TIME_TABLE]: "Employee Time Table",
  [SIDEBAR_OPTIONS.DOCUMENT_MANAGEMENT]: "Document Management",
  [SIDEBAR_OPTIONS.MEETING_NOTES]: "Meeting Notes",
  [SIDEBAR_OPTIONS.LEAVE_MANAGEMENT]: "Leave Management",
  [SIDEBAR_OPTIONS.HOW_TO_GUIDELINE]: "How to Guideline",
};

function PlaceholderPage({ selectedNavItem }) {
  const label = SIDEBAR_LABELS[selectedNavItem] || "Workspace Module";

  return (
    <section className={pageStyles.pageCard}>
      <div className={pageStyles.hero}>
        <div className={pageStyles.heroCopy}>
          <h1 className={pageStyles.pageTitle}>{label}</h1>
          <p className={pageStyles.pageNote}>This module is not available yet.</p>
        </div>
      </div>

      <section className={pageStyles.managementShell}>
        <div className={pageStyles.summaryGrid}>
          <article className={pageStyles.summaryMetric}>
            <p className={pageStyles.summaryLabel}>Selected Module</p>
            <strong className={pageStyles.summaryValueCompact}>{label}</strong>
          </article>
          <article className={pageStyles.summaryMetric}>
            <p className={pageStyles.summaryLabel}>Status</p>
            <strong className={pageStyles.summaryValueCompact}>Coming Soon</strong>
          </article>
        </div>

        <div className={pageStyles.toolbarRow}>
          <p className={pageStyles.pageNote}>
            Select <strong>User Management</strong> from the sidebar to return to the live workspace.
          </p>
        </div>
      </section>
    </section>
  );
}

class AppShell extends Component {
  static contextType = AppContext;

  render() {
    const app = this.context;
    const currentUser = app?.currentUser;
    const isEmployee = currentUser?.role === ROLE_OPTIONS.EMPLOYEE;
    const showingUserManagement = (app?.selectedNavItem || SIDEBAR_OPTIONS.USER_MANAGEMENT) === SIDEBAR_OPTIONS.USER_MANAGEMENT;

    const ActivePage = isEmployee
      ? ProfilePage
      : showingUserManagement
        ? DASHBOARD_PAGES[app.page] || UsersPage
        : null;

    return (
      <div className={styles.appShell}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Navbar />
          <NoticePopup notice={app.notice} onClose={() => app.setNotice(null)} />
          {ActivePage ? <ActivePage /> : <PlaceholderPage selectedNavItem={app?.selectedNavItem} />}
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
