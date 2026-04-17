import React from "react";
import { PAGE_OPTIONS } from "../../context/AppContext";
import pageStyles from "../../pages/pages.module.css";

const MANAGEMENT_TABS = [
  { page: PAGE_OPTIONS.USERS, label: "Account Management" },
  { page: PAGE_OPTIONS.TEAMS, label: "Team Management" },
];

export default function ManagementTabs({ activePage, onNavigate }) {
  return (
    <div className={pageStyles.tabs} role="tablist" aria-label="Management sections">
      {MANAGEMENT_TABS.map((tab) => {
        const isActive = tab.page === activePage;

        if (isActive) {
          return (
            <div key={tab.page} role="tab" tabIndex={0} aria-selected="true" className={[pageStyles.tabButton, pageStyles.tabActive].join(" ")}>
              {tab.label}
            </div>
          );
        }

        return (
          <div
            key={tab.page}
            role="tab"
            tabIndex={0}
            aria-selected="false"
            className={pageStyles.tabButton}
            onClick={() => onNavigate?.(tab.page)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onNavigate?.(tab.page);
              }
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
