const Transaction = require("../models/Transaction");

exports.getDashboardData = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      transactionCount: transactions.length
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};