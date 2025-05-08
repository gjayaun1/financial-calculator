import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TransactionTable from "./components/TransactionTable";
import Graph from "./components/Graph";
import GraphSettings from "./components/GraphSettings";
import "./App.css";

export type Transaction = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
};

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [groupBy, setGroupBy] = useState<"description" | "amount-range" | "category">("description");

  // Load from backend API
  useEffect(() => {
    fetch("http://localhost:3001/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Failed to fetch transactions", err));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <h1 className="title">Financial Calculator</h1>
        <div className="main-layout">
          <div className="left">
            <TransactionTable transactions={transactions} setTransactions={setTransactions} />
          </div>
          <div className="right">
            <div className="graph-box">
              <Graph transactions={transactions} groupBy={groupBy} />
            </div>
            <div className="graph-settings-box">
              <GraphSettings groupBy={groupBy} setGroupBy={setGroupBy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
