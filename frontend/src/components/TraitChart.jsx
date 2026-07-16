import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTraits } from "../services/mcpService.js";

export default function TraitChart({ scores, topTraitIds = [] }) {
  const [isCompact, setIsCompact] = useState(() => window.matchMedia("(max-width: 430px)").matches);
  const data = getTraits().map((trait) => ({
    id: trait.id,
    name: trait.name,
    score: scores[trait.id] ?? 0,
    isTop: topTraitIds.includes(trait.id)
  }));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 430px)");
    const updateCompactMode = () => setIsCompact(mediaQuery.matches);

    updateCompactMode();
    mediaQuery.addEventListener("change", updateCompactMode);
    return () => mediaQuery.removeEventListener("change", updateCompactMode);
  }, []);

  return (
    <div className="trait-chart" aria-label="성향 점수 그래프">
      <ResponsiveContainer height={isCompact ? 320 : 280} width="100%">
        <BarChart data={data} layout="vertical" margin={isCompact ? { left: 0, right: 22 } : { left: 28, right: 16 }}>
          <CartesianGrid horizontal={false} stroke="#e6d8bd" />
          <XAxis allowDecimals={false} domain={[0, 10]} tick={{ fontSize: isCompact ? 12 : 14 }} type="number" />
          <YAxis dataKey="name" tick={{ fontSize: isCompact ? 13 : 14 }} type="category" width={isCompact ? 58 : 76} />
          <Tooltip />
          <Bar dataKey="score" radius={[0, 6, 6, 0]}>
            {data.map((entry) => (
              <Cell fill={entry.isTop ? "#9d2f22" : "#c49a63"} key={entry.id} />
            ))}
            <LabelList dataKey="score" fontSize={isCompact ? 12 : 14} position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-note">점수는 좋고 나쁨이 아니라, 이번 응답에서 어떤 판단 기준이 더 자주 선택되었는지를 보여줍니다.</p>
    </div>
  );
}
