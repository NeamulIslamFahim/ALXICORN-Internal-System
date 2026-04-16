import React, { Component } from "react";
import { AppContext, PAGE_OPTIONS, ROLE_OPTIONS } from "../context/AppContext";
import UserTable from "../components/tables/UserTable";
import UserForm from "../components/forms/UserForm";
import { ArrowUpDownIcon, DownloadIcon, PlusIcon } from "../components/icons/WorkspaceIcons";
import { filterUsers } from "../utils/uiHelpers";
import pageStyles from "./pages.module.css";

export default class UsersPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      roleFilter: "ALL",
      statusFilter: "ALL",
      currentPage: 1,
      sortDirection: "asc",
    };
  }

  downloadUsers(rows) {
    const headers = Object.keys(rows[0] || { Name: "", Email: "", Role: "", Status: "", Access: "" });
    const csv = [
      headers.join(","),
      ...rows.map((row) => headers.map((header) => `"${String(row[header] || "").replace(/"/g, "\"\"")}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user-management.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  render() {
    const {
      users,
      teams,
      modal,
      permissions,
      setPage,
      navigateToPage,
      openUserModal,
      closeUserModal,
      setNotice,
      saveUser,
      deleteUser,
      toggleUserStatus,
    } = this.context;

    const filteredUsers = filterUsers(users, "", this.state.roleFilter, this.state.statusFilter).sort((left, right) => {
      const leftIsSuperAdmin = left.role === ROLE_OPTIONS.SUPER_ADMIN;
      const rightIsSuperAdmin = right.role === ROLE_OPTIONS.SUPER_ADMIN;

      if (leftIsSuperAdmin !== rightIsSuperAdmin) {
        return leftIsSuperAdmin ? -1 : 1;
      }

      const leftName = String(left.full_name || "").toLowerCase();
      const rightName = String(right.full_name || "").toLowerCase();
      return this.state.sortDirection === "asc" ? leftName.localeCompare(rightName) : rightName.localeCompare(leftName);
    });

    const activeUsers = users.filter((user) => user.status === "ACTIVE").length;
    const deactiveUsers = users.filter((user) => user.status !== "ACTIVE").length;
    const workingToday = activeUsers;
    const onLeaveToday = deactiveUsers;
    const rowsPerPage = 4;
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
    const currentPage = Math.min(this.state.currentPage, totalPages);
    const pageStart = (currentPage - 1) * rowsPerPage;
    const paginatedUsers = filteredUsers.slice(pageStart, pageStart + rowsPerPage);

    const goToTeams = () => {
      setPage(PAGE_OPTIONS.TEAMS);
      if (navigateToPage) {
        navigateToPage(PAGE_OPTIONS.TEAMS);
      }
    };

    const exportRows = filteredUsers.map((user) => ({
      Name: user.full_name,
      Email: user.email,
      Role: user.role,
      Status: user.status,
      Access:
        user.role === "SUPER ADMIN"
          ? "Level 5 - System"
          : user.role === "ADMIN"
            ? "Level 4 - Global"
            : user.team_id
              ? "Level 2 - Department"
              : "Level 3 - Regional",
    }));

    return (
      <section className={pageStyles.pageCard}>
        <div className={pageStyles.hero}>
          <div className={pageStyles.heroCopy}>
            <h1 className={pageStyles.pageTitle}>User Management</h1>
            <p className={pageStyles.pageNote}>Configure enterprise access, roles, and security protocols.</p>
          </div>

          <button
            type="button"
            className={pageStyles.primaryAction}
            onClick={() => openUserModal("create")}
            disabled={!permissions.canCreateEmployee && !permissions.canCreateAdmin}
          >
            <PlusIcon className={pageStyles.primaryActionIcon} size={18} strokeWidth={2.1} />
            <span>Add New User</span>
          </button>
        </div>

        <section className={pageStyles.managementShell}>
          <div className={pageStyles.tabs} role="tablist" aria-label="Management sections">
            <div role="tab" tabIndex={0} aria-selected="true" className={[pageStyles.tabButton, pageStyles.tabActive].join(" ")}>
              Account Management
            </div>
            <div
              role="tab"
              tabIndex={0}
              aria-selected="false"
              className={pageStyles.tabButton}
              onClick={goToTeams}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  goToTeams();
                }
              }}
            >
              Team Management
            </div>
          </div>

          <div className={pageStyles.summaryGrid}>
            {[
              { label: "Total Members", value: users.length },
              { label: "Total Members (Active)", value: activeUsers },
              { label: "Total Members (Deactive)", value: deactiveUsers },
              { label: "Members working Today", value: workingToday },
              { label: "Members on leave Today", value: onLeaveToday },
            ].map((card) => (
              <article key={card.label} className={pageStyles.summaryMetric}>
                <p className={pageStyles.summaryLabel}>{card.label}</p>
                <strong className={pageStyles.summaryValue}>{card.value}</strong>
              </article>
            ))}
          </div>

          <div className={pageStyles.toolbarRow}>
            <div className={pageStyles.filters}>
              <div className={pageStyles.selectWrap}>
                <select
                  className={pageStyles.compactSelect}
                  value={this.state.statusFilter}
                  onChange={(event) => this.setState({ statusFilter: event.target.value, currentPage: 1 })}
                >
                  <option value="ALL">Status: All</option>
                  <option value="ACTIVE">Status: Active</option>
                  <option value="INACTIVE">Status: Inactive</option>
                  <option value="TERMINATED">Status: Terminated</option>
                </select>
              </div>

              <div className={pageStyles.selectWrap}>
                <select
                  className={pageStyles.compactSelect}
                  value={this.state.roleFilter}
                  onChange={(event) => this.setState({ roleFilter: event.target.value, currentPage: 1 })}
                >
                  <option value="ALL">Role: All</option>
                  {Object.values(ROLE_OPTIONS).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
                  this.downloadUsers(exportRows);
                  if (setNotice) {
                    setNotice("User data downloaded as CSV for Excel.");
                  }
                }}
              >
                <DownloadIcon className={pageStyles.toolbarIconSvg} />
              </button>
            </div>
          </div>

          <div className={pageStyles.tableShell}>
            <UserTable
              users={paginatedUsers}
              teams={teams}
              onEdit={(user) => openUserModal("edit", user)}
              onToggleStatus={toggleUserStatus}
              onDelete={deleteUser}
              canEdit={permissions.canEditUsers}
              canDeactivate={permissions.canDeactivateUsers}
            />

            <div className={pageStyles.toolbarRow}>
              <p className={pageStyles.pageNote}>
                Showing {filteredUsers.length ? pageStart + 1 : 0}-{Math.min(pageStart + rowsPerPage, filteredUsers.length)} of {filteredUsers.length} users
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

        <UserForm
          open={modal?.type === "user"}
          mode={modal?.mode}
          user={modal?.data}
          teams={teams}
          canCreateAdmin={permissions.canCreateAdmin}
          onClose={closeUserModal}
          onSubmit={saveUser}
        />
      </section>
    );
  }
}
