// This table lists all teams.
export default function TeamTable({ teams, users, onEdit, onDelete, canManageTeams }) {
  // Show the name of the team lead instead of a raw id.
  function getUserName(userId) {
    const user = users.find((item) => item.id === userId);
    return user ? user.full_name : "-";
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Team name</th>
            <th>Team lead</th>
            <th>Members</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{getUserName(team.team_lead_id)}</td>
              <td>{team.members.length}</td>
              <td>
                <div className="button-row">
                  {/* Only users with team permissions can change the table. */}
                  <button type="button" className="action-button" onClick={() => onEdit(team)} disabled={!canManageTeams}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="action-button danger-button"
                    onClick={() => onDelete(team.id)}
                    disabled={!canManageTeams}
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
