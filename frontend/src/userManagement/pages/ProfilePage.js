import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/layout/PageHeader";
import InfoCard from "../components/layout/InfoCard";
import pageStyles from "./pages.module.css";
import layoutStyles from "../components/layout/layout.module.css";

// Employee screen with only personal info.
export default class ProfilePage extends Component {
  static contextType = AppContext;

  render() {
    const { currentUser, teams } = this.context;
    const team = teams.find((item) => item.id === currentUser?.team_id);
    const teamName = team ? team.name : "-";

    return (
      <section className={pageStyles.pageCard}>
        <PageHeader eyebrow="Profile" title={currentUser?.full_name} />

        <div className={pageStyles.profileGrid}>
          <InfoCard label="Role" value={currentUser?.role} className={layoutStyles.infoCard} />
          <InfoCard label="Email" value={currentUser?.email} className={layoutStyles.infoCard} />
          <InfoCard label="Team" value={teamName} className={layoutStyles.infoCard} />
          <InfoCard label="Status" value={currentUser?.status} className={layoutStyles.infoCard} />
        </div>
      </section>
    );
  }
}
