function StatusBadge({ status }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}

function roleLabel(role) {
  return role.replace("_", " ");
}

// This table lists all users in the system.
export default function UserTable({
  users,
  teams,
  onEdit,
  onToggleStatus,
  onDelete,
  canEdit,
  canDeactivate,
}) {
  // Show the team name instead of only the team id.
  function getTeamName(teamId) {
    const team = teams.find((item) => item.id === teamId);
    return team ? team.name : "-";
  }

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
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{roleLabel(user.role)}</td>
              <td>
                <StatusBadge status={user.status} />
              </td>
              <td>{getTeamName(user.team_id)}</td>
              <td>{user.seniority_role}</td>
              <td>{user.permissions.length ? user.permissions.join(", ") : "-"}</td>
              <td>
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
