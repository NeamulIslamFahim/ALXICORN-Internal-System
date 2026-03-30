// Small label used all over the dashboard.
export default function Badge({ children, tone = "slate" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
