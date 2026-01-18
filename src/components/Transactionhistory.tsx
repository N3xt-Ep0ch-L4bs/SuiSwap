import { useState } from "react";

interface Transaction {
  date: string;
  pair: string;
  input: string;
  output: string;
  txHash: string;
  status: "Success" | "Failed" | "Pending";
}

export default function TransactionHistory() {
  const [transactions] = useState<Transaction[]>([
    { date: "12 Oct 2025", pair: "SUI → WAL", input: "10.00 SUI", output: "9.98 WAL", txHash: "0x9f32...12a5", status: "Success" },
    { date: "12 Oct 2025", pair: "WAL → IKA", input: "50.00 WAL", output: "50.12 SUI", txHash: "0x9f32...12a5", status: "Failed" },
    { date: "12 Oct 2025", pair: "WACKO → WAL", input: "5.00 SUI", output: "4.96 WAL", txHash: "0x9f32...12a5", status: "Pending" },
    { date: "12 Oct 2025", pair: "SUI → IKA", input: "100 WAL", output: "99.81 SUI", txHash: "0x9f32...12a5", status: "Success" },
  ]);

  const statusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Success": return "bg-green-100 text-green-800";
      case "Failed": return "bg-red-100 text-red-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "";
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Date</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Pair (From → To)</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Input</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Output</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Tx Hash</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {transactions.map((tx, index) => (
              <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <td className="px-4 py-3">{tx.date}</td>
                <td className="px-4 py-3">{tx.pair}</td>
                <td className="px-4 py-3">{tx.input}</td>
                <td className="px-4 py-3">{tx.output}</td>
                <td className="px-4 py-3">{tx.txHash}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
