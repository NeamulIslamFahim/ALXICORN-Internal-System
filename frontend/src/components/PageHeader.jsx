// Simple reusable page header.
export default function PageHeader({ title, action, note }) {
  return (
    <div className="page-head">
      <div>
        <p className="eyebrow">User system</p>
        <h2>{title}</h2>
        {note ? <p className="page-note">{note}</p> : null}
      </div>
      {action}
    </div>
  );
}
