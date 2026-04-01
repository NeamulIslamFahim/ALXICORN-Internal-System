import { useEffect, useMemo, useState } from "react";
import FormField from "./FormField";
import { SENIORITY_OPTIONS } from "../context/AppContext";

// This modal creates or edits one team.
export default function TeamForm({ open, mode, team, users, onClose, onSubmit }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    id: "",
    name: "",
    team_lead_id: "",
    members: [],
  });

  const availableUsers = useMemo(() => users.filter((user) => user.status === "ACTIVE"), [users]);

  useEffect(() => {
    // Reset the form when the modal opens.
    if (!open) {
      return;
    }

    if (isEdit && team) {
      setForm({
        id: team.id,
        name: team.name,
        team_lead_id: team.team_lead_id || "",
        members: team.members.filter((member) => member.user_id !== team.team_lead_id),
      });
      return;
    }

    setForm({
      id: "",
      name: "",
      team_lead_id: availableUsers[0]?.id || "",
      members: [],
    });
  }, [open, isEdit, team, availableUsers]);

  if (!open) {
    return null;
  }

  // Add one user to the team member list.
  function addMember(userId, seniorityRole) {
    if (!userId) {
      return;
    }

    // Update the member list without duplicates.
    setForm({
      ...form,
      members: [
        ...form.members.filter((member) => member.user_id !== userId),
        { user_id: userId, seniority_role: seniorityRole },
      ],
    });
  }

  // Remove one user from the team member list.
  function removeMember(userId) {
    setForm({
      ...form,
      members: form.members.filter((member) => member.user_id !== userId),
    });
  }

  // Save the team form values.
  function submit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-head">
          <h3>{isEdit ? "Edit Team" : "Create Team"}</h3>
          <button type="button" className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>

        {/* Team fields stay inside the popup and scroll when needed. */}
        <form className="modal-form" onSubmit={submit}>
          <div className="modal-body">
            <FormField label="Team name">
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            </FormField>

            <FormField label="Team lead">
              <select
                value={form.team_lead_id}
                onChange={(event) => setForm({ ...form, team_lead_id: event.target.value })}
              >
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name}
                  </option>
                ))}
              </select>
            </FormField>

            <div className="member-editor">
              {/* Team members are managed one by one here. */}
              <span>Members</span>
              <MemberAdder users={availableUsers} onAdd={addMember} />
              <div className="member-list">
                {form.members.map((member) => {
                  const user = availableUsers.find((item) => item.id === member.user_id);
                  return (
                    <div className="member-chip" key={member.user_id}>
                      <strong>{user ? user.full_name : member.user_id}</strong>
                      <span>{member.seniority_role}</span>
                      <button type="button" onClick={() => removeMember(member.user_id)}>
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="ghost-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {isEdit ? "Save changes" : "Create team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MemberAdder({ users, onAdd }) {
  const [userId, setUserId] = useState(users[0]?.id || "");
  const [seniorityRole, setSeniorityRole] = useState(SENIORITY_OPTIONS.JUNIOR);

  useEffect(() => {
    // Keep the first active user selected when the list changes.
    setUserId(users[0]?.id || "");
  }, [users]);

  return (
    <div className="member-adder">
      <select value={userId} onChange={(event) => setUserId(event.target.value)}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.full_name}
          </option>
        ))}
      </select>
      <select value={seniorityRole} onChange={(event) => setSeniorityRole(event.target.value)}>
        {Object.values(SENIORITY_OPTIONS).map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <button type="button" className="ghost-button" onClick={() => onAdd(userId, seniorityRole)}>
        Add member
      </button>
    </div>
  );
}
