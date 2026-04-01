import seedData from "../../data/seedData.json";
import { makeId, nowStamp } from "../../utils/localStorageHelper";
import { PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS } from "./constants";

const ROLE_LOOKUP = {
  SUPER_ADMIN: ROLE_OPTIONS.SUPER_ADMIN,
  ADMIN: ROLE_OPTIONS.ADMIN,
  EMPLOYEE: ROLE_OPTIONS.EMPLOYEE,
};

const STATUS_LOOKUP = {
  ACTIVE: STATUS_OPTIONS.ACTIVE,
  INACTIVE: STATUS_OPTIONS.INACTIVE,
  TERMINATED: STATUS_OPTIONS.TERMINATED,
};

const SENIORITY_LOOKUP = {
  JUNIOR: SENIORITY_OPTIONS.JUNIOR,
  MID: SENIORITY_OPTIONS.MID,
  SENIOR: SENIORITY_OPTIONS.SENIOR,
  LEAD: SENIORITY_OPTIONS.LEAD,
};

const PERMISSION_LOOKUP = {
  USER_CREATE: "USER CREATE",
  USER_EDIT: "USER EDIT",
  USER_DEACTIVATE: "USER DEACTIVATE",
  TEAM_MANAGE: "TEAM MANAGE",
  ALL_ACCESS: "ALL ACCESS",
};

function normalizeToken(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function normalizeRole(value) {
  const normalized = normalizeToken(value).replace(/_+/g, "_");
  return ROLE_LOOKUP[normalized] || ROLE_OPTIONS.EMPLOYEE;
}

export function normalizeStatus(value) {
  const normalized = normalizeToken(value);
  return STATUS_LOOKUP[normalized] || STATUS_OPTIONS.ACTIVE;
}

export function normalizeSeniority(value) {
  const normalized = normalizeToken(value);
  return SENIORITY_LOOKUP[normalized] || SENIORITY_OPTIONS.JUNIOR;
}

export function normalizePermission(value) {
  const normalized = normalizeToken(value);
  return PERMISSION_LOOKUP[normalized] || String(value || "").trim().toUpperCase();
}

export function normalizeSeedData(seed = seedData) {
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
          permissions: Array.isArray(user.permissions) ? user.permissions.map(normalizePermission) : [],
          team_id: user.team_id && teamIds.has(user.team_id) ? user.team_id : null,
          seniority_role: normalizeSeniority(user.seniority_role),
          created_at: user.created_at || nowStamp(),
        }))
    : [];

  users.forEach((user) => {
    if (user.role === ROLE_OPTIONS.SUPER_ADMIN && !user.permissions.includes("ALL ACCESS")) {
      user.permissions = ["ALL ACCESS"];
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

export function buildSeedSignature(seed) {
  return JSON.stringify({
    users: seed.users,
    teams: seed.teams,
  });
}
