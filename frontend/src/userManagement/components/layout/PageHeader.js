import React, { Component } from "react";
import styles from "./layout.module.css";

// Simple reusable page header.
export default class PageHeader extends Component {
  render() {
    // This keeps every page title in the same layout.
    return (
      <div className={styles.pageHead}>
        <div>
          <p className={styles.eyebrow}>{this.props.eyebrow || "User system"}</p>
          <h2 className={styles.pageTitle}>{this.props.title}</h2>
          {this.props.note ? <p className={styles.pageNote}>{this.props.note}</p> : null}
        </div>
        {this.props.action}
      </div>
    );
  }
}
