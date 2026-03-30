import Badge from "./Badge";

const toneMap = {
  gold: "gold",
  blue: "blue",
  green: "green",
  slate: "slate",
};

// This shows access rules for each role.
export default function AccessMatrix({ rows }) {
  return (
    <div className="matrix-grid">
      {rows.map((row) => (
        <article className="matrix-card" key={row.role}>
          <Badge tone={toneMap[row.color] || "slate"}>{row.role}</Badge>
          <p>{row.access}</p>
        </article>
      ))}
    </div>
  );
}
