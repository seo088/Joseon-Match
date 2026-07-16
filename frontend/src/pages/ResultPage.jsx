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

  const goHome = () => {
    window.localStorage.removeItem("joseon-match:answers");
    window.localStorage.removeItem("joseon-match:result");
    window.location.assign("/");
  };

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
          <button className="secondary-button" onClick={goHome} type="button">
            홈화면으로
          </button>
        </div>
      </section>
    </main>
  );
}
