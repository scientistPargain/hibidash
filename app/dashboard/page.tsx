"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import AnimeTracker from "@/components/widgets/AnimeTracker";
import DailyInspiration from "@/components/widgets/DailyInspiration";
import SpendingTracker from "@/components/widgets/SpendingTracker";
import TodoList from "@/components/widgets/TodoList";
import HealthTracker from "@/components/widgets/HealthTracker";
import MiniGames from "@/components/widgets/MiniGames";
import { LogOut, Settings, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface UserSettings {
  anime_tracker_enabled: boolean;
  daily_inspiration_enabled: boolean;
  spending_tracker_enabled: boolean;
  todo_list_enabled: boolean;
  health_tracker_enabled: boolean;
  mini_games_enabled: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/");
      return;
    }
    setUser(user);

    // Load or create user settings
    const { data: userSettings, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error loading settings:", error);
      toast.error("Failed to load settings");
    } else if (!userSettings) {
      // Create default settings if they don't exist
      const { data: newSettings, error: createError } = await supabase
        .from("user_settings")
        .insert({
          user_id: user.id,
          anime_tracker_enabled: true,
          daily_inspiration_enabled: true,
          spending_tracker_enabled: true,
          todo_list_enabled: true,
          health_tracker_enabled: true,
          mini_games_enabled: true,
          layout: [],
        })
        .select()
        .single();

      if (createError) {
        console.error("Error creating settings:", createError);
      } else {
        setSettings(newSettings);
      }
    } else {
      setSettings(userSettings);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-orange-200 dark:border-orange-800 border-t-orange-600 dark:border-t-amber-400"></div>
          <p className="text-lg font-semibold text-amber-900 dark:text-amber-100">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950">
      {/* Header */}
      <header className="border-b border-orange-200 dark:border-amber-800/50 bg-gradient-to-r from-white/90 via-amber-50/90 to-orange-50/90 dark:from-gray-900/90 dark:via-amber-950/90 dark:to-orange-950/90 backdrop-blur-lg shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
              HibiDash
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => router.push("/settings")}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-4 py-2 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700"
            >
              <Settings size={18} />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border-2 border-orange-200 dark:border-amber-700/50 bg-white dark:bg-gray-800 px-4 py-2 font-medium text-orange-700 dark:text-amber-300 transition-all hover:border-red-400 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:scale-105"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
            Your Dashboard
          </h2>
          <p className="text-amber-700 dark:text-amber-300 font-medium">
            Track everything that matters to you
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {settings?.anime_tracker_enabled && (
            <div className="group rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-amber-950/20 p-6 shadow-xl ring-2 ring-orange-100 dark:ring-amber-900/30 transition-all hover:shadow-2xl hover:ring-orange-300 dark:hover:ring-amber-700/50 hover:-translate-y-2 hover:scale-[1.02]">
              <AnimeTracker userId={user!.id} />
            </div>
          )}

          {settings?.daily_inspiration_enabled && (
            <div className="group rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-amber-950/20 p-6 shadow-xl ring-2 ring-orange-100 dark:ring-amber-900/30 transition-all hover:shadow-2xl hover:ring-orange-300 dark:hover:ring-amber-700/50 hover:-translate-y-2 hover:scale-[1.02]">
              <DailyInspiration />
            </div>
          )}

          {settings?.spending_tracker_enabled && (
            <div className="group rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-amber-950/20 p-6 shadow-xl ring-2 ring-orange-100 dark:ring-amber-900/30 transition-all hover:shadow-2xl hover:ring-orange-300 dark:hover:ring-amber-700/50 hover:-translate-y-2 hover:scale-[1.02]">
              <SpendingTracker userId={user!.id} />
            </div>
          )}

          {settings?.todo_list_enabled && (
            <div className="group rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-amber-950/20 p-6 shadow-xl ring-2 ring-orange-100 dark:ring-amber-900/30 transition-all hover:shadow-2xl hover:ring-orange-300 dark:hover:ring-amber-700/50 hover:-translate-y-2 hover:scale-[1.02]">
              <TodoList userId={user!.id} />
            </div>
          )}

          {settings?.health_tracker_enabled && (
            <div className="group rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-amber-950/20 p-6 shadow-xl ring-2 ring-orange-100 dark:ring-amber-900/30 transition-all hover:shadow-2xl hover:ring-orange-300 dark:hover:ring-amber-700/50 hover:-translate-y-2 hover:scale-[1.02]">
              <HealthTracker userId={user!.id} />
            </div>
          )}

          {settings?.mini_games_enabled && (
            <div className="group rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-amber-950/20 p-6 shadow-xl ring-2 ring-orange-100 dark:ring-amber-900/30 transition-all hover:shadow-2xl hover:ring-orange-300 dark:hover:ring-amber-700/50 hover:-translate-y-2 hover:scale-[1.02]">
              <MiniGames />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
