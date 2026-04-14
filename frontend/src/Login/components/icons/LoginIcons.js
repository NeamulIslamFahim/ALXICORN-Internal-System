import styles from "../../styles/login.module.css";

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inputIconSvg}>
      <path d="M5.3 7.2h13.4c.66 0 1.2.54 1.2 1.2v7.2c0 .66-.54 1.2-1.2 1.2H5.3c-.66 0-1.2-.54-1.2-1.2V8.4c0-.66.54-1.2 1.2-1.2Z" fill="currentColor" opacity="0.1" />
      <path d="M4.8 8.1 12 13l7.2-4.9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4.3" y="7.1" width="15.4" height="9.8" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.45" />
    </svg>
  );
}

export function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inputIconSvg}>
      <circle cx="8.4" cy="12.1" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11.1 12.1h7.3m-2 0v1.9m-3.1-1.9v1.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EyeIcon({ visible }) {
  return visible ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inputIconSvg}>
      <path d="M3.6 12.1s2.7-4.8 8.4-4.8 8.4 4.8 8.4 4.8-2.7 4.8-8.4 4.8-8.4-4.8-8.4-4.8Z" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12.1" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.45" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inputIconSvg}>
      <path d="M3.6 12.1s2.7-4.8 8.4-4.8 8.4 4.8 8.4 4.8-2.7 4.8-8.4 4.8-8.4-4.8-8.4-4.8Z" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12.1" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.45" />
      <path d="M5.2 4.9 18.8 18.5" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  );
}
