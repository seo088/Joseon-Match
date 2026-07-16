import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTraits } from "../services/mcpService.js";

export default function TraitChart({ scores }) {
  const data = getTraits().map((trait) => ({
    name: trait.name,
    score: scores[trait.id] ?? 0
  }));

  return (
    <div className="trait-chart" aria-label="성향 점수 그래프">
      <ResponsiveContainer height={280} width="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 28, right: 16 }}>
          <CartesianGrid horizontal={false} stroke="#e6d8bd" />
          <XAxis allowDecimals={false} domain={[0, 12]} type="number" />
          <YAxis dataKey="name" type="category" width={76} />
          <Tooltip />
          <Bar dataKey="score" fill="#9d2f22" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
