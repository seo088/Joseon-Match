import { Sparkles } from "lucide-react";

export default function MainPage({ onStart }) {
  return (
    <main className="app-shell">
      <section className="main-layout hero">
        <h1>Joseon Match</h1>
        <p>
          지금의 고민과 성향을 조선시대 인물과 직업군에 비춰 봅니다. 당신은 장영실형 발명가일까요,
          저잣거리의 전기수일까요?
        </p>
        <button className="primary-button" onClick={onStart} type="button">
          <Sparkles size={18} /> 테스트 시작
        </button>
      </section>
    </main>
  );
}
