import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Transactions.css";

import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Transactions() {

  const [transactions, setTransactions] = useState([]);

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 5;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTransaction = (item) => {

    setType(item.type);
    setCategory(item.category);
    setAmount(item.amount);
    setDescription(item.description);

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editId) {
      await API.put(
        `/transactions/${editId}`,
        {
          type,
          category,
          amount,
          description,
          date: new Date(),
        }
      );

      toast.success("Transaction Updated");
      setEditId(null);

    } else {
      await API.post(
        "/transactions",
        {
          type,
          category,
          amount,
          description,
          date: new Date(),
        }
      );

      toast.success("Transaction Added");
    }

    fetchTransactions();

    setType("expense");
    setCategory("");
    setAmount("");
    setDescription("");

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  const deleteTransaction = async (id) => {

    try {

      await API.delete(
        `/transactions/${id}`
      );

      toast.error(
        "Transaction Deleted"
      );

      fetchTransactions();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete Failed"
      );
    }
  };

  const exportToExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        transactions
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Transactions"
    );

    const excelBuffer =
      XLSX.write(
        workbook,
        {
          bookType: "xlsx",
          type: "array"
        }
      );

    const fileData =
      new Blob([excelBuffer]);

    saveAs(
      fileData,
      "transactions.xlsx"
    );
  };

  const filteredTransactions =
    transactions.filter((item) => {

      const matchesSearch =
        item.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter
          ? item.type === filter
          : true;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  const indexOfLast =
    currentPage * perPage;

  const indexOfFirst =
    indexOfLast - perPage;

  const currentTransactions =
    filteredTransactions.slice(
      indexOfFirst,
      indexOfLast
    );

  return (
    <>
      <Navbar />

      <div className="transactions-page">

        <h1>Transactions</h1>

        <form
          className="transaction-form"
          onSubmit={handleSubmit}
        >

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <button type="submit">
            {editId
              ? "Update Transaction"
              : "Add Transaction"}
          </button>

        </form>

        <div className="filter-section">

          <input
            type="text"
            placeholder="Search Category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="">
              All
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>

          </select>

        </div>

        <button
          className="export-btn"
          onClick={exportToExcel}
        >
          Export Excel
        </button>

        <table className="transaction-table">

          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {currentTransactions.map((item) => (

              <tr key={item._id}>

                <td>{item.type}</td>

                <td>{item.category}</td>

                <td>₹ {item.amount}</td>

                <td>{item.description}</td>

                <td>
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editTransaction(item)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTransaction(item._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Prev
          </button>

          <span>
            Page {currentPage}
          </span>

          <button
            disabled={
              indexOfLast >=
              filteredTransactions.length
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}
export default Transactions;