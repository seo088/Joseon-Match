import { Brush, ScrollText } from "lucide-react";
import FigureAvatar from "../components/FigureAvatar.jsx";

const heroFigures = [
  { id: "shin-saimdang", image: "/images/figures/shin-saimdang.png", label: "신사임당" },
  { id: "jang-yeongsil", image: "/images/figures/jang-yeongsil.png", label: "장영실" },
  { id: "yi-sunsin", image: "/images/figures/yi-sunsin.png", label: "이순신" },
  { id: "jeong-dojeon", image: "/images/figures/jeong-dojeon.png", label: "정도전" }
];

export default function MainPage({ onStart }) {
  return (
    <main className="app-shell">
      <section className="main-layout story-hero">
        <div className="knot" />
        <div className="seal">試</div>
        <p className="eyebrow">
          <ScrollText size={16} /> 조선 성향 문답지
        </p>
        <h1>당신이 조선시대에 태어났다면?</h1>
        <p>열다섯 장의 짧은 문답을 지나면, 당신의 숨은 결을 닮은 조선시대 인물과 직업이 붉은 인장처럼 찍혀 나옵니다.</p>
        <div className="hero-figures" aria-hidden="true">
          {heroFigures.map((figure, index) => (
            <FigureAvatar
              figureId={figure.id}
              image={figure.image}
              key={figure.id}
              label={figure.label}
              size={index === 1 || index === 3 ? "large" : "small"}
            />
          ))}
        </div>
        <button className="primary-button" onClick={onStart} type="button">
          <Brush size={18} /> 답안지 펼치기
        </button>
      </section>
    </main>
  );
}
