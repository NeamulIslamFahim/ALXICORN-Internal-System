import React from "react";
import styles from "./overview.module.css";

const SERIES = [
  { key: "hours", label: "Hours", className: styles.barHours },
  { key: "tasks", label: "Tasks", className: styles.barTasks },
  { key: "projects", label: "Projects", className: styles.barProjects },
];

export default function GroupedBarChart({ data = [] }) {
  const maxValue = Math.max(
    ...data.flatMap((item) => SERIES.map((series) => item[series.key] || 0)),
    1
  );
  const axisLabels = ["0%", "2%", "4%", "6%", "8%", "10%"];

  return (
    <div className={styles.chartBody}>
      <div className={styles.legendRow}>
        {SERIES.map((series) => (
          <span key={series.key} className={styles.legendItem}>
            <span className={[styles.legendSwatch, series.className].join(" ")} />
            {series.label}
          </span>
        ))}
      </div>

      <div className={styles.barChartShell}>
        <div className={styles.barAxis}>
          {axisLabels.slice().reverse().map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className={styles.barChart}>
          {data.map((item) => (
            <div key={item.month} className={styles.barGroup}>
              <div className={styles.barColumns}>
                {SERIES.map((series) => (
                  <span
                    key={series.key}
                    className={[styles.barColumn, series.className].join(" ")}
                    style={{ height: `${Math.max(((item[series.key] || 0) / maxValue) * 100, 8)}%` }}
                    title={`${series.label}: ${item[series.key] || 0}`}
                  />
                ))}
              </div>
              <span className={styles.barLabel}>{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
