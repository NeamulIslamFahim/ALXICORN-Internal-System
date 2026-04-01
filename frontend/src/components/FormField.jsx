// Reusable field wrapper for forms.
export default function FormField({ label, children }) {
  // Keep label and input grouped together in one place.
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
