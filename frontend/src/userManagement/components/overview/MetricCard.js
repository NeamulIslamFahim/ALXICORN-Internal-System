import React from "react";
import styles from "./overview.module.css";

const toneClassMap = {
  green: styles.metricToneGreen,
  blue: styles.metricToneBlue,
  purple: styles.metricTonePurple,
  orange: styles.metricToneOrange,
};

export default function MetricCard({ label, value, delta, tone, deltaTone, icon }) {
  return (
    <article className={styles.metricCard}>
      <div className={styles.metricHead}>
        <p className={styles.metricLabel}>{label}</p>
        <span className={[styles.metricIcon, toneClassMap[tone] || styles.metricToneBlue].join(" ")}>{icon}</span>
      </div>
      <strong className={styles.metricValue}>{value}</strong>
      <p className={[styles.metricDelta, deltaTone === "negative" ? styles.metricDeltaNegative : null].filter(Boolean).join(" ")}>
        {delta}
      </p>
    </article>
  );
}
