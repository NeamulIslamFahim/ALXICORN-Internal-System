import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/layout/PageHeader";
import InfoCard from "../components/layout/InfoCard";
import pageStyles from "./pages.module.css";

// Profile page is the simplified employee-facing view of the system.
export default class ProfilePage extends Component {
  static contextType = AppContext;

  render() {
    const { currentUser, teams } = this.context;
    const team = teams.find((item) => item.id === currentUser?.team_id);
    const teamName = team ? team.name : "-";
    const memberSince = currentUser?.created_at
      ? new Date(currentUser.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "-";

    return (
      <section className={pageStyles.pageCard}>
        <PageHeader
          eyebrow="Profile"
          title={currentUser?.full_name || "Profile"}
          note="View your role, access details, and workspace assignment in one place."
          badge={currentUser?.status}
        />

        <section className={pageStyles.managementShell}>
          <div className={pageStyles.summaryGrid}>
            {[
              { label: "Role", value: currentUser?.role || "-" },
              { label: "Team", value: teamName },
              { label: "Status", value: currentUser?.status || "-" },
            ].map((card) => (
              <article key={card.label} className={pageStyles.summaryMetric}>
                <p className={pageStyles.summaryLabel}>{card.label}</p>
                <strong className={pageStyles.summaryValueCompact}>{card.value}</strong>
              </article>
            ))}
          </div>

          <div className={pageStyles.profileIntro}>
            <div className={pageStyles.profileIntroCopy}>
              <p className={pageStyles.profileEyebrow}>Personal Workspace</p>
              <h3 className={pageStyles.profileTitle}>Your account details and team assignment at a glance.</h3>
              <p className={pageStyles.pageNote}>This view keeps employee information compact, readable, and aligned with the rest of the management system.</p>
            </div>
          </div>

          <div className={pageStyles.profileGrid}>
            <InfoCard label="Full Name" value={currentUser?.full_name || "-"} />
            <InfoCard label="Email" value={currentUser?.email || "-"} />
            <InfoCard label="Username" value={currentUser?.username || "-"} />
            <InfoCard label="Role" value={currentUser?.role || "-"} />
            <InfoCard label="Team" value={teamName} />
            <InfoCard label="Status" value={currentUser?.status || "-"} />
            <InfoCard label="Seniority" value={currentUser?.seniority_role || "-"} />
            <InfoCard label="Member Since" value={memberSince} />
          </div>
        </section>
      </section>
    );
  }
}
