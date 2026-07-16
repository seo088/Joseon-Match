import { Navigate } from "react-router-dom";
import ResultCard from "../components/ResultCard.jsx";

function loadResult() {
  try {
    return JSON.parse(window.localStorage.getItem("joseon-match:result"));
  } catch {
    return null;
  }
}

export default function ResultPage({ onRestart }) {
  const result = loadResult();

  if (!result) {
    return <Navigate replace to="/" />;
  }

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
