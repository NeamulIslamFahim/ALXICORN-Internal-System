import React, { Component } from "react";
import { AppContext, PAGE_OPTIONS } from "../../context/AppContext";
import FormButton from "../forms/FormButton";

// Sidebar for navigation and logout.
export default class Sidebar extends Component {
  static contextType = AppContext;

  render() {
    // Pull the signed-in user and page state from the app context.
    const { currentUser, page, setPage, logout } = this.context;
    const isEmployee = currentUser?.role === "EMPLOYEE";

    return (
      <aside className="sidebar">
        {/* Top section shows the role and user name. */}
        <div>
          <p className="eyebrow">User system</p>
          <h1>{currentUser?.role || "Menu"}</h1>
          <p className="sidebar-note">{currentUser ? currentUser.full_name : ""}</p>
        </div>

        {/* Navigation changes based on the logged-in role. */}
        <nav className="nav-list">
          {isEmployee ? (
            <button
              type="button"
              className={page === PAGE_OPTIONS.PROFILE ? "nav-button active" : "nav-button"}
              onClick={() => setPage(PAGE_OPTIONS.PROFILE)}
            >
              Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                className={page === PAGE_OPTIONS.USERS ? "nav-button active" : "nav-button"}
                onClick={() => setPage(PAGE_OPTIONS.USERS)}
              >
                Users
              </button>
              <button
                type="button"
                className={page === PAGE_OPTIONS.TEAMS ? "nav-button active" : "nav-button"}
                onClick={() => setPage(PAGE_OPTIONS.TEAMS)}
              >
                Teams
              </button>
            </>
          )}
        </nav>

        {/* Logout stays in a small card at the bottom. */}
        <div className="sidebar-card">
          <p className="sidebar-note">
            Signed in as <strong>{currentUser?.full_name}</strong>
          </p>
          <FormButton type="button" variant="ghost" onClick={logout}>
            Logout
          </FormButton>
        </div>
      </aside>
    );
  }
}
