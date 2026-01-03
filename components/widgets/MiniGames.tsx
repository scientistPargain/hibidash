"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Gamepad2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MiniGames() {
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "sudoku">("pomodoro");
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timer > 0) {
      hasNotifiedRef.current = false;
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timer === 0 && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      toast.success("🎉 Pomodoro completed! Time for a break!", {
        duration: 5000,
      });
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(25 * 60);
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">Mini Games & Timer</h2>
        <Gamepad2 className="text-orange-600 dark:text-amber-400" size={24} />
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("pomodoro")}
            className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
              mode === "pomodoro"
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => setMode("sudoku")}
            className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
              mode === "sudoku"
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sudoku
          </button>
        </div>

        {mode === "pomodoro" && (
          <div className="rounded-lg bg-gradient-to-br from-indigo-50 to-purple-100 p-6 text-center">
            <div className="mb-4 text-6xl font-bold text-indigo-600">
              {formatTime(timer)}
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-lg hover:shadow-xl p-3 text-white transition hover:bg-indigo-700"
              >
                {isRunning ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={resetTimer}
                className="rounded-full bg-gray-600 p-3 text-white transition hover:bg-gray-700"
              >
                <RotateCcw size={24} />
              </button>
            </div>

            <div className="mt-4 space-x-2">
              <button
                onClick={() => setTimer(25 * 60)}
                className="rounded-md bg-white px-3 py-1 text-sm font-medium text-indigo-600"
              >
                25 min
              </button>
              <button
                onClick={() => setTimer(5 * 60)}
                className="rounded-md bg-white px-3 py-1 text-sm font-medium text-indigo-600"
              >
                5 min
              </button>
              <button
                onClick={() => setTimer(15 * 60)}
                className="rounded-md bg-white px-3 py-1 text-sm font-medium text-indigo-600"
              >
                15 min
              </button>
            </div>
          </div>
        )}

        {mode === "sudoku" && (
          <div className="rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 p-6 text-center">
            <div className="mb-4 text-4xl">🎮</div>
            <p className="mb-4 text-gray-700">Sudoku game coming soon!</p>
            <p className="text-sm text-gray-600">
              Challenge yourself with daily puzzles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
