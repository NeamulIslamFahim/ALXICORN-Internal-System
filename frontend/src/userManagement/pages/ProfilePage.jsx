import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import InfoCard from "../components/InfoCard";

// Employee screen with only personal info.
export default class ProfilePage extends Component {
  static contextType = AppContext;

  render() {
    const { currentUser, teams } = this.context;
    const team = teams.find((item) => item.id === currentUser?.team_id);
    const teamName = team ? team.name : "-";

    return (
      <section className="page-card">
        <PageHeader eyebrow="Profile" title={currentUser?.full_name} />

        <div className="profile-grid">
          <InfoCard label="Role" value={currentUser?.role} />
          <InfoCard label="Email" value={currentUser?.email} />
          <InfoCard label="Team" value={teamName} />
          <InfoCard label="Status" value={currentUser?.status} />
        </div>
      </section>
    );
  }
}
