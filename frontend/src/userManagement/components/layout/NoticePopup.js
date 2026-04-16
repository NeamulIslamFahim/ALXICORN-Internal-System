import React, { useEffect } from "react";
import styles from "../../AppShell.module.css";

export default function NoticePopup({ notice, onClose }) {
  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      onClose?.();
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [notice, onClose]);

  if (!notice) {
    return null;
  }

  const toneClass =
    notice.tone === "success"
      ? styles.noticePopupSuccess
      : notice.tone === "warning"
        ? styles.noticePopupWarning
        : styles.noticePopupInfo;

  return (
    <div className={styles.noticePopupShell} role="status" aria-live="polite">
      <div
        className={[styles.noticePopupCard, toneClass].join(" ")}
        aria-labelledby="workspace-notice-title"
        aria-describedby="workspace-notice-message"
      >
        <div className={styles.noticePopupContent}>
          <h3 id="workspace-notice-title" className={styles.noticePopupTitle}>
            {notice.title || "Notice"}
          </h3>
          <p id="workspace-notice-message" className={styles.noticePopupMessage}>
            {notice.message || notice.title}
          </p>
        </div>
        <div className={styles.noticePopupActions}>
          <button type="button" className={styles.noticePopupButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
