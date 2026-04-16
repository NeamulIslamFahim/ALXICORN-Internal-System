import seedData from "./data/seedData.json";
import { makeId, nowStamp, readJSON, writeJSON } from "./utils/localStorageHelper";
import { PAGE_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, SIDEBAR_OPTIONS, STATUS_OPTIONS, STORAGE_KEYS } from "./constants";
import { UserManagementNormalizer } from "./normalizers";

// The store owns all business rules so the UI stays focused on rendering and events.
export class UserManagementStore {
  constructor(seed = seedData) {
    this.seed = UserManagementNormalizer.normalizeSeedData(seed);
    this.seedSignature = UserManagementNormalizer.buildSeedSignature(this.seed);
  }

  static isValidUser(user) {
    return (
      user &&
      typeof user === "object" &&
      typeof user.username === "string" &&
      typeof user.password === "string" &&
      Object.values(ROLE_OPTIONS).includes(user.role) &&
      Object.values(STATUS_OPTIONS).includes(user.status)
    );
  }

  static isValidTeam(team) {
    return team && typeof team === "object" && typeof team.name === "string" && Array.isArray(team.members);
  }

  static getUserById(users, userId) {
    return users.find((user) => user.id === userId) || null;
  }

  static countActiveSuperAdmins(users) {
    return users.filter(
      (user) => user.role === ROLE_OPTIONS.SUPER_ADMIN && user.status === STATUS_OPTIONS.ACTIVE
    ).length;
  }

  static canUse(user, permission) {
    if (!user) {
      return false;
    }

    if (user.role === ROLE_OPTIONS.SUPER_ADMIN) {
      return true;
    }

    return user.permissions.includes(permission);
  }

  static saveTeamMembers(teams, teamForm, teamId) {
    const nextMembers = teamForm.members.map((member) => ({
      user_id: member.user_id,
      seniority_role: member.seniority_role,
    }));

    if (teamForm.team_lead_id && !nextMembers.some((member) => member.user_id === teamForm.team_lead_id)) {
      nextMembers.unshift({
        user_id: teamForm.team_lead_id,
        seniority_role: SENIORITY_OPTIONS.LEAD,
      });
    }

    return [
      ...teams.filter((team) => team.id !== teamId),
      {
        id: teamId,
        name: teamForm.name,
        team_lead_id: teamForm.team_lead_id,
        members: nextMembers,
      },
    ];
  }

  static updateUsersForTeam(users, teamForm, teamId) {
    const memberMap = new Map(teamForm.members.map((member) => [member.user_id, member.seniority_role]));
    const memberIds = new Set(teamForm.members.map((member) => member.user_id));
    memberIds.add(teamForm.team_lead_id);

    return users.map((user) => {
      if (memberIds.has(user.id)) {
        return {
          ...user,
          team_id: teamId,
          seniority_role:
            user.id === teamForm.team_lead_id ? SENIORITY_OPTIONS.LEAD : memberMap.get(user.id) || user.seniority_role,
        };
      }

      if (user.team_id === teamId) {
        return { ...user, team_id: null };
      }

      return user;
    });
  }

  createInitialState() {
    // The initial render stays deterministic for SSR; session data is restored after mount.
    return {
      users: this.seed.users,
      teams: this.seed.teams,
      authUserId: null,
      page: PAGE_OPTIONS.USERS,
      selectedNavItem: SIDEBAR_OPTIONS.USER_MANAGEMENT,
      modal: null,
      notice: "",
      seedSignature: this.seedSignature,
    };
  }

  restoreSession(state) {
    // Local browser data wins over the seed so refreshes keep the latest user edits.
    const storedUsers = readJSON(STORAGE_KEYS.users, null);
    const storedTeams = readJSON(STORAGE_KEYS.teams, null);
    const users = Array.isArray(storedUsers) && storedUsers.every(UserManagementStore.isValidUser) ? storedUsers : state.users;
    const teams = Array.isArray(storedTeams) && storedTeams.every(UserManagementStore.isValidTeam) ? storedTeams : state.teams;
    const authUserId = readJSON(STORAGE_KEYS.authUserId, null);

    return {
      ...state,
      users,
      teams,
      authUserId: users.some((user) => user.id === authUserId) ? authUserId : null,
      page: readJSON(STORAGE_KEYS.page, PAGE_OPTIONS.USERS),
      selectedNavItem: SIDEBAR_OPTIONS.USER_MANAGEMENT,
    };
  }

  getCurrentUser(state) {
    return UserManagementStore.getUserById(state.users, state.authUserId);
  }

