import React, { Component } from "react";
import { AppContext } from "../../userManagement/context/AppContext";
import alxicornLogo from "../../assets/images/ALXICORN Logo.png";
import pageStyles from "../styles/login.module.css";
import { LoginBrandPanel, LoginFormCard, LoginPopup } from "../components";

export default class LoginPage extends Component {
  static contextType = AppContext;

  //
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      keepLoggedIn: false,
      showPassword: false,
    };
    this.submit = this.submit.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  submit(event) {
    event.preventDefault();
    const result = this.context.login(this.state.username, this.state.password);
    if (!result.ok) {
      this.setState({ error: result.message });
      return;
    }
    this.setState({ error: "" });
    if (this.context.navigateToHome) {
      this.context.navigateToHome(result.user);
    }
  }

  closePopup() {
    this.setState({ error: "" });
  }

  render() {
    const { notice } = this.context;
    const { username, error, keepLoggedIn, password, showPassword } = this.state;

    return (
      <main className={pageStyles.authPage}>
        <section className={pageStyles.authShell}>
          <LoginBrandPanel logo={alxicornLogo} />
          <LoginPopup message={error} onClose={this.closePopup} />
          <LoginFormCard
            username={username}
            password={password}
            keepLoggedIn={keepLoggedIn}
            notice={notice}
            showPassword={showPassword}
            onSubmit={this.submit}
            onUsernameChange={(nextUsername) => this.setState({ username: nextUsername })}
            onPasswordChange={(nextPassword) => this.setState({ password: nextPassword })}
            onKeepLoggedInChange={(nextValue) => this.setState({ keepLoggedIn: nextValue })}
            onTogglePassword={() => this.setState((state) => ({ showPassword: !state.showPassword }))}
          />
        </section>
      </main>
    );
  }
}
