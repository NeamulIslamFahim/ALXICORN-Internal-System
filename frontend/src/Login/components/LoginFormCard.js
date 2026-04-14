import styles from "../styles/login.module.css";
import { EyeIcon, KeyIcon, MailIcon } from "./icons/LoginIcons";

export default function LoginFormCard({
  email,
  password,
  error,
  keepLoggedIn,
  notice,
  showPassword,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  onKeepLoggedInChange,
  onTogglePassword,
}) {
  return (
    <form className={styles.authForm} onSubmit={onSubmit}>
      <div className={styles.authTextContainer}>
        <h1 className={styles.authHeading}>Welcome</h1>
        <p className={styles.authSubtext}>Enter your details to access the system</p>
      </div>

      <div className={styles.credentialsBox}>
        <label className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Username</span>
          <span className={styles.inputShell}>
            <span className={styles.inputIcon}>
              <MailIcon />
            </span>
            <input
              className={styles.authInput}
              type="text"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="Username"
              required
              autoComplete="username"
            />
          </span>
        </label>

        <label className={styles.fieldGroup}>
          <span className={styles.passwordRow}>
            <span className={styles.fieldLabel}>Password</span>
            <a href="#" className={styles.resetLink}>
              Reset Password?
            </a>
          </span>
          <span className={styles.inputShell}>
            <span className={styles.inputIcon}>
              <KeyIcon />
            </span>
            <input
              className={styles.authInput}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={onTogglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon visible={showPassword} />
            </button>
          </span>
        </label>

        <label className={styles.rememberRow}>
          <input
            type="checkbox"
            className={styles.rememberCheck}
            checked={keepLoggedIn}
            onChange={(event) => onKeepLoggedInChange(event.target.checked)}
          />
          <span className={styles.authSubtext}>Keep me logged in for 30 days</span>
        </label>

        <button type="submit" className={styles.signInButton}>
          Sign In
        </button>

        {error ? <p className={styles.errorNote}>{error}</p> : null}
        {notice ? <p className={styles.loginNote}>{notice}</p> : null}
      </div>
    </form>
  );
}
