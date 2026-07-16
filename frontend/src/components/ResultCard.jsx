import FigureAvatar from "./FigureAvatar.jsx";
import TraitChart from "./TraitChart.jsx";

export default function ResultCard({ result }) {
  const initials = result.figure.name.slice(0, 2);
  const topTraitDetails = result.topTraitDetails ?? [];
  const topTraitIds = topTraitDetails.map((trait) => trait.id);
  const topTraitLabels = topTraitDetails.length ? topTraitDetails.map((trait) => trait.label) : result.topTraits;
  const summary = result.personalitySummary ?? [result.description];
  const strengths = result.personalizedStrengths ?? result.strengths;
  const workStyle = result.workStyle ?? "현재 응답에서 드러난 강점을 바탕으로 상황에 맞게 일을 진행하는 편입니다.";
  const relationshipStyle = result.relationshipStyle ?? "상대와 상황을 살피며 적절한 방식으로 관계를 이어가는 편입니다.";
  const decisionStyle = result.decisionStyle ?? "여러 기준을 함께 고려하며 목적에 맞는 선택을 하려 합니다.";
  const caution = result.caution ?? "한 가지 기준에만 치우치지 않도록 상황을 한 번 더 살펴보면 좋습니다.";
  const disclaimer =
    result.disclaimer ??
    "본 결과는 사용자의 선택을 바탕으로 구성된 오락 및 자기 탐색용 콘텐츠이며, 전문적인 심리검사나 진단을 목적으로 하지 않습니다.";

  return (
    <article className="result-card paper">
      <div className="result-top">
        <FigureAvatar figureId={result.figure.id} image={result.figure.image} label={initials} size="result" />
        <div>
          <p className="eyebrow">최종 매칭 결과</p>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
          <div className="stamp-line">
            {topTraitLabels.map((trait) => (
              <span key={trait}>{trait}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="result-section">
        <h3>답변으로 해석해 본 당신의 성향</h3>
        <div className="summary-list">
          {summary.map((sentence) => (
            <p key={sentence}>{sentence}</p>
          ))}
        </div>
      </section>

      <section className="result-grid">
        <div className="result-section compact">
          <h3>일할 때의 당신</h3>
          <p>{workStyle}</p>
        </div>
        <div className="result-section compact">
          <h3>사람들과 있을 때</h3>
          <p>{relationshipStyle}</p>
        </div>
        <div className="result-section compact">
          <h3>선택의 순간에는</h3>
          <p>{decisionStyle}</p>
        </div>
      </section>

      <section className="result-section">
        <h3>이런 점이 강점이에요</h3>
        <ul className="strength-list">
          {strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
      </section>

      <section className="result-section caution-card">
        <h3>이럴 때는 한 번 더 살펴보세요</h3>
        <p>{caution}</p>
      </section>

      <section className="result-section">
        <h3>성향 점수</h3>
        <TraitChart scores={result.scores} topTraitIds={topTraitIds} />
      </section>

      <section className="result-section advice-card">
        <h3>현대식 조언</h3>
        <p>{result.modernAdvice ?? result.advice}</p>
      </section>

      <p className="result-disclaimer">{disclaimer}</p>
    </article>
  );
}
