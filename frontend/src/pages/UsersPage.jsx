import { useMemo, useState } from "react";
import { ROLE_OPTIONS, useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

// Users page.
export default function UsersPage() {
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
  } = useApp();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.full_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <section className="page-card">
      <PageHeader
        title="Users"
        note="Search and manage accounts."
        action={
          <button
            type="button"
            className="primary-button"
            onClick={() => openUserModal("create")}
            disabled={!permissions.canCreateEmployee && !permissions.canCreateAdmin}
          >
            Create User
          </button>
        }
      />

      <div className="filter-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name or email"
        />
        <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
          <option value="ALL">All roles</option>
          {Object.values(ROLE_OPTIONS).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="ALL">All status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="TERMINATED">TERMINATED</option>
        </select>
      </div>

      <div className="hint-box">
        {currentUser ? `${currentUser.full_name} · ${currentUser.role}` : "No user"}
      </div>

      <UserTable
        users={filteredUsers}
        teams={teams}
        onEdit={(user) => openUserModal("edit", user)}
        onToggleStatus={toggleUserStatus}
        onDelete={deleteUser}
        canEdit={permissions.canEditUsers}
        canDeactivate={permissions.canDeactivateUsers}
      />

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
