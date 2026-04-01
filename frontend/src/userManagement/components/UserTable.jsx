import React, { Component } from "react";

class StatusBadge extends Component {
  render() {
    // Turn the raw status text into a colored badge.
    return <span className={`status-badge status-${this.props.status.toLowerCase()}`}>{this.props.status}</span>;
  }
}

// This table lists all users in the system.
export default class UserTable extends Component {
  getTeamName(teamId) {
    // Show the team name instead of only the team id.
    const team = this.props.teams.find((item) => item.id === teamId);
    return team ? team.name : "-";
  }

  roleLabel(role) {
    // Replace the underscore so role text looks cleaner in the table.
    return role.replace("_", " ");
  }

  render() {
    const { users, onEdit, onToggleStatus, onDelete, canEdit, canDeactivate } = this.props;

    return (
      <div className="table-wrap">
        <table className="data-table">
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
                  <div className="button-row">
                    {/* Buttons are disabled when the current user has no permission. */}
                    <button
                      type="button"
                      className="action-button"
                      onClick={() => onToggleStatus(user.id)}
                      disabled={!canDeactivate}
                    >
                      {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </button>
                    <button type="button" className="action-button" onClick={() => onEdit(user)} disabled={!canEdit}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="action-button danger-button"
                      onClick={() => onDelete(user.id)}
                      disabled={!canEdit}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
