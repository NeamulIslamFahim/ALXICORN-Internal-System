import React, { Component } from "react";
import styles from "./tables.module.css";

export default class StatusBadge extends Component {
  render() {
    const status = String(this.props.status || "").toUpperCase();
    const toneClass =
      status === "ACTIVE"
        ? styles.statusActive
        : status === "INACTIVE"
        ? styles.statusInactive
        : styles.statusTerminated;

    return <span className={[styles.statusBadge, toneClass].join(" ")}>{status}</span>;
  }
}
