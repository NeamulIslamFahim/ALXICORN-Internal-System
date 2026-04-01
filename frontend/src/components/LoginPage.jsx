import { useState } from "react";
import { useApp } from "../context/AppContext";

// Login screen.
export default function LoginPage() {
  const { login, notice, users } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const demoLogins = users.filter(
    (user) => user.role === "SUPER_ADMIN" || user.role === "ADMIN" || user.role === "EMPLOYEE"
  );

  function submit(event) {
    event.preventDefault();
    const result = login(form.email, form.password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-form-head">
            <p className="eyebrow">Secure access</p>
            <h2>Sign in</h2>
            <p className="auth-text">Use your role email and password to continue.</p>
          </div>

          <label>
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Password"
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Login
          </button>

          {error ? <p className="error-note">{error}</p> : null}
          {notice ? <p className="login-note">{notice}</p> : null}
        </form>
      </section>
    </main>
  );
}
