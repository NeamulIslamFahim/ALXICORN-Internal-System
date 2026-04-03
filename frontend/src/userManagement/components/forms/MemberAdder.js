import React, { Component } from "react";
import { SENIORITY_OPTIONS } from "../../context/AppContext";
import styles from "./forms.module.css";

// Helper control for assembling team members without exposing the parent form internals.
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
      <div className={styles.memberAdder}>
        <select className={styles.select} value={this.state.userId} onChange={(event) => this.setState({ userId: event.target.value })}>
          {this.props.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.full_name}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
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
          className={[styles.button, styles.buttonGhost].join(" ")}
          onClick={() => this.props.onAdd(this.state.userId, this.state.seniorityRole)}
        >
          Add member
        </button>
      </div>
    );
  }
}