  getPermissions(currentUser) {
    return {
      canCreateAdmin: currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN,
      canCreateEmployee:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || currentUser?.role === ROLE_OPTIONS.ADMIN,
      canManageTeams:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || UserManagementStore.canUse(currentUser, "TEAM MANAGE"),
      canEditUsers:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || UserManagementStore.canUse(currentUser, "USER EDIT"),
      canDeactivateUsers:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN ||
        UserManagementStore.canUse(currentUser, "USER DEACTIVATE"),
      canViewTeams:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN ||
        currentUser?.role === ROLE_OPTIONS.ADMIN ||
        currentUser?.role === ROLE_OPTIONS.EMPLOYEE,
    };
  }

  async hydrateFromFile(state) {
    if (typeof window === "undefined") {
      return state;
    }

    // Skip the API snapshot when local edits already exist in the browser.
    const storedUsers = readJSON(STORAGE_KEYS.users, null);
    const storedTeams = readJSON(STORAGE_KEYS.teams, null);
    const hasStoredUsers = Array.isArray(storedUsers) && storedUsers.every(UserManagementStore.isValidUser);
    const hasStoredTeams = Array.isArray(storedTeams) && storedTeams.every(UserManagementStore.isValidTeam);

    if (hasStoredUsers || hasStoredTeams) {
      return state;
    }

    try {
      const response = await fetch("/api", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        return state;
      }

      const data = await response.json();
      const users = Array.isArray(data.users) && data.users.every(UserManagementStore.isValidUser)
        ? data.users
        : state.users;
      const teams = Array.isArray(data.teams) && data.teams.every(UserManagementStore.isValidTeam)
        ? data.teams
        : state.teams;
      const authUserId = users.some((user) => user.id === state.authUserId) ? state.authUserId : null;

      return {
        ...state,
        users,
        teams,
        authUserId,
      };
    } catch {
      return state;
    }
  }

  login(state, username, password) {
    // Only active users can authenticate into the dashboard.
    const user = state.users.find(
      (item) =>
        item.username.trim().toLowerCase() === username.trim().toLowerCase() &&
        item.password === password &&
        item.status === STATUS_OPTIONS.ACTIVE
    );

    if (!user) {
      return { ok: false, message: "Wrong credentials.", state };
    }

    return {
      ok: true,
      state: {
        ...state,
        authUserId: user.id,
        page: user.role === ROLE_OPTIONS.EMPLOYEE ? PAGE_OPTIONS.PROFILE : PAGE_OPTIONS.USERS,
        selectedNavItem: SIDEBAR_OPTIONS.USER_MANAGEMENT,
        notice: "",
      },
      user,
    };
  }

  logout(state) {
    return {
      ...state,
      authUserId: null,
      page: PAGE_OPTIONS.USERS,
      selectedNavItem: SIDEBAR_OPTIONS.USER_MANAGEMENT,
      modal: null,
      notice: "",
    };
  }

  setNotice(state, notice = "") {
    return { ...state, notice };
  }

  setPage(state, page) {
    return { ...state, page, selectedNavItem: SIDEBAR_OPTIONS.USER_MANAGEMENT };
  }

  setSelectedNavItem(state, selectedNavItem) {
    return { ...state, selectedNavItem };
  }

  openUserModal(state, mode, data = null) {
    return { ...state, modal: { type: "user", mode, data }, notice: "" };
  }

  closeUserModal(state) {
    return { ...state, modal: null };
  }

  openTeamModal(state, mode, data = null) {
    return { ...state, modal: { type: "team", mode, data }, notice: "" };
  }

  closeTeamModal(state) {
    return { ...state, modal: null };
  }

  saveUser(state, form) {
    // User creation and edits are guarded here so every entry point follows the same rules.
    const authUser = UserManagementStore.getUserById(state.users, state.authUserId);
    const isEdit = Boolean(form.id);
    const current = state.users.find((user) => user.id === form.id);

    if (!isEdit && authUser?.role !== ROLE_OPTIONS.SUPER_ADMIN && form.role === ROLE_OPTIONS.ADMIN) {
      return { ...state, notice: "Only Super Admin can create Admin." };
    }

    if (!isEdit && authUser?.role === ROLE_OPTIONS.EMPLOYEE) {
      return { ...state, notice: "Employee cannot create users." };
    }

    if (isEdit && current?.role === ROLE_OPTIONS.SUPER_ADMIN && UserManagementStore.countActiveSuperAdmins(state.users) <= 1) {
      return { ...state, notice: "Last Super Admin cannot be changed." };
    }

    const nextUsers = isEdit
      ? state.users.map((user) =>
          user.id === form.id
            ? {
                ...user,
                full_name: form.full_name,
                username: form.username,
                email: form.email,
                password: form.password || user.password,
                role: form.role,
                status: form.status,
                permissions:
                  form.role === ROLE_OPTIONS.ADMIN
                    ? form.permissions
                    : user.role === ROLE_OPTIONS.SUPER_ADMIN
                      ? ["ALL ACCESS"]
                      : [],
                team_id: form.team_id || null,
                seniority_role: form.seniority_role,
              }
            : user
        )
      : [
          {
            id: makeId("user"),
            full_name: form.full_name,
            username: form.username,
            email: form.email,
            password: form.password,
            role: form.role,
            status: STATUS_OPTIONS.ACTIVE,
            permissions:
              form.role === ROLE_OPTIONS.ADMIN
                ? form.permissions
                : form.role === ROLE_OPTIONS.SUPER_ADMIN
                  ? ["ALL ACCESS"]
                  : [],
            team_id: form.team_id || null,
            seniority_role: form.seniority_role,
            created_at: nowStamp(),
          },
          ...state.users,
        ];

    return {
      ...state,
      users: nextUsers,
      modal: null,
      notice: isEdit ? "User updated." : "User created.",
    };
  }

