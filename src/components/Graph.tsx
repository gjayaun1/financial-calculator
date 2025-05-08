import { Transaction } from "../App";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  transactions: Transaction[];
  groupBy: "description" | "amount-range";
};

const Graph = ({ transactions, groupBy }: Props) => {
  let data: { category: string; amount: number }[] = [];

  if (groupBy === "description") {
    data = Object.values(
      transactions.reduce((acc, t) => {
        if (!acc[t.description]) {
          acc[t.description] = { category: t.description, amount: 0 };
        }
        acc[t.description].amount += t.amount;
        return acc;
      }, {} as Record<string, { category: string; amount: number }>)
    );
  } else if (groupBy === "amount-range") {
    const ranges = {
      "0-100": 0,
      "101-500": 0,
      "501-1000": 0,
      "1001+": 0,
    };

    transactions.forEach((t) => {
      const a = t.amount;
      if (a <= 100) ranges["0-100"] += a;
      else if (a <= 500) ranges["101-500"] += a;
      else if (a <= 1000) ranges["501-1000"] += a;
      else ranges["1001+"] += a;
    });

    data = Object.entries(ranges).map(([range, amount]) => ({
      category: range,
      amount,
    }));

    if (groupBy === "category") {
        data = Object.values(
          transactions.reduce((acc, t) => {
            if (!acc[t.category]) {
              acc[t.category] = { category: t.category, amount: 0 };
            }
            acc[t.category].amount += t.amount;
            return acc;
          }, {} as Record<string, { category: string; amount: number }>)
        );
      }
      
  }

  console.log("GRAPH DATA:", data);

  return (
    <div className="border border-blue-500 bg-white p-4" style={{ height: "300px", width: "100%" }}>
      <h2 className="text-lg mb-4 font-bold">Monthly Spending Graph</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-red-500">No data to display — check input or grouping</p>
      )}
    </div>
  );  
};

export default Graph;
