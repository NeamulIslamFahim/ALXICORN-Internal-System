import React, { Component } from "react";

// This table lists all teams.
export default class TeamTable extends Component {
  getUserName(userId) {
    // Show the name of the team lead instead of a raw id.
    const user = this.props.users.find((item) => item.id === userId);
    return user ? user.full_name : "-";
  }

  render() {
    const { teams, onEdit, onDelete, canManageTeams } = this.props;

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
                {/* Each row shows one team. */}
                <td>{team.name}</td>
                <td>{this.getUserName(team.team_lead_id)}</td>
                <td>{team.members.length}</td>
                <td>
                  {/* Action buttons stay in one line for easier scanning. */}
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
}
