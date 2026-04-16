import React, { Component } from "react";
import { EditIcon, PowerIcon, TrashIcon } from "../icons/WorkspaceIcons";
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
      return "ALL ACCESS";
    }

    if (user.role === "ADMIN") {
      return "Team";
    }

    if (user.team_id) {
      return "Department";
    }

    return "Regional";
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

                <div className={styles.actionIcons}>
                  <button
                    type="button"
                    className={styles.rowAction}
                    aria-label={`${toggleLabel} ${user.full_name}`}
                    title={toggleLabel}
                    disabled={!canDeactivate}
                    onClick={() => {
                      if (canDeactivate) {
                        onToggleStatus(user.id);
                      }
                    }}
                  >
                    <PowerIcon size={16} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    className={styles.rowAction}
                    aria-label={`Delete ${user.full_name}`}
                    title="Delete"
                    disabled={!canEdit}
                    onClick={() => {
                      if (canEdit) {
                        onDelete(user.id);
                      }
                    }}
                  >
                    <TrashIcon size={16} strokeWidth={1.9} />
                  </button>
                  <button
                    type="button"
                    className={styles.rowAction}
                    aria-label={`Edit ${user.full_name}`}
                    title="Edit"
                    disabled={!canEdit}
                    onClick={() => {
                      if (canEdit) {
                        onEdit(user);
                      }
                    }}
                  >
                    <EditIcon size={16} strokeWidth={1.9} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
