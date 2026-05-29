const Transaction = require("../models/Transaction");

// Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Transaction Deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};