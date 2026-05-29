function SummaryCards({ data }) {
  return (
    <div className="summary-grid">

      <div className="card balance">
        <h3>Balance</h3>
        <h2>₹ {data.balance || 0}</h2>
      </div>

      <div className="card income">
        <h3>Total Income</h3>
        <h2>₹ {data.totalIncome || 0}</h2>
      </div>

      <div className="card expense">
        <h3>Total Expense</h3>
        <h2>₹ {data.totalExpense || 0}</h2>
      </div>

      <div className="card transactions">
        <h3>Transactions</h3>
        <h2>{data.transactionCount || 0}</h2>
      </div>

    </div>
  );
}

export default SummaryCards;