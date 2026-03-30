// This table lists the teams and their members.
export default function TeamTable({ teams }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Lead</th>
            <th>Members</th>
            <th>Seniority mix</th>
            <th>Scope</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.name}>
              <td>{team.name}</td>
              <td>{team.lead}</td>
              <td>{team.members}</td>
              <td>{team.seniority}</td>
              <td>{team.scope}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
