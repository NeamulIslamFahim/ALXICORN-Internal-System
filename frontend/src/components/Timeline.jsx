// This shows recent system events in time order.
export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article key={item.title} className="timeline-item">
          <div className="timeline-time">{item.time}</div>
          <div>
            <strong>{item.title}</strong>
            <p>{item.meta}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
