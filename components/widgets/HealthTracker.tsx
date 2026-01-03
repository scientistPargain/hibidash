"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Activity, Plus } from "lucide-react";

interface HealthMetric {
  id: string;
  date: string;
  steps: number | null;
  sleep_hours: number | null;
  water_intake: number | null;
}

export default function HealthTracker({ userId }: { userId: string }) {
  const [todayMetric, setTodayMetric] = useState<HealthMetric | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    steps: "",
    sleep_hours: "",
    water_intake: "",
  });

  useEffect(() => {
    loadTodayMetric();
  }, []);

  const loadTodayMetric = async () => {
    const today = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("health_metrics")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    if (data) {
      setTodayMetric(data);
      setFormData({
        steps: data.steps?.toString() || "",
        sleep_hours: data.sleep_hours?.toString() || "",
        water_intake: data.water_intake?.toString() || "",
      });
    }
  };

  const saveMetric = async () => {
    const today = new Date().toISOString().split("T")[0];

    const metricData = {
      user_id: userId,
      date: today,
      steps: formData.steps ? parseInt(formData.steps) : null,
      sleep_hours: formData.sleep_hours
        ? parseFloat(formData.sleep_hours)
        : null,
      water_intake: formData.water_intake
        ? parseFloat(formData.water_intake)
        : null,
    };

    if (todayMetric) {
      await supabase
        .from("health_metrics")
        .update(metricData)
        .eq("id", todayMetric.id);
    } else {
      await supabase.from("health_metrics").insert(metricData);
    }

    setShowForm(false);
    loadTodayMetric();
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">Health Tracker</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
        >
          <Plus size={20} />
        </button>
      </div>

      {showForm && (
        <div className="mb-4 space-y-2 rounded-lg border p-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Steps
            </label>
            <input
              type="number"
              placeholder="e.g., 8000"
              value={formData.steps}
              onChange={(e) =>
                setFormData({ ...formData, steps: e.target.value })
              }
              className="w-full rounded-md border px-3 py-2 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sleep (hours)
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="e.g., 7.5"
              value={formData.sleep_hours}
              onChange={(e) =>
                setFormData({ ...formData, sleep_hours: e.target.value })
              }
              className="w-full rounded-md border px-3 py-2 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Water (glasses)
            </label>
            <input
              type="number"
              placeholder="e.g., 8"
              value={formData.water_intake}
              onChange={(e) =>
                setFormData({ ...formData, water_intake: e.target.value })
              }
              className="w-full rounded-md border px-3 py-2 focus:border-red-500 focus:outline-none"
            />
          </div>

          <button
            onClick={saveMetric}
            className="w-full rounded-md bg-red-600 py-2 text-white transition hover:bg-red-700"
          >
            Save Today's Data
          </button>
        </div>
      )}

      <div className="space-y-3">
        <div className="rounded-lg bg-red-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">Steps</span>
            <span className="text-xl font-bold text-red-600">
              {todayMetric?.steps || 0}
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-red-600"
              style={{
                width: `${Math.min(
                  ((todayMetric?.steps || 0) / 10000) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-indigo-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">Sleep</span>
            <span className="text-xl font-bold text-indigo-600">
              {todayMetric?.sleep_hours || 0}h
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">Water</span>
            <span className="text-xl font-bold text-cyan-600">
              {todayMetric?.water_intake || 0} glasses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
