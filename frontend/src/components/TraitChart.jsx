import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTraits } from "../services/mcpService.js";

export default function TraitChart({ scores, topTraitIds = [] }) {
  const data = getTraits().map((trait) => ({
    id: trait.id,
    name: trait.name,
    score: scores[trait.id] ?? 0,
    isTop: topTraitIds.includes(trait.id)
  }));

  return (
    <div className="trait-chart" aria-label="성향 점수 그래프">
      <ResponsiveContainer height={280} width="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 28, right: 16 }}>
          <CartesianGrid horizontal={false} stroke="#e6d8bd" />
          <XAxis allowDecimals={false} domain={[0, 10]} type="number" />
          <YAxis dataKey="name" type="category" width={76} />
          <Tooltip />
          <Bar dataKey="score" radius={[0, 6, 6, 0]}>
            {data.map((entry) => (
              <Cell fill={entry.isTop ? "#9d2f22" : "#c49a63"} key={entry.id} />
            ))}
            <LabelList dataKey="score" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-note">점수는 좋고 나쁨이 아니라, 이번 응답에서 어떤 판단 기준이 더 자주 선택되었는지를 보여줍니다.</p>
    </div>
  );
}
