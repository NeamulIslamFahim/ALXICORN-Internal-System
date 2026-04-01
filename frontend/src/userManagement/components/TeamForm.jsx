import React, { Component } from "react";
import FormField from "./FormField";
import { AppContext, SENIORITY_OPTIONS } from "../context/AppContext";

class MemberAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.users[0]?.id || "",
      seniorityRole: SENIORITY_OPTIONS.JUNIOR,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({ userId: this.props.users[0]?.id || "" });
    }
  }

  render() {
    return (
      <div className="member-adder">
        <select value={this.state.userId} onChange={(event) => this.setState({ userId: event.target.value })}>
          {this.props.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.full_name}
            </option>
          ))}
        </select>
        <select
          value={this.state.seniorityRole}
          onChange={(event) => this.setState({ seniorityRole: event.target.value })}
        >
          {Object.values(SENIORITY_OPTIONS).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="ghost-button"
          onClick={() => this.props.onAdd(this.state.userId, this.state.seniorityRole)}
        >
          Add member
        </button>
      </div>
    );
  }
}

// This modal creates or edits one team.
export default class TeamForm extends Component {
  static contextType = AppContext;

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
      prevProps.team?.id !== this.props.team?.id ||
      prevProps.users !== this.props.users;

    if (shouldReset) {
      this.setState({ form: this.buildForm(this.props) });
    }
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
    event.preventDefault();
    this.props.onSubmit(this.state.form);
  }

  render() {
    const isEdit = this.props.mode === "edit";
    const availableUsers = this.props.users.filter((user) => user.status === "ACTIVE");

    if (!this.props.open) {
      return null;
    }

    return (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-head">
            <h3>{isEdit ? "Edit Team" : "Create Team"}</h3>
            <button type="button" className="ghost-button" onClick={this.props.onClose}>
              Close
            </button>
          </div>

          {/* Team fields stay inside the popup and scroll when needed. */}
          <form className="modal-form" onSubmit={this.submit}>
            <div className="modal-body">
              <FormField label="Team name">
                <input
                  value={this.state.form.name}
                  onChange={(event) => this.setState({ form: { ...this.state.form, name: event.target.value } })}
                  required
                />
              </FormField>

              <FormField label="Team lead">
                <select
                  value={this.state.form.team_lead_id}
                  onChange={(event) =>
                    this.setState({ form: { ...this.state.form, team_lead_id: event.target.value } })
                  }
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
                <MemberAdder users={availableUsers} onAdd={(userId, seniorityRole) => this.addMember(userId, seniorityRole)} />
                <div className="member-list">
                  {this.state.form.members.map((member) => {
                    const user = availableUsers.find((item) => item.id === member.user_id);
                    return (
                      <div className="member-chip" key={member.user_id}>
                        <strong>{user ? user.full_name : member.user_id}</strong>
                        <span>{member.seniority_role}</span>
                        <button type="button" onClick={() => this.removeMember(member.user_id)}>
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="ghost-button" onClick={this.props.onClose}>
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
}
