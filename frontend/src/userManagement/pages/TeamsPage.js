import React from "react";
import { AppContext, PAGE_OPTIONS } from "../context/AppContext";
import TeamTable from "../components/tables/TeamTable";
import TeamForm from "../components/forms/TeamForm";
import { ArrowUpDownIcon, DownloadIcon, PlusIcon } from "../components/icons/WorkspaceIcons";
import ManagementTabs from "../components/layout/ManagementTabs";
import { downloadRowsAsCsv } from "../utils/exportHelpers";
import ManagementPage from "./ManagementPage";
import pageStyles from "./pages.module.css";

export default class TeamsPage extends ManagementPage {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      sortDirection: "asc",
    };
  }

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
      setNotice,
    } = this.context;

    const usersById = new Map(users.map((user) => [user.id, user]));
    const sortedTeams = [...teams].sort((left, right) => {
      const leftName = String(left.name || "").toLowerCase();
      const rightName = String(right.name || "").toLowerCase();
      return this.state.sortDirection === "asc" ? leftName.localeCompare(rightName) : rightName.localeCompare(leftName);
    });

    const rowsPerPage = 4;
    const totalPages = Math.max(1, Math.ceil(sortedTeams.length / rowsPerPage));
    const currentPage = Math.min(this.state.currentPage, totalPages);
    const pageStart = (currentPage - 1) * rowsPerPage;
    const paginatedTeams = sortedTeams.slice(pageStart, pageStart + rowsPerPage);

    const totalMembers = teams.reduce((sum, team) => sum + team.members.length, 0);

    const exportRows = sortedTeams.map((team) => ({
      Name: team.name,
      Lead: usersById.get(team.team_lead_id)?.full_name || "-",
      Members: team.members.length,
    }));

    return (
      <section className={pageStyles.pageCard}>
        <div className={pageStyles.hero}>
          <div className={pageStyles.heroCopy}>
            <h1 className={pageStyles.pageTitle}>Team Management</h1>
            <p className={pageStyles.pageNote}>Build, assign, and maintain team structures across the workspace.</p>
          </div>

          <button
            type="button"
            className={pageStyles.primaryAction}
            onClick={() => openTeamModal("create")}
            disabled={!permissions.canManageTeams}
          >
            <PlusIcon className={pageStyles.primaryActionIcon} size={18} strokeWidth={2.1} />
            <span>Add Team</span>
          </button>
        </div>

        <section className={pageStyles.managementShell}>
          <ManagementTabs activePage={PAGE_OPTIONS.TEAMS} onNavigate={(page) => this.navigateToPage(page)} />

          <div className={pageStyles.summaryGrid}>
            {[
              { label: "Total Teams", value: teams.length },
              { label: "Total Team Members (Assigned)", value: totalMembers },
            ].map((card) => (
              <article key={card.label} className={pageStyles.summaryMetric}>
                <p className={pageStyles.summaryLabel}>{card.label}</p>
                <strong className={pageStyles.summaryValue}>{card.value}</strong>
              </article>
            ))}
          </div>

          <div className={pageStyles.toolbarRow}>
            <p className={pageStyles.pageNote}>Organize team leads, member counts, and structure visibility in one place.</p>

            <div className={pageStyles.toolbarIcons}>
              <button
                type="button"
                className={pageStyles.iconAction}
                aria-label="Toggle sort order"
                onClick={() =>
                  this.setState((state) => ({
                    sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
                  }))
                }
              >
                <ArrowUpDownIcon
                  className={[pageStyles.toolbarIconSvg, this.state.sortDirection === "desc" ? pageStyles.filterGlyphDesc : null].filter(Boolean).join(" ")}
                />
              </button>
              <button
                type="button"
                className={pageStyles.iconAction}
                aria-label="Download"
                onClick={() => {
                  downloadRowsAsCsv("team-management.csv", exportRows, { Name: "", Lead: "", Members: "" });
                  setNotice?.({
                    title: "Added",
                    message: "Team data downloaded as CSV for Excel.",
                    tone: "success",
                  });
                }}
              >
                <DownloadIcon className={pageStyles.toolbarIconSvg} />
              </button>
            </div>
          </div>

          <div className={pageStyles.tableShell}>
            <TeamTable
              teams={paginatedTeams}
              users={users}
              onEdit={(team) => openTeamModal("edit", team)}
              onDelete={deleteTeam}
              canManageTeams={permissions.canManageTeams}
            />

            <div className={pageStyles.toolbarRow}>
              <p className={pageStyles.pageNote}>
                Showing {sortedTeams.length ? pageStart + 1 : 0}-{Math.min(pageStart + rowsPerPage, sortedTeams.length)} of {sortedTeams.length} teams
              </p>

              <div className={pageStyles.filters}>
                <button
                  type="button"
                  className={pageStyles.iconAction}
                  onClick={() => this.setState({ currentPage: Math.max(1, currentPage - 1) })}
                  aria-label="Previous"
                >
                  &lsaquo;
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 4).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={[pageStyles.paginationPill, currentPage === page ? pageStyles.paginationPillActive : null].filter(Boolean).join(" ")}
                    onClick={() => this.setState({ currentPage: page })}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={pageStyles.iconAction}
                  onClick={() => this.setState({ currentPage: Math.min(totalPages, currentPage + 1) })}
                  aria-label="Next"
                >
                  &rsaquo;
                </button>
              </div>
            </div>
          </div>
        </section>

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
