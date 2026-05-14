import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#355872", "#7AAACE", "#9CD5FF", "#F7F8F0"];

const MiniBarChart = ({ title, data = [], darkMode = false }) => {
  const cardBg = darkMode
    ? "bg-[#111827] border-gray-700"
    : "bg-white border-gray-200";

  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textSub = darkMode ? "text-gray-300" : "text-gray-500";

  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);

  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${cardBg}`}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className={`text-lg font-semibold ${textMain}`}>{title}</h3>
          <p className={`text-sm mt-1 ${textSub}`}>
            Visual performance overview
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#9CD5FF] text-[#355872] text-xs font-semibold">
          Chart
        </span>
      </div>

      <div className="h-[190px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="label"
              tick={{ fill: darkMode ? "#D1D5DB" : "#4B5563", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: darkMode ? "#D1D5DB" : "#4B5563", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#111827" : "#ffffff",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#355872"
              strokeWidth={4}
              dot={{ r: 5, fill: "#7AAACE", strokeWidth: 2, stroke: "#355872" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-5 items-center">
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius={38}
                outerRadius={60}
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#111827" : "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  color: darkMode ? "#ffffff" : "#111827",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className={`text-sm ${textSub}`}>{item.label}</span>
              </div>

              <span className={`text-sm font-semibold ${textMain}`}>
                {item.value}%
              </span>
            </div>
          ))}

          <div
            className={`pt-3 border-t text-sm ${
              darkMode ? "border-gray-700 text-gray-300" : "border-gray-100 text-gray-500"
            }`}
          >
            Total indicators: <span className={textMain}>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniBarChart;