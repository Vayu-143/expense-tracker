import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaClipboardList
} from "react-icons/fa";

import "./Profile.css";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
    transactionCount: 0,
  });

  useEffect(() => {
    fetchProfileStats();
  }, []);

  const fetchProfileStats = async () => {
    try {
      const res = await API.get("/dashboard");

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <h1>My Profile</h1>

        <div className="profile-card">

          <div className="profile-header">

            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>

              <h2>
                {user?.name}
              </h2>

              <p>
                {user?.email}
              </p>

              <p className="joined-date">
                Joined: May 2025
              </p>

            </div>

          </div>

          <div className="profile-stats">

            <div className="stat-box">

              <h3>
                <FaWallet />
                {" "}Total Savings
              </h3>

              <h2>
                ₹ {stats.balance}
              </h2>

            </div>

            <div className="stat-box">

              <h3>
                <FaArrowUp />
                {" "}Total Income
              </h3>

              <h2>
                ₹ {stats.totalIncome}
              </h2>

            </div>

            <div className="stat-box">

              <h3>
                <FaArrowDown />
                {" "}Total Expense
              </h3>

              <h2>
                ₹ {stats.totalExpense}
              </h2>

            </div>

            <div className="stat-box">

              <h3>
                <FaClipboardList />
                {" "}Transactions
              </h3>

              <h2>
                {stats.transactionCount}
              </h2>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;