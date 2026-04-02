import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import Modal from "./Modal";
import ModalForm from "./ModalForm";
import ButtonRow from "./ButtonRow";
import MemberAdder from "./MemberAdder";
import { AppContext, SENIORITY_OPTIONS } from "../context/AppContext";

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
    const availableUsers = props.users.filter((user) => user.status === "ACTIVE");

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

    this.setState({
      form: {
        ...this.state.form,
        members: [
          ...this.state.form.members.filter((member) => member.user_id !== userId),
          { user_id: userId, seniority_role: seniorityRole },
        ],
      },
    });
  }

  removeMember(userId) {
    this.setState({
      form: {
        ...this.state.form,
        members: this.state.form.members.filter((member) => member.user_id !== userId),
      },
    });
  }

  submit(event) {
    this.submitForm(event, this.props.onSubmit);
  }

  render() {
    const isEdit = this.props.mode === "edit";
    const availableUsers = this.props.users.filter((user) => user.status === "ACTIVE");

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
          <div className="modal-actions">
            <ButtonRow>
                <FormButton type="button" variant="ghost" onClick={this.props.onClose}>
                  Cancel
                </FormButton>
                <FormButton type="submit" variant="primary">
                  {isEdit ? "Save changes" : "Create team"}
                </FormButton>
              </ButtonRow>
            </div>
          }
        >
        <FormInput
          label="Team name"
          value={this.state.form.name}
          onChange={(value) => this.setState({ form: { ...this.state.form, name: value } })}
          required
        />

        <FormSelect
          label="Team lead"
          value={this.state.form.team_lead_id}
          onChange={(value) => this.setState({ form: { ...this.state.form, team_lead_id: value } })}
          options={availableUsers.map((user) => ({ value: user.id, label: user.full_name }))}
        />

        <div className="member-editor">
          {/* Team members are managed one by one here. */}
          <span>Members</span>
          <MemberAdder users={availableUsers} onAdd={(userId, seniorityRole) => this.addMember(userId, seniorityRole)} />
          <div className="member-list">
            {this.state.form.members.map((member) => {
              const user = availableUsers.find((item) => item.id === member.user_id);
              return (
                <div className="member-chip" key={member.user_id}>
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
