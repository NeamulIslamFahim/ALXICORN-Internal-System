import React, { Component } from "react";
import styles from "./forms.module.css";

export default class ButtonRow extends Component {
  render() {
    const className = [styles.buttonRow, styles.compactActions, this.props.className].filter(Boolean).join(" ");
    return <div className={className}>{this.props.children}</div>;
  }
}
