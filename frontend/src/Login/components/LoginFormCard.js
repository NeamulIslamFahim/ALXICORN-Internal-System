import styles from "../styles/login.module.css";
import { AvatarIcon, EyeIcon, KeyIcon } from "./icons/LoginIcons";

export default function LoginFormCard({
  username,
  password,
  keepLoggedIn,
  notice,
  showPassword,
  onSubmit,
  onUsernameChange,
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
              <AvatarIcon />
            </span>
            <input
              className={styles.authInput}
              type="text"
              value={username}
              onChange={(event) => onUsernameChange(event.target.value)}
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

        {notice ? <p className={styles.loginNote}>{notice}</p> : null}
      </div>
    </form>
  );
}
