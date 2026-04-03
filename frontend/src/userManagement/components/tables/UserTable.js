import React, { Component } from "react";
import StatusBadge from "./StatusBadge";
import ButtonRow from "../forms/ButtonRow";
import FormButton from "../forms/FormButton";
import { formatRoleLabel, getLabelById } from "../../utils/uiHelpers";
import styles from "./tables.module.css";

// This table lists all users in the system.
export default class UserTable extends Component {
  getTeamName(teamId) {
    return getLabelById(this.props.teams, teamId);
  }

  roleLabel(role) {
    return formatRoleLabel(role);
  }

  render() {
    const { users, onEdit, onToggleStatus, onDelete, canEdit, canDeactivate } = this.props;

    return (
      <div className={styles.tableWrap}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Team</th>
              <th>Seniority</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {/* Each row shows one user record. */}
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{this.roleLabel(user.role)}</td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td>{this.getTeamName(user.team_id)}</td>
                <td>{user.seniority_role}</td>
                <td>{user.permissions.length ? user.permissions.join(", ") : "-"}</td>
                <td>
                  {/* Action buttons stay together in one row. */}
                  <ButtonRow>
                    {/* Buttons are disabled when the current user has no permission. */}
                    <FormButton
                      type="button"
                      variant="action"
                      onClick={() => onToggleStatus(user.id)}
                      disabled={!canDeactivate}
                    >
                      {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </FormButton>
                    <FormButton type="button" variant="action" onClick={() => onEdit(user)} disabled={!canEdit}>
                      Edit
                    </FormButton>
                    <FormButton
                      type="button"
                      variant="danger"
                      onClick={() => onDelete(user.id)}
                      disabled={!canEdit}
                    >
                      Delete
                    </FormButton>
                  </ButtonRow>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
