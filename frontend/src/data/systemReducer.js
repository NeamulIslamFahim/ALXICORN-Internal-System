import {
  getNowStamp,
  makeFingerprint,
  makePassword,
  makeSessionId,
} from "./systemState";

// Add a new activity item to the top of the list.
function appendActivity(state, title, meta) {
  return [
    { title, meta, time: getNowStamp().slice(11, 16) },
    ...state,
  ];
}

export function systemReducer(state, action) {
  switch (action.type) {
    case "CREATE_ADMIN": {
      // Create a new Admin account.
      const nextId = state.nextUserNumber;
      const newAccount = {
        id: `U-${1000 + nextId}`,
        fullName: action.payload.fullName,
        email: action.payload.email,
        role: "Admin",
        permissions: action.payload.permissions,
        team: action.payload.team,
        seniority: action.payload.seniority,
        status: "Active",
        password: action.payload.password || makePassword("Admin"),
        createdBy: action.payload.createdBy,
        createdAt: getNowStamp(),
        lastLogin: "",
        lastPasswordChange: getNowStamp(),
        sessionId: makeSessionId("Admin", nextId),
        fingerprintHash: makeFingerprint(nextId),
        deactivationDate: "",
        deactivationReason: "",
        deactivatedBy: "",
      };

      return {
        ...state,
        nextUserNumber: nextId + 1,
        accounts: [newAccount, ...state.accounts],
        activity: appendActivity(
          state.activity,
          "Admin account created",
          `${newAccount.fullName} received ${newAccount.permissions.length} assigned module permission(s)`
        ),
      };
    }

    case "CREATE_EMPLOYEE": {
      // Create a new Employee account from the selected creator.
      const nextId = state.nextUserNumber;
      const creator = state.accounts.find((account) => account.id === action.payload.createdBy);
      // Employees inherit the creator's permissions, except "All modules".
      const inheritedPermissions = creator
        ? creator.permissions.filter((permission) => permission !== "All modules")
        : [];
      const newAccount = {
        id: `U-${1000 + nextId}`,
        fullName: action.payload.fullName,
        email: action.payload.email,
        role: "Employee",
        permissions: inheritedPermissions,
        team: action.payload.team,
        seniority: action.payload.seniority,
        status: "Active",
        password: action.payload.password || makePassword("Employee"),
        createdBy: action.payload.createdBy,
        createdAt: getNowStamp(),
        lastLogin: "",
        lastPasswordChange: getNowStamp(),
        sessionId: makeSessionId("Employee", nextId),
        fingerprintHash: makeFingerprint(nextId),
        deactivationDate: "",
        deactivationReason: "",
        deactivatedBy: "",
      };

      return {
        ...state,
        nextUserNumber: nextId + 1,
        accounts: [newAccount, ...state.accounts],
        activity: appendActivity(
          state.activity,
          "Employee account created",
          `${newAccount.fullName} onboarded through the Onboarding module`
        ),
      };
    }

    case "DEACTIVATE_ACCOUNT": {
      // Mark the account as inactive.
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                status: "Inactive",
                deactivationDate: getNowStamp(),
                deactivationReason: action.payload.reason,
                deactivatedBy: action.payload.deactivatedBy,
              }
            : account
        ),
        activity: appendActivity(
          state.activity,
          "Account deactivated",
          `${action.payload.targetName} was deactivated by ${action.payload.deactivatedBy}`
        ),
      };
    }

    case "REACTIVATE_ACCOUNT": {
      // Bring the account back to active status.
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                status: "Active",
                deactivationDate: "",
                deactivationReason: "",
                deactivatedBy: "",
              }
            : account
        ),
        activity: appendActivity(
          state.activity,
          "Account reactivated",
          `${action.payload.targetName} was restored to active access`
        ),
      };
    }

    case "RESET_EMPLOYEE_PASSWORD": {
      // Store the new password and update the change date.
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                password: action.payload.password,
                lastPasswordChange: getNowStamp(),
              }
            : account
        ),
        activity: appendActivity(
          state.activity,
          "Employee password reset",
          `${action.payload.targetName} received a manually set password`
        ),
      };
    }

    case "UPDATE_ACCOUNT": {
      // Save edited account details.
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                fullName: action.payload.fullName,
                email: action.payload.email,
                team: action.payload.team,
                seniority: action.payload.seniority,
                permissions: action.payload.permissions,
              }
            : account
        ),
        activity: appendActivity(
          state.activity,
          "Account updated",
          `${action.payload.fullName} was updated by Super Admin`
        ),
      };
    }

    case "DELETE_ACCOUNT": {
      // Remove the account from the saved list.
      return {
        ...state,
        accounts: state.accounts.filter((account) => account.id !== action.payload.id),
        activity: appendActivity(
          state.activity,
          "Account deleted",
          `${action.payload.targetName} was removed from the system`
        ),
      };
    }

    case "LOGIN_SUCCESS": {
      // Add a small log entry after login.
      return {
        ...state,
        activity: appendActivity(state.activity, "Authentication succeeded", "Super Admin logged in successfully"),
      };
    }

    default:
      return state;
  }
}
