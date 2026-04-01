import React, { Component } from "react";
import { PERMISSION_OPTIONS } from "../context/AppContext";

// This shows permission checkboxes for Admin users.
export default class PermissionSelector extends Component {
  togglePermission(permission) {
    if (this.props.disabled) {
      return;
    }

    const nextValue = this.props.value.includes(permission)
      ? this.props.value.filter((item) => item !== permission)
      : [...this.props.value, permission];

    this.props.onChange(nextValue);
  }

  render() {
    return (
      <div className="permission-box">
        {PERMISSION_OPTIONS.map((permission) => (
          // Each row is a checkbox and a label for one permission.
          <label key={permission} className="permission-item">
            <input
              type="checkbox"
              checked={this.props.value.includes(permission)}
              onChange={() => this.togglePermission(permission)}
              disabled={this.props.disabled}
            />
            <span>{permission}</span>
          </label>
        ))}
      </div>
    );
  }
}
