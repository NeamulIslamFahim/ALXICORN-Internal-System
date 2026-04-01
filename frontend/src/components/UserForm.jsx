import { useEffect, useState } from "react";
import PermissionSelector from "./PermissionSelector";
import FormField from "./FormField";
import { ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS } from "../context/AppContext";

// Create or edit a user.
export default function UserForm({ open, mode, user, teams, canCreateAdmin, onClose, onSubmit }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    id: "",
    full_name: "",
    email: "",
    password: "",
    role: ROLE_OPTIONS.EMPLOYEE,
    status: STATUS_OPTIONS.ACTIVE,
    permissions: [],
    team_id: "",
    seniority_role: SENIORITY_OPTIONS.JUNIOR,
  });

  useEffect(() => {
    // When the modal opens, fill the form with either blank values or the selected user.
    if (!open) {
      return;
    }

    if (isEdit && user) {
      setForm({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        password: "",
        role: user.role,
        status: user.status,
        permissions: user.permissions.filter((permission) => permission !== "ALL_ACCESS"),
        team_id: user.team_id || "",
        seniority_role: user.seniority_role,
      });
      return;
    }

    setForm({
      id: "",
      full_name: "",
      email: "",
      password: "",
      role: canCreateAdmin ? ROLE_OPTIONS.ADMIN : ROLE_OPTIONS.EMPLOYEE,
      status: STATUS_OPTIONS.ACTIVE,
      permissions: [],
      team_id: teams[0]?.id || "",
      seniority_role: SENIORITY_OPTIONS.JUNIOR,
    });
  }, [open, isEdit, user, teams, canCreateAdmin]);

  if (!open) {
    return null;
  }

  const allowedRoles = canCreateAdmin
    ? [ROLE_OPTIONS.ADMIN, ROLE_OPTIONS.EMPLOYEE]
    : [ROLE_OPTIONS.EMPLOYEE];

  // Send the current form values back to the page.
  function submit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-head">
          <div>
            <p className="eyebrow">{isEdit ? "Edit" : "Create"}</p>
            <h3>{isEdit ? "User" : "User"}</h3>
          </div>
          <button type="button" className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>

        {/* Main form body keeps the fields scrollable inside the popup. */}
        <form className="modal-form" onSubmit={submit}>
          <div className="modal-body">
            <FormField label="Name">
              <input
                value={form.full_name}
                onChange={(event) => setForm({ ...form, full_name: event.target.value })}
                required
              />
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
              />
            </FormField>

            <FormField label="Role">
              <select
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value })}
                disabled={isEdit}
              >
                {allowedRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </FormField>

            <div className="two-col">
              <FormField label="Team">
                <select value={form.team_id} onChange={(event) => setForm({ ...form, team_id: event.target.value })}>
                  <option value="">No team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Seniority">
                <select
                  value={form.seniority_role}
                  onChange={(event) => setForm({ ...form, seniority_role: event.target.value })}
                >
                  {Object.values(SENIORITY_OPTIONS).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField label="Password">
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder={isEdit ? "Leave empty to keep" : "Password"}
                required={!isEdit}
              />
            </FormField>

            {form.role === ROLE_OPTIONS.ADMIN ? (
              // Only Admin users need the permission selector.
              <FormField label="Permissions">
                <PermissionSelector
                  value={form.permissions}
                  onChange={(permissions) => setForm({ ...form, permissions })}
                  disabled={!canCreateAdmin && !isEdit}
                />
              </FormField>
            ) : null}

            {isEdit ? (
              // Only edit mode allows changing the saved status.
              <FormField label="Status">
                <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                  {Object.values(STATUS_OPTIONS).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </FormField>
            ) : null}
          </div>

          {/* Footer actions stay fixed at the bottom of the modal. */}
          <div className="modal-actions">
            <span className="modal-note">
              {isEdit ? "Update the saved user." : "Fill the fields and save the user."}
            </span>
            <div className="button-row">
              <button type="button" className="ghost-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="primary-button">
                {isEdit ? "Save changes" : "Create user"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
