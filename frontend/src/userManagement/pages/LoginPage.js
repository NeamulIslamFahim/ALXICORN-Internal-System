import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import FormInput from "../components/forms/FormInput";
import FormButton from "../components/forms/FormButton";

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

    if (this.context.navigateToHome) {
      this.context.navigateToHome(result.user);
    }
  }

  render() {
    // Login, notice, and the loaded users come from the shared app state.
    const { notice } = this.context;
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

            <FormInput
              label="Email"
              type="email"
              value={this.state.email}
              onChange={(value) => this.setState({ email: value })}
              placeholder="you@example.com"
              required
            />

            <FormInput
              label="Password"
              type="password"
              value={this.state.password}
              onChange={(value) => this.setState({ password: value })}
              placeholder="Password"
              required
            />

            <FormButton type="submit" variant="primary">
              Login
            </FormButton>

            {this.state.error ? <p className="error-note">{this.state.error}</p> : null}
            {notice ? <p className="login-note">{notice}</p> : null}
          </form>
        </section>
      </main>
    );
  }
}
