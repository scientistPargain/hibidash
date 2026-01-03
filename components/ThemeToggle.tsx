"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="rounded-xl border-2 border-amber-200 bg-white p-2.5">
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group rounded-xl border-2 border-amber-200 dark:border-amber-700/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-2.5 text-orange-600 dark:text-amber-400 transition-all hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-lg hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="animate-in spin-in-180 duration-500" />
      ) : (
        <Moon size={20} className="animate-in spin-in-180 duration-500" />
      )}
    </button>
  );
}
