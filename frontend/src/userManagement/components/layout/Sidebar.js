import React, { Component } from "react";
import { AppContext, PAGE_OPTIONS } from "../../context/AppContext";
import alxicornLogo from "../../../assets/images/ALXICORN Logo.png";
import {
  BookOpenIcon,
  BriefcaseIcon,
  CalendarIcon,
  FileTextIcon,
  NotebookIcon,
  PalmIcon,
  SparklesIcon,
  UsersIcon,
} from "../icons/WorkspaceIcons";
import styles from "./sidebar.module.css";

export default class Sidebar extends Component {
  static contextType = AppContext;

  render() {
    const { page, setPage, navigateToPage, setNotice } = this.context;

    const goToItem = (item) => {
      if (item.page) {
        setPage(item.page);
        if (navigateToPage) {
          navigateToPage(item.page);
        }
        return;
      }

      setNotice?.("Not available.");
    };

    const navItems = [
      { page: PAGE_OPTIONS.USERS, label: "User Management", icon: UsersIcon },
      { label: "Talent Acquisition", availability: "Not available", icon: BriefcaseIcon },
      { label: "Onboarding", availability: "Not available", icon: SparklesIcon },
      { label: "Employee Time Table", availability: "Not available", icon: CalendarIcon },
      { label: "Document Management", availability: "Not available", icon: FileTextIcon },
      { label: "Meeting Notes", availability: "Not available", icon: NotebookIcon },
      { label: "Leave Management", availability: "Not available", icon: PalmIcon },
      { label: "How to Guideline", availability: "Not available", icon: BookOpenIcon },
    ];

    return (
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <img src={alxicornLogo.src || alxicornLogo} alt="ALXICORN Internal System" className={styles.logoImage} />
          <p className={styles.eyebrow}>INTERNAL SYSTEM</p>
        </div>

        <nav className={styles.navList}>
          {navItems.map((item) => (
            <div
              key={item.label}
              role="button"
              tabIndex={0}
              className={[styles.navButton, page === item.page ? styles.navButtonActive : null].filter(Boolean).join(" ")}
              onClick={() => goToItem(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  goToItem(item);
                }
              }}
            >
              <span className={styles.navIcon} aria-hidden="true">
                <item.icon size={18} strokeWidth={1.85} />
              </span>
              <span className={styles.navTextStack}>
                <span className={styles.navLabel}>{item.label}</span>
                {item.availability ? <span className={styles.navMeta}>{item.availability}</span> : null}
              </span>
            </div>
          ))}
        </nav>
      </aside>
    );
  }
}
