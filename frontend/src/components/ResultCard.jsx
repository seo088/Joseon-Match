import TraitChart from "./TraitChart.jsx";

export default function ResultCard({ result }) {
  const initials = result.figure.name.slice(0, 2);

  return (
    <article className="result-card paper">
      <div className="result-top">
        <div className="result-image">
          <img alt="" src={result.figure.image} onError={(event) => event.currentTarget.remove()} />
          <span>{initials}</span>
        </div>
        <div>
          <p className="eyebrow">최종 방목 결과</p>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
        </div>
      </div>
      <div className="stamp-line">
        {result.topTraits.map((trait) => (
          <span key={trait}>{trait}</span>
        ))}
      </div>
      <ul className="strength-list">
        {result.strengths.map((strength) => (
          <li key={strength}>{strength}</li>
        ))}
      </ul>
      <TraitChart scores={result.scores} />
      <p>
        <strong>현대식 조언:</strong> {result.advice}
      </p>
    </article>
  );
}
