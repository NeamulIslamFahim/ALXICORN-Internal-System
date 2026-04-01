import React, { Component } from "react";
import { AppContext, ROLE_OPTIONS } from "../context/AppContext";

// Login page.
export default class LoginPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    const result = this.context.login(this.state.email, this.state.password);

    if (!result.ok) {
      this.setState({ error: result.message });
      return;
    }

    this.setState({ error: "" });
  }

  render() {
    // Login, notice, and the loaded users come from the shared app state.
    const { notice, users } = this.context;
    const demoLogins = users.filter(
      (user) =>
        user.role === ROLE_OPTIONS.SUPER_ADMIN ||
        user.role === ROLE_OPTIONS.ADMIN ||
        user.role === ROLE_OPTIONS.EMPLOYEE
    );

    return (
      <main className="auth-page">
        <section className="auth-shell">
          {/* The card only contains the sign-in form now. */}
          <form className="auth-form" onSubmit={this.submit}>
            <div className="auth-form-head">
              <p className="eyebrow">Secure access</p>
              <h2>Sign in</h2>
              <p className="auth-text">Use your role email and password to continue.</p>
            </div>

            <label>
              <span>Email</span>
              <input
                type="email"
                value={this.state.email}
                onChange={(event) => this.setState({ email: event.target.value })}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
                placeholder="Password"
                required
              />
            </label>

            <button type="submit" className="primary-button">
              Login
            </button>

            {/* Demo cards show the current seed users from the frontend JSON. */}
            <div className="demo-area">
              <p className="eyebrow">Demo logins</p>
              <div className="demo-grid">
                {demoLogins.map((item) => (
                  <div className="demo-card" key={item.id}>
                    <strong>{item.role}</strong>
                    <span>{item.email}</span>
                    <span>{item.password}</span>
                  </div>
                ))}
              </div>
            </div>

            {this.state.error ? <p className="error-note">{this.state.error}</p> : null}
            {notice ? <p className="login-note">{notice}</p> : null}
          </form>
        </section>
      </main>
    );
  }
}
