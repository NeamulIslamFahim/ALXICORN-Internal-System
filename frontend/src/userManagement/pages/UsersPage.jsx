import React, { Component } from "react";
import { AppContext, ROLE_OPTIONS } from "../context/AppContext";
import PageHeader from "../components/layout/PageHeader";
import UserTable from "../components/tables/UserTable";
import UserForm from "../components/forms/UserForm";
import FormInput from "../components/forms/FormInput";
import FormSelect from "../components/forms/FormSelect";
import FormButton from "../components/forms/FormButton";
import { filterUsers } from "../utils/uiHelpers";

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
    } = this.context;

    const filteredUsers = filterUsers(users, this.state.search, this.state.roleFilter, this.state.statusFilter);

    return (
      <section className="page-card">
        <PageHeader
          title="Users"
          note="Search and manage accounts."
          action={
            <div className="header-actions">
              <FormButton
                type="button"
                variant="primary"
                onClick={() => openUserModal("create")}
                disabled={!permissions.canCreateEmployee && !permissions.canCreateAdmin}
              >
                Create User
              </FormButton>
            </div>
          }
        />

        <div className="filter-row">
          <FormInput
            label=""
            value={this.state.search}
            onChange={(value) => this.setState({ search: value })}
            placeholder="Search by name or email"
          />
          <FormSelect
            label=""
            value={this.state.roleFilter}
            onChange={(value) => this.setState({ roleFilter: value })}
            options={[
              { value: "ALL", label: "All roles" },
              ...Object.values(ROLE_OPTIONS).map((role) => ({ value: role, label: role })),
            ]}
          />
          <FormSelect
            label=""
            value={this.state.statusFilter}
            onChange={(value) => this.setState({ statusFilter: value })}
            options={[
              { value: "ALL", label: "All status" },
              { value: "ACTIVE", label: "ACTIVE" },
              { value: "INACTIVE", label: "INACTIVE" },
              { value: "TERMINATED", label: "TERMINATED" },
            ]}
          />
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
