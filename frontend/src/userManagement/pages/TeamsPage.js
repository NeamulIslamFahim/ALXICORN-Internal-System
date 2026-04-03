import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/layout/PageHeader";
import TeamTable from "../components/tables/TeamTable";
import TeamForm from "../components/forms/TeamForm";
import FormButton from "../components/forms/FormButton";

// Teams page.
export default class TeamsPage extends Component {
  static contextType = AppContext;

  render() {
    const {
      teams,
      users,
      modal,
      permissions,
      openTeamModal,
      closeTeamModal,
      saveTeam,
      deleteTeam,
    } = this.context;

    return (
      <section className="page-card">
        <PageHeader
          title="Teams"
          note="Create teams and assign members."
          action={
            <div className="header-actions">
              <FormButton
                type="button"
                variant="primary"
                onClick={() => openTeamModal("create")}
                disabled={!permissions.canManageTeams}
              >
                Create Team
              </FormButton>
            </div>
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
}
