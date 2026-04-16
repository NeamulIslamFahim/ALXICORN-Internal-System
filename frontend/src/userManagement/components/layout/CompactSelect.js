import React from "react";
import pageStyles from "../../pages/pages.module.css";

export default function CompactSelect({ value, onChange, options = [] }) {
  return (
    <div className={pageStyles.selectWrap}>
      <select className={pageStyles.compactSelect} value={value} onChange={(event) => onChange?.(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
