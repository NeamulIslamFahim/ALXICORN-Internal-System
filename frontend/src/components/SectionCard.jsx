// Reusable card layout for dashboard sections.
export default function SectionCard({ title, subtitle, children, action, ...props }) {
  return (
    <section className="section-card" {...props}>
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
