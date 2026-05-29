import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>Expense Tracker</h1>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?
          <Link to="/register">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;