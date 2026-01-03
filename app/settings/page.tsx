"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCurrentUser,
  useUserSettings,
  useUpdateUserSettings,
} from "@/hooks";
import { showSuccess, showError } from "@/utils";
import { ArrowLeft, Save, Sparkles } from "lucide-react";

export default function Settings() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: userSettings, isLoading: settingsLoading } = useUserSettings(
    user?.id
  );
  const updateSettings = useUpdateUserSettings(user?.id || "");

  const [settings, setSettings] = useState({
    anime_tracker_enabled: true,
    daily_inspiration_enabled: true,
    spending_tracker_enabled: true,
    todo_list_enabled: true,
    health_tracker_enabled: true,
    mini_games_enabled: true,
  });

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/");
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (userSettings) {
      setSettings({
        anime_tracker_enabled: userSettings.anime_tracker_enabled,
        daily_inspiration_enabled: userSettings.daily_inspiration_enabled,
        spending_tracker_enabled: userSettings.spending_tracker_enabled,
        todo_list_enabled: userSettings.todo_list_enabled,
        health_tracker_enabled: userSettings.health_tracker_enabled,
        mini_games_enabled: userSettings.mini_games_enabled,
      });
    }
  }, [userSettings]);

  const saveSettings = () => {
    updateSettings.mutate(settings, {
      onSuccess: () => {
        showSuccess("Settings saved successfully!");
        router.push("/dashboard");
      },
      onError: () => {
        showError("Failed to save settings");
      },
    });
  };

  const loading = userLoading || settingsLoading;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950">
      <header className="border-b border-orange-200 dark:border-amber-800/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 font-medium text-gray-700 dark:text-gray-200 transition-all hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500">
              <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl p-6">
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ring-1 ring-indigo-100 dark:ring-indigo-900/50">
          <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
            Widget Preferences
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Choose which widgets you want to see on your dashboard
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border-2 border-orange-100 dark:border-amber-800/30 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800/50 dark:to-amber-950/20 p-5 transition-all hover:border-orange-300 dark:hover:border-amber-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:scale-[1.01]">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Anime Tracker
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Track your anime watching progress
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.anime_tracker_enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      anime_tracker_enabled: e.target.checked,
                    })
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 dark:peer-focus:ring-amber-900"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border-2 border-orange-100 dark:border-amber-800/30 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800/50 dark:to-amber-950/20 p-5 transition-all hover:border-orange-300 dark:hover:border-amber-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:scale-[1.01]">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Daily Inspiration
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get motivational quotes and fun facts
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.daily_inspiration_enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      daily_inspiration_enabled: e.target.checked,
                    })
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 dark:peer-focus:ring-amber-900"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border-2 border-orange-100 dark:border-amber-800/30 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800/50 dark:to-amber-950/20 p-5 transition-all hover:border-orange-300 dark:hover:border-amber-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:scale-[1.01]">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Spending Tracker
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Monitor your expenses and budget goals
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.spending_tracker_enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      spending_tracker_enabled: e.target.checked,
                    })
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 dark:peer-focus:ring-amber-900"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border-2 border-orange-100 dark:border-amber-800/30 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800/50 dark:to-amber-950/20 p-5 transition-all hover:border-orange-300 dark:hover:border-amber-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:scale-[1.01]">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  To-Do List
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage your tasks and priorities
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.todo_list_enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      todo_list_enabled: e.target.checked,
                    })
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 dark:peer-focus:ring-amber-900"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border-2 border-orange-100 dark:border-amber-800/30 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800/50 dark:to-amber-950/20 p-5 transition-all hover:border-orange-300 dark:hover:border-amber-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:scale-[1.01]">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Health Tracker
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Log your daily health metrics
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.health_tracker_enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      health_tracker_enabled: e.target.checked,
                    })
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 dark:peer-focus:ring-amber-900"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border-2 border-orange-100 dark:border-amber-800/30 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800/50 dark:to-amber-950/20 p-5 transition-all hover:border-orange-300 dark:hover:border-amber-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:scale-[1.01]">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Mini Games & Timer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pomodoro timer and games for breaks
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.mini_games_enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      mini_games_enabled: e.target.checked,
                    })
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 dark:peer-focus:ring-amber-900"></div>
              </label>
            </div>
          </div>

          <button
            onClick={saveSettings}
            disabled={updateSettings.isPending}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 disabled:opacity-50"
          >
            <Save size={20} />
            {updateSettings.isPending ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </main>
    </div>
  );
}
