import React, { Component } from "react";
import { AppContext } from "../../context/AppContext";
import { BellIcon, SearchIcon, SettingsIcon, UserCircleIcon } from "../icons/WorkspaceIcons";
import styles from "../../AppShell.module.css";

export default class Navbar extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      notificationOpen: false,
      profileOpen: false,
    };
  }

  toggleNotifications() {
    this.setState((state) => ({
      notificationOpen: !state.notificationOpen,
      profileOpen: false,
    }));
  }

  toggleProfile() {
    this.setState((state) => ({
      profileOpen: !state.profileOpen,
      notificationOpen: false,
    }));
  }

  closeMenus() {
    this.setState({
      notificationOpen: false,
      profileOpen: false,
    });
  }

  handleSettings() {
    this.context?.setNotice?.("Settings page coming soon.");
    this.closeMenus();
  }

  handleLogout() {
    this.context?.logout?.();
    if (this.context?.navigateToLogin) {
      this.context.navigateToLogin();
    }
    this.closeMenus();
  }

  render() {
    const currentUser = this.context?.currentUser;

    return (
      <header className={styles.workspaceTopbar}>
        <div className={styles.workspaceSearchShell}>
          <SearchIcon className={styles.workspaceSearchIcon} />
          <input
            className={styles.workspaceSearchInput}
            value={this.state.searchValue}
            onChange={(event) => this.setState({ searchValue: event.target.value })}
            placeholder="Search parameters..."
            aria-label="Search parameters"
          />
        </div>

        <div className={styles.workspaceActions}>
          <div className={styles.workspaceMenuShell}>
            <div
              role="button"
              tabIndex={0}
              className={styles.workspaceIconAction}
              aria-label="Notifications"
              onClick={() => this.toggleNotifications()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  this.toggleNotifications();
                }
              }}
            >
              <BellIcon className={styles.workspaceBellIcon} />
            </div>

            {this.state.notificationOpen ? (
              <div className={styles.workspaceMenu}>
                <div className={styles.workspaceMenuEmpty}>No Notification</div>
              </div>
            ) : null}
          </div>

          <div className={styles.workspaceMenuShell}>
            <div
              role="button"
              tabIndex={0}
              className={styles.workspaceProfileShell}
              aria-label="Profile"
              onClick={() => this.toggleProfile()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  this.toggleProfile();
                }
              }}
            >
              <span className={styles.workspaceUserRole}>{currentUser?.role || "Super Admin"}</span>
              <span className={styles.workspaceAvatar}>
                <UserCircleIcon className={styles.workspaceAvatarIcon} />
              </span>
            </div>

            {this.state.profileOpen ? (
              <div className={styles.workspaceMenu}>
                <div className={styles.workspaceMenuItem} role="button" tabIndex={0} onClick={() => this.handleSettings()}>
                  <SettingsIcon className={styles.workspaceMenuItemIcon} />
                  Settings
                </div>
                <div className={styles.workspaceMenuItem} role="button" tabIndex={0} onClick={() => this.handleLogout()}>
                  <UserCircleIcon className={styles.workspaceMenuItemIcon} />
                  Logout
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>
    );
  }
}
