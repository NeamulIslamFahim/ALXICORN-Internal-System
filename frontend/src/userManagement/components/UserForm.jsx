import React, { Component } from "react";
import PermissionSelector from "./PermissionSelector";
import FormField from "./FormField";
import { ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS } from "../context/AppContext";

// Create or edit a user.
export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: this.buildForm(props),
    };

    this.submit = this.submit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const shouldReset =
      (!prevProps.open && this.props.open) ||
      prevProps.mode !== this.props.mode ||
      prevProps.user?.id !== this.props.user?.id ||
      prevProps.canCreateAdmin !== this.props.canCreateAdmin ||
      prevProps.teams !== this.props.teams;

    if (shouldReset) {
      this.setState({ form: this.buildForm(this.props) });
    }
  }

  buildForm(props) {
    const isEdit = props.mode === "edit";

    if (isEdit && props.user) {
      return {
        id: props.user.id,
        full_name: props.user.full_name,
        email: props.user.email,
        password: "",
        role: props.user.role,
        status: props.user.status,
        permissions: props.user.permissions.filter((permission) => permission !== "ALL ACCESS"),
        team_id: props.user.team_id || "",
        seniority_role: props.user.seniority_role,
      };
    }

    return {
      id: "",
      full_name: "",
      email: "",
      password: "",
      role: props.canCreateAdmin ? ROLE_OPTIONS.ADMIN : ROLE_OPTIONS.EMPLOYEE,
      status: STATUS_OPTIONS.ACTIVE,
      permissions: [],
      team_id: props.teams[0]?.id || "",
      seniority_role: SENIORITY_OPTIONS.JUNIOR,
    };
  }

  submit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.form);
  }

  render() {
    const isEdit = this.props.mode === "edit";
    if (!this.props.open) {
      return null;
    }

    const allowedRoles = this.props.canCreateAdmin
      ? [ROLE_OPTIONS.ADMIN, ROLE_OPTIONS.EMPLOYEE]
      : [ROLE_OPTIONS.EMPLOYEE];

    return (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-head">
            <div>
              <p className="eyebrow">{isEdit ? "Edit" : "Create"}</p>
              <h3>User</h3>
            </div>
            <button type="button" className="ghost-button" onClick={this.props.onClose}>
              Close
            </button>
          </div>

          {/* Main form body keeps the fields scrollable inside the popup. */}
          <form className="modal-form" onSubmit={this.submit}>
            <div className="modal-body">
              <FormField label="Name">
                <input
                  value={this.state.form.full_name}
                  onChange={(event) => this.setState({ form: { ...this.state.form, full_name: event.target.value } })}
                  required
                />
              </FormField>

              <FormField label="Email">
                <input
                  type="email"
                  value={this.state.form.email}
                  onChange={(event) => this.setState({ form: { ...this.state.form, email: event.target.value } })}
                  required
                />
              </FormField>

              <FormField label="Role">
                <select
                  value={this.state.form.role}
                  onChange={(event) => this.setState({ form: { ...this.state.form, role: event.target.value } })}
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
                  <select
                    value={this.state.form.team_id}
                    onChange={(event) => this.setState({ form: { ...this.state.form, team_id: event.target.value } })}
                  >
                    <option value="">No team</option>
                    {this.props.teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Seniority">
                  <select
                    value={this.state.form.seniority_role}
                    onChange={(event) =>
                      this.setState({ form: { ...this.state.form, seniority_role: event.target.value } })
                    }
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
                  value={this.state.form.password}
                  onChange={(event) => this.setState({ form: { ...this.state.form, password: event.target.value } })}
                  placeholder={isEdit ? "Leave empty to keep" : "Password"}
                  required={!isEdit}
                />
              </FormField>

              {this.state.form.role === ROLE_OPTIONS.ADMIN ? (
                // Only Admin users need the permission selector.
                <FormField label="Permissions">
                  <PermissionSelector
                    value={this.state.form.permissions}
                    onChange={(permissions) => this.setState({ form: { ...this.state.form, permissions } })}
                    disabled={!this.props.canCreateAdmin && !isEdit}
                  />
                </FormField>
              ) : null}

              {isEdit ? (
                // Only edit mode allows changing the saved status.
                <FormField label="Status">
                  <select
                    value={this.state.form.status}
                    onChange={(event) => this.setState({ form: { ...this.state.form, status: event.target.value } })}
                  >
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
              <span className="modal-note">{isEdit ? "Update the saved user." : "Fill the fields and save the user."}</span>
              <div className="button-row">
                <button type="button" className="ghost-button" onClick={this.props.onClose}>
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
}
