import { makeId, nowStamp } from "./utils/localStorageHelper";
import { ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS } from "./constants";

// Normalize seed and runtime data into one predictable shape before the UI uses it.
export class UserManagementNormalizer {
  static roleLookup = {
    SUPER_ADMIN: ROLE_OPTIONS.SUPER_ADMIN,
    ADMIN: ROLE_OPTIONS.ADMIN,
    EMPLOYEE: ROLE_OPTIONS.EMPLOYEE,
  };

  static statusLookup = {
    ACTIVE: STATUS_OPTIONS.ACTIVE,
    INACTIVE: STATUS_OPTIONS.INACTIVE,
    TERMINATED: STATUS_OPTIONS.TERMINATED,
  };

  static seniorityLookup = {
    JUNIOR: SENIORITY_OPTIONS.JUNIOR,
    MID: SENIORITY_OPTIONS.MID,
    SENIOR: SENIORITY_OPTIONS.SENIOR,
    LEAD: SENIORITY_OPTIONS.LEAD,
  };

  static permissionLookup = {
    USER_CREATE: "USER CREATE",
    USER_EDIT: "USER EDIT",
    USER_DEACTIVATE: "USER DEACTIVATE",
    TEAM_MANAGE: "TEAM MANAGE",
    ALL_ACCESS: "ALL ACCESS",
  };

  static normalizeToken(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  static normalizeRole(value) {
    const normalized = this.normalizeToken(value).replace(/_+/g, "_");
    return this.roleLookup[normalized] || ROLE_OPTIONS.EMPLOYEE;
  }

  static normalizeStatus(value) {
    const normalized = this.normalizeToken(value);
    return this.statusLookup[normalized] || STATUS_OPTIONS.ACTIVE;
  }

  static normalizeSeniority(value) {
    const normalized = this.normalizeToken(value);
    return this.seniorityLookup[normalized] || SENIORITY_OPTIONS.JUNIOR;
  }

  static normalizePermission(value) {
    const normalized = this.normalizeToken(value);
    return this.permissionLookup[normalized] || String(value || "").trim().toUpperCase();
  }

  static normalizeSeedData(seed = { users: [], teams: [] }) {
    // Teams are normalized first so user.team_id can be validated against known team ids.
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
                    seniority_role: this.normalizeSeniority(member.seniority_role),
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
            username: String(user.username || "").trim().toLowerCase(),
            email: String(user.email || "").trim().toLowerCase(),
            password: String(user.password || ""),
            role: this.normalizeRole(user.role),
            status: this.normalizeStatus(user.status),
            permissions: Array.isArray(user.permissions) ? user.permissions.map((item) => this.normalizePermission(item)) : [],
            team_id: user.team_id && teamIds.has(user.team_id) ? user.team_id : null,
            seniority_role: this.normalizeSeniority(user.seniority_role),
            created_at: user.created_at || nowStamp(),
          }))
      : [];

    // Super admins always keep their full-access permission even if the source data omits it.
    users.forEach((user) => {
      if (user.role === ROLE_OPTIONS.SUPER_ADMIN && !user.permissions.includes("ALL ACCESS")) {
        user.permissions = ["ALL ACCESS"];
      }
    });

    const userIds = new Set(users.map((user) => user.id));

    // Team members are rebuilt to remove invalid references and ensure the lead is listed first.
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

  static buildSeedSignature(seed) {
    return JSON.stringify({
      users: seed.users,
      teams: seed.teams,
    });
  }
}
