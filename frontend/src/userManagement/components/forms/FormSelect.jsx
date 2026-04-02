import React, { Component } from "react";

export default class FormSelect extends Component {
  render() {
    const { label, value, onChange, options = [], disabled = false, required = false } = this.props;

    return (
      <label className="form-field">
        {label ? <span>{label}</span> : null}
        <select value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} required={required}>
          {options.map((option) => {
            if (typeof option === "string") {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }

            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </label>
    );
  }
}
