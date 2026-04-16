import React from "react";
import styles from "./overview.module.css";

const toneClassMap = {
  green: styles.progressGreen,
  orange: styles.progressOrange,
};

export default function ProgressChart({
  utilizationValue,
  currentWeekHours,
  weeklyCapacity,
  weeklyEfficiencyGain,
  hourBreakdown = [],
  hourStatus = [],
}) {
  const weekPercent = Math.max(Math.min((currentWeekHours / Math.max(weeklyCapacity, 1)) * 100, 100), 0);
  const filledMain = Math.max(weekPercent - 8, 18);
  const amberTail = Math.min(100 - filledMain, 22);

  return (
    <div className={styles.progressCardBody}>
      <div className={styles.progressHeadline}>
        <div>
          <strong className={styles.progressBigValue}>{utilizationValue}%</strong>
          <span className={styles.progressSubLabel}>Efficiency</span>
        </div>
        <div className={styles.progressGrowth}>+{weeklyEfficiencyGain}.5%</div>
      </div>

      <div className={styles.progressScale}>
        <div className={styles.progressScaleMeta}>
          <span>Current Week</span>
          <span>{currentWeekHours}h</span>
        </div>
        <div className={styles.progressTrack}>
          <span className={styles.progressBlueFill} style={{ width: `${filledMain}%` }} />
          <span className={styles.progressAmberFill} style={{ width: `${amberTail}%` }} />
        </div>
        <div className={styles.progressAxis}>
          <span>0h</span>
          <span>10h</span>
          <span>20h</span>
          <span>30h</span>
          <span>{weeklyCapacity}h</span>
        </div>
      </div>

      <div className={styles.progressStack}>
        {hourBreakdown.map((item) => (
          <div key={item.label} className={styles.progressRow}>
            <div className={styles.progressMeta}>
              <span>{item.label}</span>
              <strong>{item.value}h ({Math.round((item.value / Math.max(currentWeekHours, 1)) * 100)}%)</strong>
            </div>
            <div className={styles.progressTrackMini}>
              <span
                className={[styles.progressFill, toneClassMap[item.tone] || styles.progressGreen].join(" ")}
                style={{ width: `${Math.round((item.value / Math.max(currentWeekHours, 1)) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progressFooterStats}>
        {hourStatus.map((item) => (
          <div key={item.label} className={styles.progressStatPill}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
