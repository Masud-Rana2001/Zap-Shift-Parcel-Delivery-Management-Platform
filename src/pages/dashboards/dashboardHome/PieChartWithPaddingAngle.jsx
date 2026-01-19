import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip, Cell } from "recharts";

const COLORS = ["#4F46E5", "#FFBB28", "#00C49F", "#A5B4FC", "#FF8042"];

export default function ParcelPieChart({ parcels = [] }) {
  const data = parcels.map((parcel, idx) => ({
    name: formatStatus(parcel._id),
    value: parcel.count,
    fill: COLORS[idx % COLORS.length],
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-5 bg-white shadow-md rounded-xl w-full max-w-[600px] h-[380px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          {/* Tooltip */}
          <Tooltip
            formatter={(value, name) => [`${value} Parcels`, name]}
            contentStyle={{ borderRadius: "10px" }}
          />

          {/* Legend */}
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
          />

          {/* Half Pie Chart (Arc Chart) */}
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}    // Start from 180°
            endAngle={0}        // End at 0° → Half circle
            cx="50%"
            cy="90%"           
            outerRadius="80%"
            innerRadius="55%"   
            paddingAngle={3}
            cornerRadius={8}
            isAnimationActive={true}
            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>

          {/* Center Text */}
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            className="text-lg font-semibold fill-gray-700"
          >
            Total: {total}
          </text>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatStatus(status) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
