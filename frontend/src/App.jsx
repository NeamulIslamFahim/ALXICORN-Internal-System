import { useReducer, useState } from "react";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import Topbar from "./components/Topbar";
import MetricCard from "./components/MetricCard";
import AccountConsole from "./components/AccountConsole";
import { initialAccounts, initialActivity, superAdminCredentials } from "./data/systemState";
import { systemReducer } from "./data/systemReducer";

export default function App() {
  // This stores the login error message.
  const [authError, setAuthError] = useState("");
  // This stores the current signed-in user.
  const [currentUser, setCurrentUser] = useState(null);
  // This is the main app data.
  const [systemState, dispatch] = useReducer(systemReducer, {
    accounts: initialAccounts,
    activity: initialActivity,
    nextUserNumber: 4,
  });

  // These small cards show the current system summary.
  const overviewMetrics = [
    {
      label: "Active users",
      value: String(systemState.accounts.filter((account) => account.status === "Active").length),
      delta: "Live account count",
    },
    {
      label: "Super Admins",
      value: String(
        systemState.accounts.filter((account) => account.role === "Super Admin" && account.status === "Active").length
      ),
      delta: "Minimum 1 active",
    },
    {
      label: "Admin scopes",
      value: String(systemState.accounts.filter((account) => account.role === "Admin").length),
      delta: "Permission sets live",
    },
    {
      label: "Open deactivation requests",
      value: String(systemState.accounts.filter((account) => account.status === "Inactive").length),
      delta: "Pending review",
    },
  ];

  // Simple login check for the demo Super Admin account.
  function handleLogin(credentials) {
    if (
      credentials.email.trim().toLowerCase() === superAdminCredentials.email.toLowerCase() &&
      credentials.password === superAdminCredentials.password
    ) {
      const superAdmin = systemState.accounts.find((account) => account.role === "Super Admin");
      setCurrentUser(superAdmin || systemState.accounts[0]);
      setAuthError("");
      dispatch({ type: "LOGIN_SUCCESS" });
      return;
    }

    setAuthError("Invalid Super Admin credentials.");
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} authError={authError} />;
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Topbar onLogout={() => setCurrentUser(null)} />

        <section className="metrics-grid" id="overview">
          {overviewMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <AccountConsole
          currentUser={currentUser}
          accounts={systemState.accounts}
          onCreateAdmin={(payload) =>
            dispatch({
              type: "CREATE_ADMIN",
              payload,
            })
          }
          onCreateEmployee={(payload) =>
            dispatch({
              type: "CREATE_EMPLOYEE",
              payload,
            })
          }
          onToggleStatus={(payload) =>
            dispatch({
              type: payload.nextStatus === "Active" ? "REACTIVATE_ACCOUNT" : "DEACTIVATE_ACCOUNT",
              payload,
            })
          }
          onUpdateAccount={(payload) =>
            dispatch({
              type: "UPDATE_ACCOUNT",
              payload,
            })
          }
          onDeleteAccount={(payload) =>
            dispatch({
              type: "DELETE_ACCOUNT",
              payload,
            })
          }
        />
      </main>
    </div>
  );
}
