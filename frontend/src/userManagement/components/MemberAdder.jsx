import React, { Component } from "react";
import { SENIORITY_OPTIONS } from "../context/AppContext";

export default class MemberAdder extends Component {
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
