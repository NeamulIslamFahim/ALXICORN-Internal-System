import React, { Component } from "react";

export default class StatusBadge extends Component {
  render() {
    const status = String(this.props.status || "").toUpperCase();
    return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
  }
}
