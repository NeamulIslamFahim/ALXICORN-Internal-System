import React, { Component } from "react";

// Simple reusable page header.
export default class PageHeader extends Component {
  render() {
    // This keeps every page title in the same layout.
    return (
      <div className="page-head">
        <div>
          <p className="eyebrow">{this.props.eyebrow || "User system"}</p>
          <h2>{this.props.title}</h2>
          {this.props.note ? <p className="page-note">{this.props.note}</p> : null}
        </div>
        {this.props.action}
      </div>
    );
  }
}
