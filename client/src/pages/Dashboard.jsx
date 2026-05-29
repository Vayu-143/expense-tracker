import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import "./Dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
    transactionCount: 0
  });

  const [recentTransactions, setRecentTransactions] =
    useState([]);

  const [budget] = useState(5000);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const dashboardRes =
        await API.get("/dashboard");

      setStats(dashboardRes.data);

      const transactionRes =
        await API.get("/transactions");

      setRecentTransactions(
        transactionRes.data.slice(0, 5)
      );

    } catch (error) {
      console.log(error);
    }
  };

  const chartData = [
    {
      name: "Income",
      value: stats.totalIncome
    },
    {
      name: "Expense",
      value: stats.totalExpense
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>Dashboard Overview</h1>

        {/* Cards */}

        <div className="summary-container">

          <div className="card balance">
            <h3>💰 Balance</h3>
            <h2>₹ {stats.balance}</h2>
          </div>

          <div className="card income">
            <h3>📈 Income</h3>
            <h2>₹ {stats.totalIncome}</h2>
          </div>

          <div className="card expense">
            <h3>📉 Expense</h3>
            <h2>₹ {stats.totalExpense}</h2>
          </div>

          <div className="card transactions">
            <h3>📋 Transactions</h3>
            <h2>{stats.transactionCount}</h2>
          </div>

        </div>

        {/* Budget Warning */}

        {stats.totalExpense > budget && (

          <div className="warning">
            ⚠ Budget Limit Exceeded
          </div>

        )}

        {/* Pie Chart */}

        <div className="chart-card">

          <h2>Income vs Expense</h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >

                {chartData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Recent Transactions */}

        <div className="recent-section">

          <h2>Recent Transactions</h2>

          <table className="recent-table">

            <thead>

              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>

            </thead>

            <tbody>

              {recentTransactions.map((item) => (

                <tr key={item._id}>

                  <td>{item.type}</td>

                  <td>{item.category}</td>

                  <td>₹ {item.amount}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Dashboard;