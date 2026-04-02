import React, { Component } from "react";
import ButtonRow from "../forms/ButtonRow";
import FormButton from "../forms/FormButton";

// This table lists all teams.
export default class TeamTable extends Component {
  getUserName(userId) {
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
                  <ButtonRow>
                    {/* Only users with team permissions can change the table. */}
                    <FormButton type="button" variant="action" onClick={() => onEdit(team)} disabled={!canManageTeams}>
                      Edit
                    </FormButton>
                    <FormButton
                      type="button"
                      variant="danger"
                      onClick={() => onDelete(team.id)}
                      disabled={!canManageTeams}
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
