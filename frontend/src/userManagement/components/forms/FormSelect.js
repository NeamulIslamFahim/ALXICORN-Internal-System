import React, { Component } from "react";
import styles from "./forms.module.css";

// Standard select wrapper so field spacing and labels stay uniform.
export default class FormSelect extends Component {
  render() {
    const { label, value, onChange, options = [], disabled = false, required = false, className, selectClassName } = this.props;
    const wrapperClassName = [styles.formField, styles.fieldCard, className].filter(Boolean).join(" ");
    const controlClassName = [styles.select, selectClassName].filter(Boolean).join(" ");

    return (
      <label className={wrapperClassName}>
        {label ? <span className={styles.fieldLabel}>{label}</span> : null}
        <select className={controlClassName} value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} required={required}>
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
