// These are the team names the forms can choose from.
export const teamOptions = [
  "Select Team",
  "Research Team",
  "Development Team",
  "Human Resource (HR)"
];

// These are the seniority levels inside a team.
export const seniorityOptions = ["Junior", "Mid", "Senior", "Lead"];

// This is the first user in the app.
export const initialAccounts = [
  {
    id: "U-1001",
    fullName: "Super Admin",
    email: "superadmin.alxicorn@gmail.com",
    role: "Super Admin",
    permissions: ["All modules"],
    team: "ALXICORN",
    seniority: "Lead",
    status: "Active",
    password: "SuperAdmin@123",
    createdBy: "System",
    createdAt: "2026-03-30 09:00",
    lastLogin: "2026-03-30 09:20",
    lastPasswordChange: "2026-03-30 09:00",
    sessionId: "sess-sa-001",
    fingerprintHash: "fp-sa-001",
    deactivationDate: "",
    deactivationReason: "",
    deactivatedBy: "",
  }
];

// Demo login credentials for the Super Admin account.
export const superAdminCredentials = {
  email: "superadmin.alxicorn@gmail.com",
  password: "SuperAdmin@123",
};

// Start with an empty activity list.
export const initialActivity = [];

// Return a timestamp like "2026-03-30 09:00".
export function getNowStamp() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

// Make a simple password string for demo accounts.
export function makePassword(role) {
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${role.replace(/\s+/g, "")}@${suffix}`;
}

// Build a fake session id for the account.
export function makeSessionId(role, nextId) {
  const prefix = role === "Admin" ? "ad" : "em";
  return `sess-${prefix}-${String(nextId).padStart(3, "0")}`;
}

// Build a fake fingerprint hash for the account.
export function makeFingerprint(nextId) {
  return `fp-${String(nextId).padStart(3, "0")}`;
}
