import React from "react";
import styles from "./overview.module.css";

export default function ChartCard({ title, subtitle, children }) {
  return (
    <article className={styles.chartCard}>
      <div className={styles.chartCardHead}>
        <div>
          <p className={styles.chartEyebrow}>{title}</p>
          <h3 className={styles.chartTitle}>{subtitle}</h3>
        </div>
      </div>
      {children}
    </article>
  );
}
