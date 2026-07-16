import ResultCard from "../components/ResultCard.jsx";

export default function ResultPage({ onRestart, result }) {
  return (
    <main className="app-shell">
      <section className="result-layout">
        <ResultCard result={result} />
        <div className="test-actions">
          <button className="primary-button" onClick={onRestart} type="button">
            다시 검사하기
          </button>
        </div>
      </section>
    </main>
  );
}
