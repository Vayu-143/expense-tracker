import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">

      <h1 className="logo">
        Expense Tracker
      </h1>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/transactions">
          Transactions
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;