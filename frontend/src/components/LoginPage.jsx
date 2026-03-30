import Badge from "./Badge";
import { useState } from "react";

// This is the simple login screen shown before the dashboard.
export default function LoginPage({ onLogin, authError }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Submit the email and password to the parent component.
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(formData);
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-copy">
          <Badge tone="blue">User Management Login</Badge>
          <h1>Sign in to manage accounts</h1>
          <p>
            Access the governance dashboard, onboard employees, manage roles, and review session activity from one secure entry point.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Work email</span>
            <input
              type="email"
              name="email"
              placeholder="admin@company.com"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Sign in
          </button>

          {authError ? <p className="error-note">{authError}</p> : null}

          <p className="login-note">
            Demo-only frontend sign-in for now. You can connect this to your authentication API later.
          </p>
        </form>
      </section>
    </main>
  );
}
