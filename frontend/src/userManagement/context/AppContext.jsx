import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  PAGE_OPTIONS,
  createUserManagementFactory,
  PERMISSION_OPTIONS,
  ROLE_OPTIONS,
  SENIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "../modules/userManagement";

const AppContext = createContext(null);

export { PAGE_OPTIONS, PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS };

export function AppProvider({ children }) {
  // The factory owns the business logic and the React state only renders it.
  const store = useMemo(() => createUserManagementFactory(), []);
  const [state, setState] = useState(() => store.createInitialState());

  useEffect(() => {
    setState((prev) => store.syncSeedIfNeeded(prev));
  }, [store]);

  useEffect(() => {
    store.persist(state);
  }, [store, state]);

  const currentUser = useMemo(() => store.getCurrentUser(state), [store, state]);
  const permissions = useMemo(() => store.getPermissions(currentUser), [store, currentUser]);

  const value = useMemo(
    () => ({
      users: state.users,
      teams: state.teams,
      currentUser,
      page: state.page,
      modal: state.modal,
      notice: state.notice,
      permissions,
      login: (email, password) => {
        const result = store.login(state, email, password);
        if (result.ok) {
          setState(result.state);
        }
        return result;
      },
      logout: () => setState((prev) => store.logout(prev)),
      setPage: (page) => setState((prev) => store.setPage(prev, page)),
      openUserModal: (mode, data = null) => setState((prev) => store.openUserModal(prev, mode, data)),
      closeUserModal: () => setState((prev) => store.closeUserModal(prev)),
      openTeamModal: (mode, data = null) => setState((prev) => store.openTeamModal(prev, mode, data)),
      closeTeamModal: () => setState((prev) => store.closeTeamModal(prev)),
      saveUser: (form) => setState((prev) => store.saveUser(prev, form)),
      deleteUser: (userId) => setState((prev) => store.deleteUser(prev, userId)),
      toggleUserStatus: (userId) => setState((prev) => store.toggleUserStatus(prev, userId)),
      saveTeam: (form) => setState((prev) => store.saveTeam(prev, form)),
      deleteTeam: (teamId) => setState((prev) => store.deleteTeam(prev, teamId)),
    }),
    [currentUser, permissions, state, store]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
