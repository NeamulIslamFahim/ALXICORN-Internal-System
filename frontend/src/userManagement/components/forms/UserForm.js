import React from "react";
import PermissionSelector from "./PermissionSelector";
import FormField from "./FormField";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import ModalActionFooter from "./ModalActionFooter";
import Modal from "../layout/Modal";
import ModalForm from "../layout/ModalForm";
import { buildOptionsFromItems, optionsFromStrings } from "../../utils/uiHelpers";
import { ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS } from "../../context/AppContext";
import formStyles from "./forms.module.css";

// Create or edit a user.
export default class UserForm extends ModalForm {
  constructor(props) {
    super(props);
    this.state = {
      form: this.buildForm(props),
    };

    this.submit = this.submit.bind(this);
  }

  shouldResetForm(prevProps) {
    return (
      (!prevProps.open && this.props.open) ||
      prevProps.mode !== this.props.mode ||
      prevProps.user?.id !== this.props.user?.id ||
      prevProps.canCreateAdmin !== this.props.canCreateAdmin ||
      prevProps.teams !== this.props.teams
    );
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
    this.submitForm(event, this.props.onSubmit);
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
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
        onSubmit={this.submit}
        title={isEdit ? "Edit User" : "Create User"}
        subtitle={isEdit ? "Edit" : "Create"}
        footer={
          <ModalActionFooter
            note={isEdit ? "Update the saved user." : "Fill the fields and save the user."}
            submitLabel={isEdit ? "Save changes" : "Create user"}
            onCancel={this.props.onClose}
          />
        }
        >
          <FormInput
            label="Name"
            value={this.state.form.full_name}
            onChange={(value) => this.updateField("full_name", value)}
            required
          />

          <FormInput
            label="Email"
            type="email"
            value={this.state.form.email}
            onChange={(value) => this.updateField("email", value)}
            required
          />

          <FormSelect
            label="Role"
            value={this.state.form.role}
            onChange={(value) => this.updateField("role", value)}
            options={optionsFromStrings(allowedRoles)}
            disabled={isEdit}
          />

          <div className={formStyles.twoCol}>
            <FormSelect
              label="Team"
              value={this.state.form.team_id}
              onChange={(value) => this.updateField("team_id", value)}
              options={[{ value: "", label: "No team" }, ...buildOptionsFromItems(this.props.teams)]}
            />

            <FormSelect
              label="Seniority"
              value={this.state.form.seniority_role}
              onChange={(value) => this.updateField("seniority_role", value)}
              options={optionsFromStrings(Object.values(SENIORITY_OPTIONS))}
            />
          </div>

          <FormInput
            label="Password"
            type="password"
            value={this.state.form.password}
            onChange={(value) => this.updateField("password", value)}
            placeholder={isEdit ? "Leave empty to keep" : "Password"}
            required={!isEdit}
          />

        {this.state.form.role === ROLE_OPTIONS.ADMIN ? (
          <FormField label="Permissions">
            <PermissionSelector
              value={this.state.form.permissions}
              onChange={(permissions) => this.updateField("permissions", permissions)}
              disabled={!this.props.canCreateAdmin && !isEdit}
            />
          </FormField>
        ) : null}

        {isEdit ? (
          <FormSelect
            label="Status"
            value={this.state.form.status}
            onChange={(value) => this.updateField("status", value)}
            options={optionsFromStrings(Object.values(STATUS_OPTIONS))}
          />
        ) : null}
      </Modal>
    );
  }
}
