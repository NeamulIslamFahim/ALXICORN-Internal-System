import React, { Component } from "react";
import FormButton from "../forms/FormButton";
import styles from "./layout.module.css";

// Lightweight modal shell that leaves form content and footer actions to callers.
export default class Modal extends Component {
  render() {
    if (!this.props.open) {
      return null;
    }

    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalCard}>
          <div className={styles.modalHead}>
            {this.props.header ? (
              this.props.header
            ) : (
              <div>
                {this.props.subtitle ? <p className={styles.eyebrow}>{this.props.subtitle}</p> : null}
                {this.props.title ? <h3 className={styles.modalTitle}>{this.props.title}</h3> : null}
              </div>
            )}
            <FormButton type="button" variant="ghost" onClick={this.props.onClose}>
              Close
            </FormButton>
          </div>

          <form className={styles.modalForm} onSubmit={this.props.onSubmit}>
            <div className={styles.modalBody}>{this.props.children}</div>
            {this.props.footer || null}
          </form>
        </div>
      </div>
    );
  }
}
