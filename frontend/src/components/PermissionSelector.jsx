import { PERMISSION_OPTIONS } from "../context/AppContext";

// This shows permission checkboxes for Admin users.
export default function PermissionSelector({ value, onChange, disabled = false }) {
  function togglePermission(permission) {
    if (disabled) {
      return;
    }

    const nextValue = value.includes(permission)
      ? value.filter((item) => item !== permission)
      : [...value, permission];

    onChange(nextValue);
  }

  return (
    <div className="permission-box">
      {PERMISSION_OPTIONS.map((permission) => (
        <label key={permission} className="permission-item">
          <input
            type="checkbox"
            checked={value.includes(permission)}
            onChange={() => togglePermission(permission)}
            disabled={disabled}
          />
          <span>{permission}</span>
        </label>
      ))}
    </div>
  );
}
