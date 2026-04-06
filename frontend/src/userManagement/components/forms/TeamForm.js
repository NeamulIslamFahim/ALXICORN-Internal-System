import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import ModalActionFooter from "./ModalActionFooter";
import Modal from "../layout/Modal";
import ModalForm from "../layout/ModalForm";
import MemberAdder from "./MemberAdder";
import { AppContext } from "../../context/AppContext";
import formStyles from "./forms.module.css";
import { buildOptionsFromItems, filterActiveUsers } from "../../utils/uiHelpers";

// This modal creates or edits one team.
export default class TeamForm extends ModalForm {
  static contextType = AppContext;

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
      prevProps.team?.id !== this.props.team?.id ||
      prevProps.users !== this.props.users
    );
  }

  buildForm(props) {
    const isEdit = props.mode === "edit";
    const availableUsers = filterActiveUsers(props.users);

    if (isEdit && props.team) {
      return {
        id: props.team.id,
        name: props.team.name,
        team_lead_id: props.team.team_lead_id || "",
        members: props.team.members.filter((member) => member.user_id !== props.team.team_lead_id),
      };
    }

    return {
      id: "",
      name: "",
      team_lead_id: availableUsers[0]?.id || "",
      members: [],
    };
  }

  addMember(userId, seniorityRole) {
    if (!userId) {
      return;
    }

    this.updateForm((form) => ({
      ...form,
      members: [
        ...form.members.filter((member) => member.user_id !== userId),
        { user_id: userId, seniority_role: seniorityRole },
      ],
    }));
  }

  removeMember(userId) {
    this.updateForm((form) => ({
      ...form,
      members: form.members.filter((member) => member.user_id !== userId),
    }));
  }

  submit(event) {
    this.submitForm(event, this.props.onSubmit);
  }

  render() {
    const isEdit = this.props.mode === "edit";
    const availableUsers = filterActiveUsers(this.props.users);

    if (!this.props.open) {
      return null;
    }

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
        onSubmit={this.submit}
        title={isEdit ? "Edit Team" : "Create Team"}
        footer={
          <ModalActionFooter
            submitLabel={isEdit ? "Save changes" : "Create team"}
            onCancel={this.props.onClose}
            align="end"
          />
        }
        >
        <FormInput
          label="Team name"
          value={this.state.form.name}
          onChange={(value) => this.updateField("name", value)}
          required
        />

        <FormSelect
          label="Team lead"
          value={this.state.form.team_lead_id}
          onChange={(value) => this.updateField("team_lead_id", value)}
          options={buildOptionsFromItems(availableUsers, "id", "full_name")}
        />

        <div className={formStyles.memberEditor}>
          {/* Team members are managed one by one here. */}
          <span className={formStyles.memberLabel}>Members</span>
          <MemberAdder users={availableUsers} onAdd={(userId, seniorityRole) => this.addMember(userId, seniorityRole)} />
          <div className={formStyles.memberList}>
            {this.state.form.members.map((member) => {
              const user = availableUsers.find((item) => item.id === member.user_id);
              return (
                <div className={formStyles.memberChip} key={member.user_id}>
                  <strong>{user ? user.full_name : member.user_id}</strong>
                  <span>{member.seniority_role}</span>
                  <FormButton type="button" variant="ghost" onClick={() => this.removeMember(member.user_id)}>
                    Remove
                  </FormButton>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    );
  }
}
