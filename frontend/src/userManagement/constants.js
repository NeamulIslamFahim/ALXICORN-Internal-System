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

export const SIDEBAR_OPTIONS = {
  USER_MANAGEMENT: "user-management",
  TALENT_ACQUISITION: "talent-acquisition",
  ONBOARDING: "onboarding",
  EMPLOYEE_TIME_TABLE: "employee-time-table",
  DOCUMENT_MANAGEMENT: "document-management",
  MEETING_NOTES: "meeting-notes",
  LEAVE_MANAGEMENT: "leave-management",
  HOW_TO_GUIDELINE: "how-to-guideline",
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
  selectedNavItem: "um_selected_nav_item",
  seedSignature: "um_seed_signature",
};
