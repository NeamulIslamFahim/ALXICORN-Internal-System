import React, { Component } from "react";
import { AppContext } from "../../UserManagement/context/AppContext";
import alxicornLogo from "../assets/images/ALXICORN Logo.png";
import pageStyles from "../styles/login.module.css";
import { LoginBrandPanel, LoginFormCard } from "../components";

export default class LoginPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      keepLoggedIn: false,
      showPassword: false,
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
    const { notice } = this.context;
    const { email, error, keepLoggedIn, password, showPassword } = this.state;

    return (
      <main className={pageStyles.authPage}>
        <section className={pageStyles.authShell}>
          <LoginBrandPanel logo={alxicornLogo} />
          <LoginFormCard
            email={email}
            password={password}
            error={error}
            keepLoggedIn={keepLoggedIn}
            notice={notice}
            showPassword={showPassword}
            onSubmit={this.submit}
            onEmailChange={(nextEmail) => this.setState({ email: nextEmail })}
            onPasswordChange={(nextPassword) => this.setState({ password: nextPassword })}
            onKeepLoggedInChange={(nextValue) => this.setState({ keepLoggedIn: nextValue })}
            onTogglePassword={() => this.setState((state) => ({ showPassword: !state.showPassword }))}
          />
        </section>
      </main>
    );
  }
}
