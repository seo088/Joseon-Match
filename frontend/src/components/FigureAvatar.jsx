const palette = {
  "jang-yeongsil": ["#d9c7a8", "#f3ead8", "#2f3a35", "#b33a2c"],
  "shin-saimdang": ["#d6c3a0", "#f7efe2", "#2e2b27", "#4e9c86"],
  "yi-sunsin": ["#c7b08a", "#2c3035", "#c43a2f", "#d7a935"],
  "jeong-dojeon": ["#d3bd96", "#d83e35", "#232323", "#f2c94c"],
  default: ["#d7c4a1", "#f5ead7", "#2f2a25", "#7d9b87"]
};

export default function FigureAvatar({ figureId = "default", image, label, size = "large" }) {
  const colors = palette[figureId] ?? palette.default;

  return (
    <div className={`figure-avatar ${size}`}>
      {image ? <img alt="" src={image} onError={(event) => event.currentTarget.remove()} /> : null}
      <svg aria-hidden="true" viewBox="0 0 160 160">
        <circle cx="80" cy="80" fill={colors[0]} r="78" />
        <circle cx="80" cy="57" fill="#f1b995" r="22" />
        <path d="M54 48c5-20 47-20 52 2-12-7-34-7-52-2Z" fill={colors[2]} />
        <path d="M45 132c6-31 64-38 76-2-17 16-56 17-76 2Z" fill={colors[1]} />
        <path d="M60 101c12 14 29 14 40 0" fill="none" stroke={colors[3]} strokeWidth="8" />
        <circle cx="70" cy="62" fill="#2b1b13" r="2.8" />
        <circle cx="91" cy="62" fill="#2b1b13" r="2.8" />
        <path d="M72 75c5 4 12 4 17 0" fill="none" stroke="#7d4b35" strokeLinecap="round" strokeWidth="3" />
        {figureId === "yi-sunsin" ? <path d="M55 94h50l-8-25H63Z" fill={colors[3]} opacity="0.95" /> : null}
        {figureId === "jeong-dojeon" ? <path d="M52 40h56v10H52zM62 25h36v16H62z" fill={colors[2]} /> : null}
      </svg>
      <span>{label}</span>
    </div>
  );
}
