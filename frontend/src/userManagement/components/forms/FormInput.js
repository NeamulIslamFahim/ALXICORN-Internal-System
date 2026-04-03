import React, { Component } from "react";
import styles from "./forms.module.css";

export default class FormInput extends Component {
  render() {
    const {
      label,
      type = "text",
      value,
      onChange,
      placeholder = "",
      required = false,
      disabled = false,
      autoComplete,
      className,
      inputClassName,
    } = this.props;
    const wrapperClassName = [styles.formField, styles.fieldCard, className].filter(Boolean).join(" ");
    const controlClassName = [styles.input, inputClassName].filter(Boolean).join(" ");

    return (
      <label className={wrapperClassName}>
        {label ? <span className={styles.fieldLabel}>{label}</span> : null}
        <input
          className={controlClassName}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </label>
    );
  }
}
