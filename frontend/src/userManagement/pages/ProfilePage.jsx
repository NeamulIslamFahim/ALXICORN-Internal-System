import React, { Component } from "react";
import { AppContext } from "../context/AppContext";

// Employee screen with only personal info.
export default class ProfilePage extends Component {
  static contextType = AppContext;

  render() {
    const { currentUser, teams } = this.context;
    const team = teams.find((item) => item.id === currentUser?.team_id);
    const teamName = team ? team.name : "-";

    return (
      <section className="page-card">
        <div className="page-head">
          <div>
            <p className="eyebrow">Profile</p>
            <h2>{currentUser?.full_name}</h2>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <span>Role</span>
            <strong>{currentUser?.role}</strong>
          </div>
          <div className="profile-card">
            <span>Email</span>
            <strong>{currentUser?.email}</strong>
          </div>
          <div className="profile-card">
            <span>Team</span>
            <strong>{teamName}</strong>
          </div>
          <div className="profile-card">
            <span>Status</span>
            <strong>{currentUser?.status}</strong>
          </div>
        </div>
      </section>
    );
  }
}
