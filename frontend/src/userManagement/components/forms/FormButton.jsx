import React, { Component } from "react";

export default class FormButton extends Component {
  render() {
    const { type = "button", variant = "action", disabled = false, loading = false, onClick, children } = this.props;
    const variantClass =
      variant === "primary"
        ? "primary-button"
        : variant === "ghost"
        ? "ghost-button"
        : variant === "danger"
        ? "danger-button"
        : "action-button";

    return (
      <button type={type} className={variantClass} disabled={disabled || loading} onClick={onClick}>
        {loading ? "Loading..." : children}
      </button>
    );
  }
}
