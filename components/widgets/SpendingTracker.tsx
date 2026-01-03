"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, DollarSign, TrendingUp } from "lucide-react";

interface SpendingEntry {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface SpendingGoal {
  id: string;
  category: string;
  monthly_limit: number;
}

export default function SpendingTracker({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<SpendingEntry[]>([]);
  const [goals, setGoals] = useState<SpendingGoal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: entriesData } = await supabase
      .from("spending_entries")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(10);

    const { data: goalsData } = await supabase
      .from("spending_goals")
      .select("*")
      .eq("user_id", userId);

    if (entriesData) setEntries(entriesData);
    if (goalsData) setGoals(goalsData);
  };

  const addEntry = async () => {
    if (!formData.amount || !formData.category) return;

    const { error } = await supabase.from("spending_entries").insert({
      user_id: userId,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: new Date().toISOString().split("T")[0],
    });

    if (!error) {
      setFormData({ amount: "", category: "", description: "" });
      setShowForm(false);
      loadData();
    }
  };

  const getTotalSpent = () => {
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">Spending Tracker</h2>
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
            onClick={addEntry}
            className="w-full rounded-md bg-gradient-to-r from-orange-500 to-amber-600 py-2 text-white transition hover:bg-indigo-700"
          >
            Add Expense
          </button>
        </div>
      )}

      <div className="mb-4 rounded-lg bg-indigo-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">Total Spent</span>
          <span className="text-2xl font-bold text-indigo-600">
            ${getTotalSpent().toFixed(2)}
          </span>
        </div>
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-lg border p-2"
          >
            <div>
              <p className="font-medium">{entry.category}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{entry.description}</p>
            </div>
            <span className="font-semibold text-indigo-600">
              ${entry.amount}
            </span>
          </div>
        ))}

        {entries.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No expenses logged yet</p>
        )}
      </div>
    </div>
  );
}
