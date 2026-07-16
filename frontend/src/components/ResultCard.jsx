import TraitChart from "./TraitChart.jsx";

export default function ResultCard({ result }) {
  const initials = result.figure.name.slice(0, 2);

  return (
    <article className="result-card">
      <div className="result-image">{initials}</div>
      <h2>{result.title}</h2>
      <p>{result.description}</p>
      <TraitChart scores={result.scores} />
      <p>
        <strong>현대식 조언:</strong> {result.advice}
      </p>
    </article>
  );
}
