import { useState } from "react";
import { Transaction } from "../App";

type Props = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
};

const TransactionTable = ({ transactions, setTransactions }: Props) => {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "Uncategorized",
    date: new Date().toISOString().split("T")[0],
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTransaction, setEditedTransaction] = useState({
    description: "",
    amount: "",
    category: "Uncategorized",
    date: new Date().toISOString().split("T")[0],
  });

  const addTransaction = () => {
    if (!newTransaction.description || isNaN(Number(newTransaction.amount))) return;

    const payload = {
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      date: newTransaction.date,
    };

    fetch("http://localhost:3001/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions((prev) => [
          ...prev,
          { id: data.id, ...payload },
        ]);
        setNewTransaction({
          description: "",
          amount: "",
          category: "Uncategorized",
          date: new Date().toISOString().split("T")[0],
        });
      })
      .catch((err) => console.error("Failed to add transaction", err));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="section-title">Transaction Table</div>

      <div className="p-2 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, amount: e.target.value })
          }
        />
        <select
          value={newTransaction.category}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, category: e.target.value })
          }
        >
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Uncategorized">Uncategorized</option>
        </select>
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, date: e.target.value })
          }
        />
        <button onClick={addTransaction}>Add</button>
      </div>

      <div>
        {transactions.map((t) => (
          <div key={t.id} className="transaction-row">
            {editingId === t.id ? (
              <div className="edit-row">
                <input
                  type="text"
                  value={editedTransaction.description}
                  onChange={(e) =>
                    setEditedTransaction({ ...editedTransaction, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editedTransaction.amount}
                  onChange={(e) =>
                    setEditedTransaction({ ...editedTransaction, amount: e.target.value })
                  }
                />
                <select
                  value={editedTransaction.category}
                  onChange={(e) =>
                    setEditedTransaction({ ...editedTransaction, category: e.target.value })
                  }
                >
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Salary">Salary</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Uncategorized">Uncategorized</option>
                </select>
                <input
                  type="date"
                  value={editedTransaction.date}
                  onChange={(e) =>
                    setEditedTransaction({ ...editedTransaction, date: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    setEditingId(null); // not hooked to backend edit yet
                  }}
                >
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="view-row">
                <div>
                  <strong>{t.description}</strong> (${t.amount}) – {t.category}
                  <div className="small-text">{t.date}</div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditingId(t.id);
                      setEditedTransaction({
                        description: t.description,
                        amount: t.amount.toString(),
                        category: t.category,
                        date: t.date,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
