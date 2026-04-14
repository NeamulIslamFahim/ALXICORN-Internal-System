import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/layout/PageHeader";
import InfoCard from "../components/layout/InfoCard";
import pageStyles from "./pages.module.css";
import layoutStyles from "../components/layout/layout.module.css";

// Profile page is the simplified employee-facing view of the system.
export default class ProfilePage extends Component {
  static contextType = AppContext;

  render() {
    const { currentUser, teams } = this.context;
    const team = teams.find((item) => item.id === currentUser?.team_id);
    const teamName = team ? team.name : "-";

    return (
      <section className={pageStyles.pageCard}>
        <PageHeader
          eyebrow="Profile"
          title={currentUser?.full_name}
          note="A cleaner personal dashboard with the same raised-card style used across the system."
          badge={currentUser?.status}
        />

        <div className={pageStyles.heroGrid}>
          <div className={pageStyles.heroPanel}>
            <p className={pageStyles.heroLabel}>Personal workspace</p>
            <h3 className={pageStyles.heroTitle}>Your role, access, and team details at a glance.</h3>
            <p className={pageStyles.heroText}>
              This section borrows the reference design&apos;s bold introductory block while keeping the content concise.
            </p>
          </div>
          <div className={pageStyles.metricGrid}>
            <div className={pageStyles.metricCard}>
              <span className={pageStyles.metricLabel}>Role</span>
              <strong className={pageStyles.metricValue}>{currentUser?.role}</strong>
            </div>
            <div className={pageStyles.metricCard}>
              <span className={pageStyles.metricLabel}>Team</span>
              <strong className={pageStyles.metricValue}>{teamName}</strong>
            </div>
            <div className={pageStyles.metricCard}>
              <span className={pageStyles.metricLabel}>Status</span>
              <strong className={pageStyles.metricValue}>{currentUser?.status}</strong>
            </div>
          </div>
        </div>

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
