"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, Lock, Sparkles } from "lucide-react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          toast.success("Welcome back!");
          router.push("/dashboard");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          // Initialize user settings - use upsert to handle conflicts
          const { error: settingsError } = await supabase
            .from("user_settings")
            .upsert(
              {
                user_id: data.user.id,
                anime_tracker_enabled: true,
                daily_inspiration_enabled: true,
                spending_tracker_enabled: true,
                todo_list_enabled: true,
                health_tracker_enabled: true,
                mini_games_enabled: true,
                layout: [],
              },
              {
                onConflict: "user_id",
              }
            );

          if (settingsError) console.error("Settings error:", settingsError);
          toast.success("Account created successfully!");
          router.push("/dashboard");
        }
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      <div className="w-full max-w-md rounded-3xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-8 shadow-2xl ring-2 ring-orange-200 dark:ring-amber-800/50">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-xl">
            <Sparkles className="text-white" size={36} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back!" : "Join HibiDash"}
          </h1>
          <p className="mt-2 text-amber-700 dark:text-amber-300 font-medium">
            {isLogin
              ? "Sign in to your dashboard"
              : "Create your personalized dashboard"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={20}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-amber-200 dark:border-amber-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pl-11 pr-4 py-3 focus:border-orange-500 dark:focus:border-amber-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-amber-900/30 focus:outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-amber-900 dark:text-amber-200 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 dark:text-amber-600"
                size={20}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border-2 border-amber-200 dark:border-amber-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pl-11 pr-4 py-3 focus:border-orange-500 dark:focus:border-amber-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-amber-900/30 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 dark:from-orange-600 dark:via-amber-600 dark:to-orange-700 py-3 font-bold text-white shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02] hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:via-amber-700 dark:hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Loading...
              </span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors underline decoration-2 underline-offset-2"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
