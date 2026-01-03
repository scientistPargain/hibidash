"use client";

import { useState } from "react";
import { useSpendingList, useAddSpending, useTotalSpending } from "@/hooks";
import { showSuccess, showError, formatCurrency } from "@/utils";
import { Plus } from "lucide-react";

export default function SpendingTracker({ userId }: { userId: string }) {
  const { data: entries = [], isLoading } = useSpendingList(userId);
  const addEntry = useAddSpending(userId);
  const totalSpent = useTotalSpending(userId);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const handleAdd = () => {
    if (!formData.amount || !formData.category) {
      showError("Please fill in amount and category");
      return;
    }

    addEntry.mutate(
      {
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
      },
      {
        onSuccess: () => {
          setFormData({ amount: "", category: "", description: "" });
          setShowForm(false);
          showSuccess("Expense added!");
        },
        onError: (error) => {
          showError(error.message || "Failed to add expense");
        },
      }
    );
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">
          Spending Tracker
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-lg hover:shadow-xl p-2 text-white transition hover:bg-indigo-700"
        >
          <Plus size={20} />
        </button>
      </div>

      {showForm && (
        <div className="mb-4 space-y-2 rounded-lg border p-3">
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full rounded-md border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Category (e.g., Food, Transport)"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full rounded-md border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full rounded-md border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={addEntry.isPending}
            className="w-full rounded-md bg-gradient-to-r from-orange-500 to-amber-600 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {addEntry.isPending ? "Adding..." : "Add Expense"}
          </button>
        </div>
      )}

      <div className="mb-4 rounded-lg bg-indigo-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">
            Total Spent
          </span>
          <span className="text-2xl font-bold text-indigo-600">
            {formatCurrency(totalSpent)}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <div>
                <p className="font-medium">{entry.category}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {entry.description}
                </p>
              </div>
              <span className="font-semibold text-indigo-600">
                {formatCurrency(entry.amount)}
              </span>
            </div>
          ))}

          {entries.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No expenses logged yet
            </p>
          )}
        </div>
      )}
    </div>
  );
}