  deleteUser(state, userId) {
    const target = state.users.find((user) => user.id === userId);
    if (!target) {
      return state;
    }

    if (target.role === ROLE_OPTIONS.SUPER_ADMIN && UserManagementStore.countActiveSuperAdmins(state.users) <= 1) {
      return { ...state, notice: "Last Super Admin cannot be deleted." };
    }

    const nextUsers = state.users.filter((user) => user.id !== userId);
    const nextTeams = state.teams.map((team) => ({
      ...team,
      team_lead_id: team.team_lead_id === userId ? null : team.team_lead_id,
      members: team.members.filter((member) => member.user_id !== userId),
    }));

    return {
      ...state,
      users: nextUsers,
      teams: nextTeams,
      authUserId: state.authUserId === userId ? nextUsers[0]?.id || null : state.authUserId,
      notice: "User deleted.",
    };
  }

  toggleUserStatus(state, userId) {
    const target = state.users.find((user) => user.id === userId);
    if (!target) {
      return state;
    }

    // Prevent the last active super admin from being locked out of the system.
    const nextStatus =
      target.status === STATUS_OPTIONS.ACTIVE ? STATUS_OPTIONS.INACTIVE : STATUS_OPTIONS.ACTIVE;

    if (
      target.role === ROLE_OPTIONS.SUPER_ADMIN &&
      nextStatus !== STATUS_OPTIONS.ACTIVE &&
      UserManagementStore.countActiveSuperAdmins(state.users) <= 1
    ) {
      return { ...state, notice: "Last Super Admin cannot be deactivated." };
    }

    const nextUsers = state.users.map((user) => (user.id === userId ? { ...user, status: nextStatus } : user));

    return {
      ...state,
      users: nextUsers,
      authUserId:
        state.authUserId === userId && nextStatus !== STATUS_OPTIONS.ACTIVE
          ? nextUsers.find((user) => user.role === ROLE_OPTIONS.SUPER_ADMIN && user.status === STATUS_OPTIONS.ACTIVE)?.id ||
            nextUsers[0]?.id ||
            null
          : state.authUserId,
      notice: `User set to ${nextStatus.toLowerCase()}.`,
    };
  }

  saveTeam(state, form) {
    const teamId = form.id || makeId("team");
    const nextUsers = UserManagementStore.updateUsersForTeam(state.users, form, teamId);
    const nextTeams = UserManagementStore.saveTeamMembers(state.teams, form, teamId);

    return {
      ...state,
      users: nextUsers,
      teams: nextTeams,
      modal: null,
      notice: form.id ? "Team updated." : "Team created.",
    };
  }

  deleteTeam(state, teamId) {
    const nextTeams = state.teams.filter((team) => team.id !== teamId);
    const nextUsers = state.users.map((user) => (user.team_id === teamId ? { ...user, team_id: null } : user));

    return {
      ...state,
      teams: nextTeams,
      users: nextUsers,
      notice: "Team deleted.",
    };
  }

  persistSession(state) {
    // Session and working data are mirrored locally so refreshes keep the latest browser state.
    if (state.users) writeJSON(STORAGE_KEYS.users, state.users);
    if (state.teams) writeJSON(STORAGE_KEYS.teams, state.teams);
    writeJSON(STORAGE_KEYS.authUserId, state.authUserId || null);
    writeJSON(STORAGE_KEYS.page, state.page || PAGE_OPTIONS.USERS);
    writeJSON(STORAGE_KEYS.selectedNavItem, state.selectedNavItem || SIDEBAR_OPTIONS.USER_MANAGEMENT);
    writeJSON(STORAGE_KEYS.seedSignature, state.seedSignature || "");
  }

  async persistData(state) {
    if (typeof window === "undefined" || !state.users || !state.teams) {
      return;
    }

    // The API write is best-effort because the local browser snapshot remains the primary fallback.
    try {
      await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: state.users,
          teams: state.teams,
        }),
      });
    } catch {
      // Ignore write errors so the UI remains usable.
    }
  }

}
