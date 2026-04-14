import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/layout/PageHeader";
import TeamTable from "../components/tables/TeamTable";
import TeamForm from "../components/forms/TeamForm";
import FormButton from "../components/forms/FormButton";
import pageStyles from "./pages.module.css";
import layoutStyles from "../components/layout/layout.module.css";

// Teams page coordinates the team list and the create/edit modal.
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
      <section className={pageStyles.pageCard}>
        <PageHeader
          eyebrow="Team structure"
          title="Teams"
          note="Keep group ownership and staffing organized in a more polished, section-led layout."
          badge={`${teams.length} teams`}
          action={
            <div className={layoutStyles.headerActions}>
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

        <div className={pageStyles.metricGrid}>
          <div className={pageStyles.metricCard}>
            <span className={pageStyles.metricLabel}>Teams</span>
            <strong className={pageStyles.metricValue}>{teams.length}</strong>
          </div>
          <div className={pageStyles.metricCard}>
            <span className={pageStyles.metricLabel}>Members</span>
            <strong className={pageStyles.metricValue}>{users.length}</strong>
          </div>
          <div className={pageStyles.metricCard}>
            <span className={pageStyles.metricLabel}>Access</span>
            <strong className={pageStyles.metricValue}>{permissions.canManageTeams ? "Open" : "Limited"}</strong>
          </div>
        </div>

        <div className={pageStyles.hintBox}>Teams are available for permitted roles.</div>

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
