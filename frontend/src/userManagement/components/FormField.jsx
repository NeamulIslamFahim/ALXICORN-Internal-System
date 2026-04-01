import React, { Component } from "react";

// Reusable field wrapper for forms.
export default class FormField extends Component {
  render() {
    // Keep label and input grouped together in one place.
    return (
      <label className="form-field">
        <span>{this.props.label}</span>
        {this.props.children}
      </label>
    );
  }
}
