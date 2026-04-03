import React, { Component } from "react";
import { PERMISSION_OPTIONS } from "../../context/AppContext";
import { toggleArrayItem } from "../../utils/uiHelpers";
import styles from "./forms.module.css";

// This shows permission checkboxes for Admin users.
export default class PermissionSelector extends Component {
  togglePermission(permission) {
    if (this.props.disabled) {
      return;
    }

    const nextValue = toggleArrayItem(this.props.value, permission);
    this.props.onChange(nextValue);
  }

  render() {
    return (
      <div className={styles.permissionBox}>
        {PERMISSION_OPTIONS.map((permission) => (
          // Each row is a checkbox and a label for one permission.
          <label key={permission} className={styles.permissionItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={this.props.value.includes(permission)}
              onChange={() => this.togglePermission(permission)}
              disabled={this.props.disabled}
            />
            <span className={styles.permissionText}>{permission}</span>
          </label>
        ))}
      </div>
    );
  }
}
