import { useState } from "react";
import Badge from "./Badge";
import { seniorityOptions, teamOptions, makePassword } from "../data/systemState";

// This small helper makes form fields easier to write.
function Field({ label, children }) {
  return (
    <label className="console-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function AccountConsole({
  currentUser,
  accounts,
  onCreateAdmin,
  onCreateEmployee,
  onToggleStatus,
  onUpdateAccount,
  onDeleteAccount,
}) {
  // Only active Admin accounts can create employees.
  const adminAccounts = accounts.filter(
    (account) => account.role === "Admin" && account.status === "Active"
  );
  // If there are no admins, the Super Admin can create employees.
  const activeCreators = adminAccounts.length ? adminAccounts : accounts.filter((account) => account.role === "Super Admin");

  // Form for creating Admins.
  const [adminForm, setAdminForm] = useState({
    fullName: "",
    email: "",
    team: teamOptions[0],
    seniority: "Lead",
    permissionsText: "Onboarding, Teams",
    password: "",
  });

  // Form for creating Employees.
  const [employeeForm, setEmployeeForm] = useState({
    fullName: "",
    email: "",
    team: teamOptions[0],
    seniority: "Junior",
    createdBy: activeCreators[0]?.id || "",
    password: "",
  });

  // This stores the account being edited.
  const [editingAccountId, setEditingAccountId] = useState("");
  // This is the edit form data.
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    team: teamOptions[0],
    seniority: "Junior",
    permissions: "",
  });

  // Submit the Admin creation form.
  function submitAdmin(event) {
    event.preventDefault();
    onCreateAdmin({
      ...adminForm,
      permissions: adminForm.permissionsText
        .split(",")
        .map((permission) => permission.trim())
        .filter(Boolean),
      createdBy: currentUser.id,
      password: adminForm.password || makePassword("Admin"),
    });
    setAdminForm({
      fullName: "",
      email: "",
      team: teamOptions[0],
      seniority: "Lead",
      permissionsText: "Onboarding, Teams",
      password: "",
    });
  }

  // Submit the Employee creation form.
  function submitEmployee(event) {
    event.preventDefault();
    onCreateEmployee({
      ...employeeForm,
      createdBy: employeeForm.createdBy || currentUser.id,
      password: employeeForm.password || makePassword("Employee"),
    });
    setEmployeeForm({
      fullName: "",
      email: "",
      team: teamOptions[0],
      seniority: "Junior",
      createdBy: activeCreators[0]?.id || "",
      password: "",
    });
  }

  // Find the name of the person who created the record.
  function getCreatorName(createdBy) {
    const creator = accounts.find((account) => account.id === createdBy);
    return creator ? creator.fullName : createdBy;
  }

  // Open the edit form for one account.
  function startEdit(account) {
    if (account.role === "Super Admin") {
      return;
    }
    setEditingAccountId(account.id);
    setEditForm({
      fullName: account.fullName,
      email: account.email,
      team: account.team,
      seniority: account.seniority,
      permissions: account.permissions.join(", "),
    });
  }

  // Save the edited account details.
  function submitEdit(event) {
    event.preventDefault();
    onUpdateAccount({
      id: editingAccountId,
      fullName: editForm.fullName,
      email: editForm.email,
      team: editForm.team,
      seniority: editForm.seniority,
      permissions: editForm.permissions
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
    setEditingAccountId("");
  }

  return (
    <SectionGrid>
      <section className="section-card" id="system-logic">
        <div className="section-head">
          <div>
            <h2>Account Management</h2>
          </div>
        </div>

        {/* These forms create and edit accounts in the UI state. */}
        <div className="logic-grid">
          <form className="logic-card" onSubmit={submitAdmin}>
            <div className="logic-card-head">
              <strong>Create Admin</strong>
            </div>

            <Field label="Full name">
              <input
                value={adminForm.fullName}
                onChange={(event) => setAdminForm({ ...adminForm, fullName: event.target.value })}
                placeholder="Admin name"
                required
              />
            </Field>

            <Field label="Work email">
              <input
                type="email"
                value={adminForm.email}
                onChange={(event) => setAdminForm({ ...adminForm, email: event.target.value })}
                placeholder="admin@company.com"
                required
              />
            </Field>

            <div className="dual-fields">
              <Field label="Team">
                <select
                  value={adminForm.team}
                  onChange={(event) => setAdminForm({ ...adminForm, team: event.target.value })}
                >
                  {teamOptions.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Seniority">
                <select
                  value={adminForm.seniority}
                  onChange={(event) => setAdminForm({ ...adminForm, seniority: event.target.value })}
                >
                  {seniorityOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Assigned permissions">
              <input
                value={adminForm.permissionsText}
                onChange={(event) => setAdminForm({ ...adminForm, permissionsText: event.target.value })}
                placeholder="Onboarding, Teams"
              />
            </Field>

            <Field label="Manual password">
              <input
                value={adminForm.password}
                onChange={(event) => setAdminForm({ ...adminForm, password: event.target.value })}
                placeholder="Optional custom password"
              />
            </Field>

            <button type="submit" className="primary-button">
              Create Admin
            </button>
          </form>

          <form className="logic-card" onSubmit={submitEmployee}>
            <div className="logic-card-head">
              <strong>Create Employee</strong>
            </div>

            <Field label="Full name">
              <input
                value={employeeForm.fullName}
                onChange={(event) => setEmployeeForm({ ...employeeForm, fullName: event.target.value })}
                placeholder="Employee name"
                required
              />
            </Field>

            <Field label="Work email">
              <input
                type="email"
                value={employeeForm.email}
                onChange={(event) => setEmployeeForm({ ...employeeForm, email: event.target.value })}
                placeholder="employee@company.com"
                required
              />
            </Field>

            <div className="dual-fields">
              <Field label="Team">
                <select
                  value={employeeForm.team}
                  onChange={(event) => setEmployeeForm({ ...employeeForm, team: event.target.value })}
                >
                  {teamOptions.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Seniority">
                <select
                  value={employeeForm.seniority}
                  onChange={(event) => setEmployeeForm({ ...employeeForm, seniority: event.target.value })}
                >
                  {seniorityOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Created by Admin">
              <select
                value={employeeForm.createdBy}
                onChange={(event) => setEmployeeForm({ ...employeeForm, createdBy: event.target.value })}
              >
                {activeCreators.map((creator) => (
                  <option key={creator.id} value={creator.id}>
                    {creator.fullName}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Manual password">
              <input
                value={employeeForm.password}
                onChange={(event) => setEmployeeForm({ ...employeeForm, password: event.target.value })}
                placeholder="Password shared manually"
              />
            </Field>
            <button type="submit" className="primary-button">
              Create Employee
            </button>
          </form>
        </div>

        {/* This form only appears when an account is being edited. */}
        {editingAccountId ? (
          <form className="logic-card" onSubmit={submitEdit}>
            <div className="logic-card-head">
              <strong>Edit Account</strong>
              <Badge tone="blue">Super Admin only</Badge>
            </div>

            <Field label="Full name">
              <input
                value={editForm.fullName}
                onChange={(event) => setEditForm({ ...editForm, fullName: event.target.value })}
                required
              />
            </Field>

            <Field label="Work email">
              <input
                type="email"
                value={editForm.email}
                onChange={(event) => setEditForm({ ...editForm, email: event.target.value })}
                required
              />
            </Field>

            <div className="dual-fields">
              <Field label="Team">
                <select
                  value={editForm.team}
                  onChange={(event) => setEditForm({ ...editForm, team: event.target.value })}
                >
                  {teamOptions.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Seniority">
                <select
                  value={editForm.seniority}
                  onChange={(event) => setEditForm({ ...editForm, seniority: event.target.value })}
                >
                  {seniorityOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Assigned permissions">
              <input
                value={editForm.permissions}
                onChange={(event) => setEditForm({ ...editForm, permissions: event.target.value })}
                placeholder="Onboarding, Teams"
              />
            </Field>

            <button type="submit" className="primary-button">
              Save changes
            </button>
          </form>
        ) : null}
      </section>

      {/* This is the saved account list with the action buttons. */}
      <section className="section-card" id="accounts-table">
        <div className="section-head">
          <div>
            <h2>Account Operations</h2>
          </div>
        </div>
        <div className="table-wrap">
          <table className="accounts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Team</th>
                <th>Created by</th>
                <th>Created at</th>
                <th>Permissions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>
                    <strong>{account.fullName}</strong>
                    <span className="table-subtext">{account.email}</span>
                  </td>
                  <td>{account.role}</td>
                  <td>{account.team}</td>
                  <td>{getCreatorName(account.createdBy)}</td>
                  <td>{account.createdAt}</td>
                  <td>{account.permissions.join(", ") || "None"}</td>
                  <td>
                    <Badge tone={account.status === "Active" ? "green" : "slate"}>{account.status}</Badge>
                  </td>
                  <td>
                    <div className="row-actions">
                      {account.status === "Active" ? (
                        <button
                          type="button"
                          className="ghost-button"
                          onClick={() =>
                            onToggleStatus({
                              id: account.id,
                              targetName: account.fullName,
                              nextStatus: "Inactive",
                              reason: "Manual deactivation",
                            })
                          }
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="ghost-button"
                          onClick={() =>
                            onToggleStatus({
                              id: account.id,
                              targetName: account.fullName,
                              nextStatus: "Active",
                            })
                          }
                        >
                          Reactivate
                        </button>
                      )}

                      {account.role !== "Super Admin" ? (
                        <button
                          type="button"
                          className="ghost-button"
                          onClick={() => startEdit(account)}
                        >
                          Edit
                        </button>
                      ) : null}

                      {account.role !== "Super Admin" ? (
                        <button
                          type="button"
                          className="ghost-button"
                          onClick={() =>
                            onDeleteAccount({
                              id: account.id,
                              targetName: account.fullName,
                            })
                          }
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SectionGrid>
  );
}

function SectionGrid({ children }) {
  // This keeps the whole account console stacked in one column.
  return <div className="section-stack">{children}</div>;
}
