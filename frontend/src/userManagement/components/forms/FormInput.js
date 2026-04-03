import React, { Component } from "react";

export default class FormInput extends Component {
  render() {
    const { label, type = "text", value, onChange, placeholder = "", required = false, disabled = false, rows, autoComplete } = this.props;

    return (
      <label className="form-field">
        {label ? <span>{label}</span> : null}
        <input
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
