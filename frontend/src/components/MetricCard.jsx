// One small summary card on the dashboard.
export default function MetricCard({ label, value, delta }) {
  return (
    <article className="metric-card">
      <p className="metric-label">{label}</p>
      <div className="metric-row">
        <h3>{value}</h3>
        <span className="metric-delta">{delta}</span>
      </div>
    </article>
  );
}
