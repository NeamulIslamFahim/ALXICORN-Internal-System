import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import TeamTable from "../components/TeamTable";
import TeamForm from "../components/TeamForm";

// Teams page.
export default function TeamsPage() {
  const { teams, users, modal, permissions, openTeamModal, closeTeamModal, saveTeam, deleteTeam } = useApp();

  return (
    <section className="page-card">
      <PageHeader
        title="Teams"
        note="Create teams and assign members."
        action={
          <button
            type="button"
            className="primary-button"
            onClick={() => openTeamModal("create")}
            disabled={!permissions.canManageTeams}
          >
            Create Team
          </button>
        }
      />

      <div className="hint-box">Teams are available for permitted roles.</div>

      <TeamTable
        teams={teams}
        users={users}
        onEdit={(team) => openTeamModal("edit", team)}
        onDelete={deleteTeam}
        canManageTeams={permissions.canManageTeams}
      />

      <TeamForm
        open={modal?.type === "team"}
        mode={modal?.mode}
        team={modal?.data}
        users={users}
        onClose={closeTeamModal}
        onSubmit={saveTeam}
      />
    </section>
  );
}
