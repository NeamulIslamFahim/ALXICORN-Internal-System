import React, { Component } from "react";
import { AppContext, ROLE_OPTIONS } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

// Users page.
export default class UsersPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      roleFilter: "ALL",
      statusFilter: "ALL",
    };
  }

  render() {
    // Read the users, teams, and user actions from the app context.
    const {
      users,
      teams,
      currentUser,
      modal,
      permissions,
      openUserModal,
      closeUserModal,
      saveUser,
      deleteUser,
      toggleUserStatus,
      exportSeedData,
    } = this.context;

    const query = this.state.search.trim().toLowerCase();
    const filteredUsers = users.filter((user) => {
      const matchesSearch =
        !query ||
        user.full_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = this.state.roleFilter === "ALL" || user.role === this.state.roleFilter;
      const matchesStatus = this.state.statusFilter === "ALL" || user.status === this.state.statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });

    return (
      <section className="page-card">
        <PageHeader
          title="Users"
          note="Search and manage accounts."
          action={
            <div className="header-actions">
              <button type="button" className="ghost-button" onClick={() => exportSeedData("seedData.json")}>
                Download JSON
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={() => openUserModal("create")}
                disabled={!permissions.canCreateEmployee && !permissions.canCreateAdmin}
              >
                Create User
              </button>
            </div>
          }
        />

        <div className="filter-row">
          <input
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}
            placeholder="Search by name or email"
          />
          <select
            value={this.state.roleFilter}
            onChange={(event) => this.setState({ roleFilter: event.target.value })}
          >
            <option value="ALL">All roles</option>
            {Object.values(ROLE_OPTIONS).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            value={this.state.statusFilter}
            onChange={(event) => this.setState({ statusFilter: event.target.value })}
          >
            <option value="ALL">All status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="TERMINATED">TERMINATED</option>
          </select>
        </div>

        {/* Small helper text so the active user is obvious. */}
        <div className="hint-box">{currentUser ? `${currentUser.full_name} · ${currentUser.role}` : "No user"}</div>

        {/* Table shows the current filtered user list. */}
        <UserTable
          users={filteredUsers}
          teams={teams}
          onEdit={(user) => openUserModal("edit", user)}
          onToggleStatus={toggleUserStatus}
          onDelete={deleteUser}
          canEdit={permissions.canEditUsers}
          canDeactivate={permissions.canDeactivateUsers}
        />

        {/* Modal opens only when the user button is clicked. */}
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
