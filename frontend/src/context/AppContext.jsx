import { createContext, useContext, useEffect, useMemo, useState } from "react";
import seedData from "../data/seedData.json";
import { makeId, nowStamp, readJSON, writeJSON } from "../utils/localStorageHelper";

const STORAGE_KEYS = {
  users: "um_users",
  teams: "um_teams",
  authUserId: "um_auth_user_id",
  page: "um_page",
};

export const ROLE_OPTIONS = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
};

export const STATUS_OPTIONS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  TERMINATED: "TERMINATED",
};

export const SENIORITY_OPTIONS = {
  JUNIOR: "JUNIOR",
  MID: "MID",
  SENIOR: "SENIOR",
  LEAD: "LEAD",
};

export const PERMISSION_OPTIONS = ["USER_CREATE", "USER_EDIT", "USER_DEACTIVATE", "TEAM_MANAGE"];

const AppContext = createContext(null);
const SEED_SIGNATURE_KEY = "um_seed_signature";

function normalizeToken(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeRole(value) {
  const normalized = normalizeToken(value).replace(/_+/g, "_");
  return Object.values(ROLE_OPTIONS).includes(normalized) ? normalized : ROLE_OPTIONS.EMPLOYEE;
}

function normalizeStatus(value) {
  const normalized = normalizeToken(value);
  return Object.values(STATUS_OPTIONS).includes(normalized) ? normalized : STATUS_OPTIONS.ACTIVE;
}

function normalizeSeniority(value) {
  const normalized = normalizeToken(value);
  return Object.values(SENIORITY_OPTIONS).includes(normalized) ? normalized : SENIORITY_OPTIONS.JUNIOR;
}

function normalizePermission(value) {
  const normalized = normalizeToken(value);
  return normalized === "ALL_ACCESS" || PERMISSION_OPTIONS.includes(normalized) ? normalized : normalized;
}

function normalizeSeedData(seed) {
  const teams = Array.isArray(seed?.teams)
    ? seed.teams
        .filter(Boolean)
        .map((team, index) => ({
          id: team.id || makeId(`team-${index}`),
          name: String(team.name || "").trim() || "Team",
          team_lead_id: team.team_lead_id || null,
          members: Array.isArray(team.members)
            ? team.members
                .filter(Boolean)
                .map((member) => ({
                  user_id: member.user_id,
                  seniority_role: normalizeSeniority(member.seniority_role),
                }))
            : [],
        }))
    : [];

  const teamIds = new Set(teams.map((team) => team.id));

  const users = Array.isArray(seed?.users)
    ? seed.users
        .filter(Boolean)
        .map((user, index) => ({
          id: user.id || makeId(`user-${index}`),
          full_name: String(user.full_name || "").trim() || "User",
          email: String(user.email || "").trim().toLowerCase(),
          password: String(user.password || ""),
          role: normalizeRole(user.role),
          status: normalizeStatus(user.status),
          permissions: Array.isArray(user.permissions)
            ? user.permissions.map(normalizePermission)
            : [],
          team_id: user.team_id && teamIds.has(user.team_id) ? user.team_id : null,
          seniority_role: normalizeSeniority(user.seniority_role),
          created_at: user.created_at || nowStamp(),
        }))
    : [];

  users.forEach((user) => {
    if (user.role === ROLE_OPTIONS.SUPER_ADMIN && !user.permissions.includes("ALL_ACCESS")) {
      user.permissions = ["ALL_ACCESS"];
    }
  });

  const userIds = new Set(users.map((user) => user.id));

  const nextTeams = teams.map((team) => {
    const members = team.members.filter((member) => userIds.has(member.user_id));
    const leadExists = team.team_lead_id && userIds.has(team.team_lead_id);
    const leadId = leadExists ? team.team_lead_id : members[0]?.user_id || null;

    const uniqueMembers = [];
    const seen = new Set();

    if (leadId) {
      seen.add(leadId);
      uniqueMembers.push({ user_id: leadId, seniority_role: SENIORITY_OPTIONS.LEAD });
    }

    members.forEach((member) => {
      if (!seen.has(member.user_id)) {
        seen.add(member.user_id);
        uniqueMembers.push(member);
      }
    });

    return {
      ...team,
      team_lead_id: leadId,
      members: uniqueMembers,
    };
  });

  return {
    users,
    teams: nextTeams,
  };
}

function buildSeedSignature(seed) {
  return JSON.stringify({
    users: seed.users,
    teams: seed.teams,
  });
}

function buildSeedState() {
  const normalizedSeed = normalizeSeedData(seedData);

  return {
    ...normalizedSeed,
    authUserId: null,
    page: "users",
    modal: null,
    notice: "",
    seedSignature: buildSeedSignature(normalizedSeed),
  };
}

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

function loadInitialState() {
  const seed = buildSeedState();
  const storedSignature = readJSON(SEED_SIGNATURE_KEY, "");
  const storedUsers = readJSON(STORAGE_KEYS.users, null);
  const storedTeams = readJSON(STORAGE_KEYS.teams, null);
  const seedChanged = storedSignature !== seed.seedSignature;
  const users = !seedChanged && Array.isArray(storedUsers) && storedUsers.every(isValidUser) ? storedUsers : seed.users;
  const teams = !seedChanged && Array.isArray(storedTeams) && storedTeams.every(isValidTeam) ? storedTeams : seed.teams;

  return {
    users,
    teams,
    authUserId: seedChanged ? null : readJSON(STORAGE_KEYS.authUserId, seed.authUserId),
    page: seedChanged ? seed.page : readJSON(STORAGE_KEYS.page, seed.page),
    modal: null,
    notice: "",
    seedSignature: seed.seedSignature,
  };
}

function getUserById(users, userId) {
  return users.find((user) => user.id === userId) || null;
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

function countActiveSuperAdmins(users) {
  return users.filter(
    (user) => user.role === ROLE_OPTIONS.SUPER_ADMIN && user.status === STATUS_OPTIONS.ACTIVE
  ).length;
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

export function AppProvider({ children }) {
  const [state, setState] = useState(loadInitialState);

  const currentUser = useMemo(() => getUserById(state.users, state.authUserId), [state.users, state.authUserId]);

  const permissions = useMemo(
    () => ({
      canCreateAdmin: currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN,
      canCreateEmployee:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || currentUser?.role === ROLE_OPTIONS.ADMIN,
      canManageTeams:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || canUse(currentUser, "TEAM_MANAGE"),
      canEditUsers: currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || canUse(currentUser, "USER_EDIT"),
      canDeactivateUsers:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN || canUse(currentUser, "USER_DEACTIVATE"),
      canViewTeams:
        currentUser?.role === ROLE_OPTIONS.SUPER_ADMIN ||
        currentUser?.role === ROLE_OPTIONS.ADMIN ||
        currentUser?.role === ROLE_OPTIONS.EMPLOYEE,
    }),
    [currentUser]
  );

  useEffect(() => {
    writeJSON(STORAGE_KEYS.users, state.users);
    writeJSON(STORAGE_KEYS.teams, state.teams);
    writeJSON(STORAGE_KEYS.authUserId, state.authUserId);
    writeJSON(STORAGE_KEYS.page, state.page);
    writeJSON(SEED_SIGNATURE_KEY, state.seedSignature);
  }, [state.users, state.teams, state.authUserId, state.page, state.seedSignature]);

  function login(email, password) {
    const user = state.users.find(
      (item) =>
        item.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        item.password === password &&
        item.status === STATUS_OPTIONS.ACTIVE
    );

    if (!user) {
      return { ok: false, message: "Wrong credentials." };
    }

    setState((prev) => ({
      ...prev,
      authUserId: user.id,
      page: user.role === ROLE_OPTIONS.EMPLOYEE ? "profile" : "users",
      notice: "",
    }));

    return { ok: true, user };
  }

  function logout() {
    setState((prev) => ({
      ...prev,
      authUserId: null,
      page: "users",
      modal: null,
      notice: "",
    }));
  }

  function setPage(page) {
    setState((prev) => ({ ...prev, page }));
  }

  function openUserModal(mode, data = null) {
    setState((prev) => ({ ...prev, modal: { type: "user", mode, data }, notice: "" }));
  }

  function closeUserModal() {
    setState((prev) => ({ ...prev, modal: null }));
  }

  function openTeamModal(mode, data = null) {
    setState((prev) => ({ ...prev, modal: { type: "team", mode, data }, notice: "" }));
  }

  function closeTeamModal() {
    setState((prev) => ({ ...prev, modal: null }));
  }

  function saveUser(form) {
    setState((prev) => {
      const authUser = getUserById(prev.users, prev.authUserId);
      const isEdit = Boolean(form.id);
      const current = prev.users.find((user) => user.id === form.id);

      if (!isEdit && authUser?.role !== ROLE_OPTIONS.SUPER_ADMIN && form.role === ROLE_OPTIONS.ADMIN) {
        return { ...prev, notice: "Only Super Admin can create Admin." };
      }

      if (!isEdit && authUser?.role === ROLE_OPTIONS.EMPLOYEE) {
        return { ...prev, notice: "Employee cannot create users." };
      }

      if (isEdit && current?.role === ROLE_OPTIONS.SUPER_ADMIN && countActiveSuperAdmins(prev.users) <= 1) {
        return { ...prev, notice: "Last Super Admin cannot be changed." };
      }

      const nextUsers = isEdit
        ? prev.users.map((user) =>
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
                        ? ["ALL_ACCESS"]
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
                    ? ["ALL_ACCESS"]
                    : [],
              team_id: form.team_id || null,
              seniority_role: form.seniority_role,
              created_at: nowStamp(),
            },
            ...prev.users,
          ];

      return {
        ...prev,
        users: nextUsers,
        modal: null,
        notice: isEdit ? "User updated." : "User created.",
      };
    });
  }

  function deleteUser(userId) {
    setState((prev) => {
      const target = prev.users.find((user) => user.id === userId);
      if (!target) {
        return prev;
      }

      if (target.role === ROLE_OPTIONS.SUPER_ADMIN && countActiveSuperAdmins(prev.users) <= 1) {
        return { ...prev, notice: "Last Super Admin cannot be deleted." };
      }

      const nextUsers = prev.users.filter((user) => user.id !== userId);
      const nextTeams = prev.teams.map((team) => ({
        ...team,
        team_lead_id: team.team_lead_id === userId ? null : team.team_lead_id,
        members: team.members.filter((member) => member.user_id !== userId),
      }));

      return {
        ...prev,
        users: nextUsers,
        teams: nextTeams,
        authUserId: prev.authUserId === userId ? nextUsers[0]?.id || null : prev.authUserId,
        notice: "User deleted.",
      };
    });
  }

  function toggleUserStatus(userId) {
    setState((prev) => {
      const target = prev.users.find((user) => user.id === userId);
      if (!target) {
        return prev;
      }

      const nextStatus =
        target.status === STATUS_OPTIONS.ACTIVE ? STATUS_OPTIONS.INACTIVE : STATUS_OPTIONS.ACTIVE;

      if (target.role === ROLE_OPTIONS.SUPER_ADMIN && nextStatus !== STATUS_OPTIONS.ACTIVE && countActiveSuperAdmins(prev.users) <= 1) {
        return { ...prev, notice: "Last Super Admin cannot be deactivated." };
      }

      const nextUsers = prev.users.map((user) =>
        user.id === userId ? { ...user, status: nextStatus } : user
      );

      return {
        ...prev,
        users: nextUsers,
        authUserId:
          prev.authUserId === userId && nextStatus !== STATUS_OPTIONS.ACTIVE
            ? nextUsers.find((user) => user.role === ROLE_OPTIONS.SUPER_ADMIN && user.status === STATUS_OPTIONS.ACTIVE)?.id ||
              nextUsers[0]?.id ||
              null
            : prev.authUserId,
        notice: `User set to ${nextStatus.toLowerCase()}.`,
      };
    });
  }

  function saveTeam(form) {
    setState((prev) => {
      const teamId = form.id || makeId("team");
      const nextUsers = updateUsersForTeam(prev.users, form, teamId);
      const nextTeams = saveTeamMembers(prev.teams, form, teamId);

      return {
        ...prev,
        users: nextUsers,
        teams: nextTeams,
        modal: null,
        notice: form.id ? "Team updated." : "Team created.",
      };
    });
  }

  function deleteTeam(teamId) {
    setState((prev) => {
      const nextTeams = prev.teams.filter((team) => team.id !== teamId);
      const nextUsers = prev.users.map((user) =>
        user.team_id === teamId ? { ...user, team_id: null } : user
      );

      return {
        ...prev,
        teams: nextTeams,
        users: nextUsers,
        notice: "Team deleted.",
      };
    });
  }

  const value = {
    users: state.users,
    teams: state.teams,
    currentUser,
    page: state.page,
    modal: state.modal,
    notice: state.notice,
    permissions,
    login,
    logout,
    setPage,
    openUserModal,
    closeUserModal,
    openTeamModal,
    closeTeamModal,
    saveUser,
    deleteUser,
    toggleUserStatus,
    saveTeam,
    deleteTeam,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
