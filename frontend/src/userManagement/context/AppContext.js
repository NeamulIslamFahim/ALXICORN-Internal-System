import React, { Component, createContext } from "react";
import { PAGE_OPTIONS, PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS, createUserManagementFactory } from "../index";

export const AppContext = createContext(null);
export { PAGE_OPTIONS, PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS };

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.store = createUserManagementFactory();
    this.state = this.store.createInitialState();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setPage = this.setPage.bind(this);
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

  componentDidMount() {
    this.setState((prevState) => this.store.syncSeedIfNeeded(prevState));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.store.persist(this.state);
    }
  }

  login(email, password) {
    const result = this.store.login(this.state, email, password);
    if (result.ok) {
      this.setState(result.state);
    }
    return result;
  }

  logout() {
    this.setState((prevState) => this.store.logout(prevState));
  }

  setPage(page) {
    this.setState((prevState) => this.store.setPage(prevState, page));
  }

  openUserModal(mode, data = null) {
    this.setState((prevState) => this.store.openUserModal(prevState, mode, data));
  }

  closeUserModal() {
    this.setState((prevState) => this.store.closeUserModal(prevState));
  }

  openTeamModal(mode, data = null) {
    this.setState((prevState) => this.store.openTeamModal(prevState, mode, data));
  }

  closeTeamModal() {
    this.setState((prevState) => this.store.closeTeamModal(prevState));
  }

  saveUser(form) {
    this.setState((prevState) => this.store.saveUser(prevState, form));
  }

  deleteUser(userId) {
    this.setState((prevState) => this.store.deleteUser(prevState, userId));
  }

  toggleUserStatus(userId) {
    this.setState((prevState) => this.store.toggleUserStatus(prevState, userId));
  }

  saveTeam(form) {
    this.setState((prevState) => this.store.saveTeam(prevState, form));
  }

  deleteTeam(teamId) {
    this.setState((prevState) => this.store.deleteTeam(prevState, teamId));
  }

  render() {
    const currentUser = this.store.getCurrentUser(this.state);
    const permissions = this.store.getPermissions(currentUser);
    const routePage = this.props.routePage || this.state.page;
    const value = {
      users: this.state.users,
      teams: this.state.teams,
      currentUser,
      page: routePage,
      modal: this.state.modal,
      notice: this.state.notice,
      permissions,
      login: this.login,
      logout: this.logout,
      setPage: this.setPage,
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
