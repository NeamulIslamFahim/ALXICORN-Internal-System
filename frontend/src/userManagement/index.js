import { UserManagementStore } from "./store";

// Export one public surface for the whole user-management module.
export { PAGE_OPTIONS, PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS } from "./constants";
export { UserManagementNormalizer } from "./normalizers";
export { UserManagementStore };

// One clear factory entry point for the React app.
export const createUserManagementFactory = () => new UserManagementStore();
