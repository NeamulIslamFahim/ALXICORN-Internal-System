import React from "react";
import styles from "./overview.module.css";

export default function DonutChart({ data = [], centerValue, centerLabel }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  let offsetCursor = 0;

  return (
    <div className={styles.donutShell}>
      <div className={styles.donutWrap}>
        <svg viewBox="0 0 120 120" className={styles.donutSvg} aria-hidden="true">
          <circle cx="60" cy="60" r={radius} className={styles.donutTrack} />
          {data.map((item) => {
            const arc = (item.value / total) * circumference;
            const segment = (
              <circle
                key={item.label}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${arc} ${circumference - arc}`}
                strokeDashoffset={-offsetCursor}
                transform="rotate(-90 60 60)"
              />
            );
            offsetCursor += arc;
            return segment;
          })}
        </svg>

        <div className={styles.donutCenter}>
          <strong>{centerValue}</strong>
          <span>{centerLabel}</span>
        </div>
      </div>

      <div className={styles.donutLegend}>
        {data.map((item) => (
          <div key={item.label} className={styles.donutLegendItem}>
            <span className={styles.donutLegendLabel}>
              <span className={styles.legendSwatch} style={{ background: item.color }} />
              {item.label}
            </span>
            <strong>{String(item.value).padStart(2, "0")}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
