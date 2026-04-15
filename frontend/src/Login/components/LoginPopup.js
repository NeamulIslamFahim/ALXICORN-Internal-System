import styles from "../styles/login.module.css";
import { AlertIcon } from "./icons/LoginIcons";

export default function LoginPopup({ message, onClose, title = "Login Error" }) {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.popupBackdrop} onClick={onClose} role="presentation">
      <div
        className={styles.popupCard}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="login-popup-title"
        aria-describedby="login-popup-message"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.popupIconWrap}>
          <AlertIcon />
        </div>
        <div className={styles.popupContent}>
          <h3 id="login-popup-title" className={styles.popupTitle}>
            {title}
          </h3>
          <p id="login-popup-message" className={styles.popupMessage}>
            {message}
          </p>
        </div>
        <div className={styles.popupActions}>
          <button type="button" className={styles.popupButton} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
