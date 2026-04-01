import seedData from "./data/seedData.json";
import { downloadJSON, makeId, nowStamp, readJSON, writeJSON } from "./utils/localStorageHelper";
import { PAGE_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS, STORAGE_KEYS } from "./constants";
import { buildSeedSignature, normalizeSeedData } from "./normalizers";

function isValidUser(user) {
  return (
    user &&
    typeof user === "object" &&
    typeof user.email === "string" &&
    typeof user.password === "string" &&
    Object.values(ROLE_OPTIONS).includes(user.role) &&
    Object.values(STATUS_OPTIONS).includes(user.status)
  );
}

function isValidTeam(team) {
  return team && typeof team === "object" && typeof team.name === "string" && Array.isArray(team.members);
}

function getUserById(users, userId) {
  return users.find((user) => user.id === userId) || null;
}

function countActiveSuperAdmins(users) {
  return users.filter(
    (user) => user.role === ROLE_OPTIONS.SUPER_ADMIN && user.status === STATUS_OPTIONS.ACTIVE
  ).length;
}

function canUse(user, permission) {
  if (!user) {
    return false;
  }

  if (user.role === ROLE_OPTIONS.SUPER_ADMIN) {
    return true;
  }

  return user.permissions.includes(permission);
}

function saveTeamMembers(teams, teamForm, teamId) {
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

function updateUsersForTeam(users, teamForm, teamId) {
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

export class UserManagementStore {
  constructor(seed = seedData) {
    this.seed = normalizeSeedData(seed);
    this.seedSignature = buildSeedSignature(this.seed);
  }

  createInitialState() {
    const storedSignature = readJSON(STORAGE_KEYS.seedSignature, "");
    const seedChanged = storedSignature !== this.seedSignature;
    const storedUsers = readJSON(STORAGE_KEYS.users, null);
    const storedTeams = readJSON(STORAGE_KEYS.teams, null);
    const users = !seedChanged && Array.isArray(storedUsers) && storedUsers.every(isValidUser) ? storedUsers : this.seed.users;
    const teams = !seedChanged && Array.isArray(storedTeams) && storedTeams.every(isValidTeam) ? storedTeams : this.seed.teams;

    return {
      users,
      teams,
      authUserId: seedChanged ? null : readJSON(STORAGE_KEYS.authUserId, null),
      page: seedChanged ? PAGE_OPTIONS.USERS : readJSON(STORAGE_KEYS.page, PAGE_OPTIONS.USERS),
      modal: null,
      notice: "",
      seedSignature: this.seedSignature,
    };
  }

  getCurrentUser(state) {
    return getUserById(state.users, state.authUserId);
  }

  getPermissions(currentUser) {
    return {
      canCreateAdmin: currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN,
      canCreateEmployee:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || currentUser?.role === ROLE_OPTIONS.ADMIN,
      canManageTeams:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || canUse(currentUser, "TEAM MANAGE"),
      canEditUsers: currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || canUse(currentUser, "USER EDIT"),
      canDeactivateUsers:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || canUse(currentUser, "USER DEACTIVATE"),
      canViewTeams:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN ||
        currentUser?.role === ROLE_OPTIONS.ADMIN ||
        currentUser?.role === ROLE_OPTIONS.EMPLOYEE,
    };
  }

  syncSeedIfNeeded(state) {
    if (state.seedSignature === this.seedSignature) {
      return state;
    }

    return {
      ...this.createInitialState(),
      notice: "Seed data refreshed.",
    };
  }

  login(state, email, password) {
    const user = state.users.find(
      (item) =>
        item.email.trim().toLowerCase() === email.trim().toLowerCase() &&
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
      modal: null,
      notice: "",
    };
  }

  setPage(state, page) {
    return { ...state, page };
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
    const authUser = getUserById(state.users, state.authUserId);
    const isEdit = Boolean(form.id);
    const current = state.users.find((user) => user.id === form.id);

    if (!isEdit && authUser?.role !== ROLE_OPTIONS.SUPER_ADMIN && form.role === ROLE_OPTIONS.ADMIN) {
      return { ...state, notice: "Only Super Admin can create Admin." };
    }

    if (!isEdit && authUser?.role === ROLE_OPTIONS.EMPLOYEE) {
      return { ...state, notice: "Employee cannot create users." };
    }

    if (isEdit && current?.role === ROLE_OPTIONS.SUPER_ADMIN && countActiveSuperAdmins(state.users) <= 1) {
      return { ...state, notice: "Last Super Admin cannot be changed." };
    }

    const nextUsers = isEdit
      ? state.users.map((user) =>
          user.id === form.id
            ? {
                ...user,
                full_name: form.full_name,
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

    if (target.role === ROLE_OPTIONS.SUPER_ADMIN && countActiveSuperAdmins(state.users) <= 1) {
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

    const nextStatus =
      target.status === STATUS_OPTIONS.ACTIVE ? STATUS_OPTIONS.INACTIVE : STATUS_OPTIONS.ACTIVE;

    if (
      target.role === ROLE_OPTIONS.SUPER_ADMIN &&
      nextStatus !== STATUS_OPTIONS.ACTIVE &&
      countActiveSuperAdmins(state.users) <= 1
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
    const nextUsers = updateUsersForTeam(state.users, form, teamId);
    const nextTeams = saveTeamMembers(state.teams, form, teamId);

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

  persist(state) {
    writeJSON(STORAGE_KEYS.users, state.users);
    writeJSON(STORAGE_KEYS.teams, state.teams);
    writeJSON(STORAGE_KEYS.authUserId, state.authUserId);
    writeJSON(STORAGE_KEYS.page, state.page);
    writeJSON(STORAGE_KEYS.seedSignature, state.seedSignature);
  }

  exportSeedData(state, filename = "seedData.json") {
    downloadJSON(filename, {
      users: state.users,
      teams: state.teams,
    });
  }
}
