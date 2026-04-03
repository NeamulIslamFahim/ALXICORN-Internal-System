import React, { Component } from "react";
import styles from "./layout.module.css";

export default class InfoCard extends Component {
  render() {
    const className = [styles.infoCard, this.props.className].filter(Boolean).join(" ");

    return (
      <div className={className}>
        {this.props.label ? <span className={styles.infoCardLabel}>{this.props.label}</span> : null}
        <strong className={styles.infoCardValue}>{this.props.value}</strong>
      </div>
    );
  }
}
