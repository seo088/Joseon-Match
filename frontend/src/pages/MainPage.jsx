import { Brush, ScrollText } from "lucide-react";

export default function MainPage({ onStart }) {
  return (
    <main className="app-shell">
      <section className="main-layout paper hero">
        <div className="seal">試</div>
        <p className="eyebrow">
          <ScrollText size={16} /> 조선 성향 문답지
        </p>
        <h1>당신이 조선시대에 태어났다면?</h1>
        <p>
          열다섯 장의 짧은 문답을 지나면, 당신의 숨은 결을 닮은 조선시대 인물과 직업이 붉은 인장처럼
          찍혀 나옵니다.
        </p>
        <button className="primary-button" onClick={onStart} type="button">
          <Brush size={18} /> 답안지 펼치기
        </button>
      </section>
    </main>
  );
}
