const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load Environment Variables
dotenv.config();

// Database Connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Connect MongoDB
connectDB();

const app = express();

// ===========================
// Middleware
// ===========================
app.use(cors());
app.use(express.json());

// ===========================
// API Routes
// ===========================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Transaction Routes
app.use("/api/transactions", transactionRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

// ===========================
// Test Route
// ===========================
app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});