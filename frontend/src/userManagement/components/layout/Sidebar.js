import React, { Component } from "react";
import { AppContext, PAGE_OPTIONS } from "../../context/AppContext";
import FormButton from "../forms/FormButton";
import styles from "./layout.module.css";

// Sidebar for navigation and logout.
export default class Sidebar extends Component {
  static contextType = AppContext;

  render() {
    // Pull the signed-in user and page state from the app context.
    const { currentUser, page, setPage, logout, navigateToPage, navigateToLogin } = this.context;
    const isEmployee = currentUser?.role === "EMPLOYEE";
    const goToPage = (nextPage) => {
      setPage(nextPage);
      if (navigateToPage) {
        navigateToPage(nextPage);
      }
    };
    const handleLogout = () => {
      logout();
      if (navigateToLogin) {
        navigateToLogin();
      }
    };
    const profileButtonClass = [styles.navButton, page === PAGE_OPTIONS.PROFILE ? styles.navButtonActive : null].filter(Boolean).join(" ");
    const usersButtonClass = [styles.navButton, page === PAGE_OPTIONS.USERS ? styles.navButtonActive : null].filter(Boolean).join(" ");
    const teamsButtonClass = [styles.navButton, page === PAGE_OPTIONS.TEAMS ? styles.navButtonActive : null].filter(Boolean).join(" ");

    return (
      <aside className={styles.sidebar}>
        {/* Top section shows the role and user name. */}
        <div>
          <p className={styles.eyebrow}>User system</p>
          <h1 className={styles.sidebarTitle}>{currentUser?.role || "Menu"}</h1>
          <p className={styles.sidebarNote}>{currentUser ? currentUser.full_name : ""}</p>
        </div>

        {/* Navigation changes based on the logged-in role. */}
        <nav className={styles.navList}>
          {isEmployee ? (
            <button
              type="button"
              className={profileButtonClass}
              onClick={() => goToPage(PAGE_OPTIONS.PROFILE)}
            >
              Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                className={usersButtonClass}
                onClick={() => goToPage(PAGE_OPTIONS.USERS)}
              >
                Users
              </button>
              <button
                type="button"
                className={teamsButtonClass}
                onClick={() => goToPage(PAGE_OPTIONS.TEAMS)}
              >
                Teams
              </button>
            </>
          )}
        </nav>

        {/* Logout stays in a small card at the bottom. */}
        <div className={styles.sidebarCard}>
          <p className={styles.sidebarNote}>
            Signed in as <strong>{currentUser?.full_name}</strong>
          </p>
          <FormButton type="button" variant="ghost" onClick={handleLogout}>
            Logout
          </FormButton>
        </div>
      </aside>
    );
  }
}
