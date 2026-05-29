import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend
} from "recharts";

function ExpenseChart({ income, expense }) {

  const data = [
    {
      name: "Income",
      value: income
    },
    {
      name: "Expense",
      value: expense
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  return (

    <PieChart
      width={400}
      height={300}
    >

      <Pie
        data={data}
        dataKey="value"
        outerRadius={100}
        label
      >

        {data.map((entry, index) => (

          <Cell
            key={index}
            fill={COLORS[index]}
          />

        ))}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>
  );
}

export default ExpenseChart;