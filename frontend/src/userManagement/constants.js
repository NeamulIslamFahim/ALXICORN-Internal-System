// Shared enums and storage keys keep the UI, store, and API aligned.
export const ROLE_OPTIONS = {
  SUPER_ADMIN: "SUPER ADMIN",
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
};

export const PAGE_OPTIONS = {
  USERS: "users",
  TEAMS: "teams",
  PROFILE: "profile",
  DASHBOARD: "dashboard",
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

export const PERMISSION_OPTIONS = ["USER CREATE", "USER EDIT", "USER DEACTIVATE", "TEAM MANAGE"];

export const STORAGE_KEYS = {
  users: "um_users",
  teams: "um_teams",
  authUserId: "um_auth_user_id",
  page: "um_page",
  seedSignature: "um_seed_signature",
};
