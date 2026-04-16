import React, { Component, createContext } from "react";
import { PAGE_OPTIONS, PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, SIDEBAR_OPTIONS, STATUS_OPTIONS } from "../constants";
import { UserManagementStore } from "../store";

export const AppContext = createContext(null);
export { PAGE_OPTIONS, PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, SIDEBAR_OPTIONS, STATUS_OPTIONS };

const createUserManagementFactory = () => new UserManagementStore();

// The provider adapts store actions into a React-friendly API for pages and components.
export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.store = createUserManagementFactory();
    this.state = this.store.createInitialState();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setNotice = this.setNotice.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setSelectedNavItem = this.setSelectedNavItem.bind(this);
    this.openUserModal = this.openUserModal.bind(this);
    this.closeUserModal = this.closeUserModal.bind(this);
    this.openTeamModal = this.openTeamModal.bind(this);
    this.closeTeamModal = this.closeTeamModal.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.toggleUserStatus = this.toggleUserStatus.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
  }

  syncRoutePage(routePage) {
    if (!routePage || routePage === this.state.page) {
      return;
    }

    this.setState((prevState) => (prevState.page === routePage ? null : { page: routePage }));
  }

  applyStoreAction(actionName, ...args) {
    this.setState((prevState) => this.store[actionName](prevState, ...args));
  }

  componentDidMount() {
    // Restore the last browser session first, then hydrate from the API when no local snapshot exists.
    const restoredState = this.store.restoreSession(this.state);

    this.setState(restoredState);
    this.syncRoutePage(this.props.routePage);

    this.store.hydrateFromFile(restoredState).then((nextState) => {
      this.setState(nextState);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.routePage !== this.props.routePage) {
      this.syncRoutePage(this.props.routePage);
    }

    if (prevState !== this.state) {
      this.store.persistSession(this.state);
    }

    if (prevState.users !== this.state.users || prevState.teams !== this.state.teams) {
      this.store.persistData(this.state);
    }
  }

  login(username, password) {
    const result = this.store.login(this.state, username, password);
    if (result.ok) {
      this.setState(result.state);
    }
    return result;
  }

  logout() {
    this.applyStoreAction("logout");
  }

  setNotice(notice) {
    this.applyStoreAction("setNotice", notice);
  }

  setPage(page) {
    this.applyStoreAction("setPage", page);
  }

  setSelectedNavItem(selectedNavItem) {
    this.applyStoreAction("setSelectedNavItem", selectedNavItem);
  }

  openUserModal(mode, data = null) {
    this.applyStoreAction("openUserModal", mode, data);
  }

  closeUserModal() {
    this.applyStoreAction("closeUserModal");
  }

  openTeamModal(mode, data = null) {
    this.applyStoreAction("openTeamModal", mode, data);
  }

  closeTeamModal() {
    this.applyStoreAction("closeTeamModal");
  }

  saveUser(form) {
    this.applyStoreAction("saveUser", form);
  }

  deleteUser(userId) {
    this.applyStoreAction("deleteUser", userId);
  }

  toggleUserStatus(userId) {
    this.applyStoreAction("toggleUserStatus", userId);
  }

  saveTeam(form) {
    this.applyStoreAction("saveTeam", form);
  }

  deleteTeam(teamId) {
    this.applyStoreAction("deleteTeam", teamId);
  }

  render() {
    const currentUser = this.store.getCurrentUser(this.state);
    const permissions = this.store.getPermissions(currentUser);
    // A single value object keeps page components decoupled from store internals.
    const value = {
      users: this.state.users,
      teams: this.state.teams,
      currentUser,
      page: this.state.page,
      selectedNavItem: this.state.selectedNavItem,
      modal: this.state.modal,
      notice: this.state.notice,
      permissions,
      login: this.login,
      logout: this.logout,
      setNotice: this.setNotice,
      setPage: this.setPage,
      setSelectedNavItem: this.setSelectedNavItem,
      navigateToPage: this.props.onNavigateToPage || null,
      navigateToLogin: this.props.onNavigateToLogin || null,
      navigateToHome: this.props.onNavigateToHome || null,
      openUserModal: this.openUserModal,
      closeUserModal: this.closeUserModal,
      openTeamModal: this.openTeamModal,
      closeTeamModal: this.closeTeamModal,
      saveUser: this.saveUser,
      deleteUser: this.deleteUser,
      toggleUserStatus: this.toggleUserStatus,
      saveTeam: this.saveTeam,
      deleteTeam: this.deleteTeam,
    };

    return <AppContext.Provider value={value}>{this.props.children}</AppContext.Provider>;
  }
}
