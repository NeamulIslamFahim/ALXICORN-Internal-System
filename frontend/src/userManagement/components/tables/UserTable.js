import React, { Component } from "react";
import { formatRoleLabel } from "../../utils/uiHelpers";
import styles from "./tables.module.css";

export default class UserTable extends Component {
  getInitials(name) {
    return String(name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  getStatusMeta(status) {
    const normalized = String(status || "").toUpperCase();

    if (normalized === "ACTIVE") {
      return { label: "Active", tone: styles.statusActive };
    }

    if (normalized === "INACTIVE") {
      return { label: "Inactive", tone: styles.statusPending };
    }

    return { label: "Suspended", tone: styles.statusSuspended };
  }

  getAccessLevel(user) {
    if (user.role === "SUPER ADMIN") {
      return "Level 5 - System";
    }

    if (user.role === "ADMIN") {
      return "Level 4 - Global";
    }

    if (user.team_id) {
      return "Level 2 - Department";
    }

    return "Level 3 - Regional";
  }

  render() {
    const { users, onEdit, onToggleStatus, onDelete, canEdit, canDeactivate } = this.props;

    return (
      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <span>Name & Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Access Level</span>
          <span>Actions</span>
        </div>

        <div className={styles.tableBody}>
          {users.length === 0 ? <div className={styles.emptyState}>No users found for the selected filters.</div> : null}

          {users.map((user) => {
            const statusMeta = this.getStatusMeta(user.status);
            const toggleLabel = user.status === "ACTIVE" ? "Deactivate" : "Activate";

            return (
              <div key={user.id} className={styles.userRow}>
                <div className={styles.nameCell}>
                  <span className={styles.avatar}>{this.getInitials(user.full_name)}</span>
                  <div className={styles.nameMeta}>
                    <strong className={styles.userName}>{user.full_name}</strong>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                </div>

                <span className={styles.roleText}>{formatRoleLabel(user.role)}</span>
                <span className={[styles.statusBadge, statusMeta.tone].join(" ")}>{statusMeta.label}</span>
                <span className={styles.accessPill}>{this.getAccessLevel(user)}</span>

                <div className={styles.actionMenuShell}>
                  <div
                    className={styles.rowAction}
                    role="button"
                    tabIndex={0}
                    aria-label={`Manage ${user.full_name}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                      }
                    }}
                  >
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className={styles.actionMenu}>
                    <div
                      className={styles.menuItem}
                      role="button"
                      tabIndex={canDeactivate ? 0 : -1}
                      aria-disabled={canDeactivate ? "false" : "true"}
                      onClick={() => {
                        if (canDeactivate) {
                          onToggleStatus(user.id);
                        }
                      }}
                    >
                      {toggleLabel}
                    </div>
                    <div
                      className={styles.menuItem}
                      role="button"
                      tabIndex={canEdit ? 0 : -1}
                      aria-disabled={canEdit ? "false" : "true"}
                      onClick={() => {
                        if (canEdit) {
                          onEdit(user);
                        }
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className={[styles.menuItem, styles.menuItemDanger].join(" ")}
                      role="button"
                      tabIndex={canEdit ? 0 : -1}
                      aria-disabled={canEdit ? "false" : "true"}
                      onClick={() => {
                        if (canEdit) {
                          onDelete(user.id);
                        }
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
