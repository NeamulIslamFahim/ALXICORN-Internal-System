import React, { Component } from "react";
import styles from "./forms.module.css";

// Reusable field wrapper for forms.
export default class FormField extends Component {
  render() {
    // Keep label and input grouped together in one place.
    const className = [styles.formField, styles.fieldCard, this.props.className].filter(Boolean).join(" ");
    return (
      <label className={className}>
        <span className={styles.fieldLabel}>{this.props.label}</span>
        {this.props.children}
      </label>
    );
  }
}
