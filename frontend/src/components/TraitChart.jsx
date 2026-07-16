export default function TraitChart({ scores }) {
  return (
    <div className="trait-chart">
      {Object.entries(scores).map(([trait, score]) => (
        <div className="trait-row" key={trait}>
          <strong>{trait}</strong>
          <div className="trait-bar">
            <span style={{ width: `${Math.min(score * 20, 100)}%` }} />
          </div>
          <span>{score}</span>
        </div>
      ))}
    </div>
  );
}
