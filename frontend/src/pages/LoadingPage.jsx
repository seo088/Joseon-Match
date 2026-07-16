import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { runJoseonMatch } from "../services/mcpService.js";

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const answers = JSON.parse(window.localStorage.getItem("joseon-match:answers") ?? "{}");
      const result = runJoseonMatch(answers);
      window.localStorage.setItem("joseon-match:result", JSON.stringify(result));
      navigate("/result");
    }, 650);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="app-shell">
      <section className="loading paper">
        <div className="seal large">合</div>
        <p>답안을 걷어 조선의 인물첩과 대조하는 중...</p>
      </section>
    </main>
  );
}
