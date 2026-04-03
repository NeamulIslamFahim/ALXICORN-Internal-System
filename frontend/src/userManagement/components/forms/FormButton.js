import React, { Component } from "react";
import styles from "./forms.module.css";

export default class FormButton extends Component {
  render() {
    const { type = "button", variant = "action", disabled = false, loading = false, onClick, children, className } = this.props;
    const variantClass =
      variant === "primary"
        ? styles.buttonPrimary
        : variant === "ghost"
        ? styles.buttonGhost
        : variant === "danger"
        ? styles.buttonDanger
        : null;
    const buttonClassName = [styles.button, variantClass, className].filter(Boolean).join(" ");

    return (
      <button type={type} className={buttonClassName} disabled={disabled || loading} onClick={onClick}>
        {loading ? "Loading..." : children}
      </button>
    );
  }
}
