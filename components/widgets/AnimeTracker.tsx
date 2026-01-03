"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Star } from "lucide-react";

interface AnimeEntry {
  id: string;
  title: string;
  status: "watching" | "completed" | "plan_to_watch";
  episodes_watched: number;
  total_episodes: number;
  rating: number | null;
}

export default function AnimeTracker({ userId }: { userId: string }) {
  const [animeList, setAnimeList] = useState<AnimeEntry[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAnime();
  }, []);

  const loadAnime = async () => {
    const { data } = await supabase
      .from("anime_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setAnimeList(data);
  };

  const addAnime = async () => {
    if (!newTitle.trim()) return;

    const { error } = await supabase.from("anime_entries").insert({
      user_id: userId,
      title: newTitle,
      status: "plan_to_watch",
      episodes_watched: 0,
      total_episodes: 12,
    });

    if (!error) {
      setNewTitle("");
      setShowForm(false);
      loadAnime();
    }
  };

  const updateStatus = async (id: string, status: AnimeEntry["status"]) => {
    await supabase.from("anime_entries").update({ status }).eq("id", id);
    loadAnime();
  };

  const deleteAnime = async (id: string) => {
    await supabase.from("anime_entries").delete().eq("id", id);
    loadAnime();
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">Anime Tracker</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-lg hover:shadow-xl p-2 text-white transition hover:bg-indigo-700"
        >
          <Plus size={20} />
        </button>
      </div>

      {showForm && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Anime title..."
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && addAnime()}
          />
          <button
            onClick={addAnime}
            className="rounded-md bg-gradient-to-r from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-700 px-4 py-2 text-white transition hover:from-orange-600 hover:to-amber-700 dark:hover:from-orange-700 dark:hover:to-amber-800"
          >
            Add
          </button>
        </div>
      )}

      <div className="max-h-96 space-y-2 overflow-y-auto">
        {animeList.map((anime) => (
          <div key={anime.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{anime.title}</h3>
                <select
                  value={anime.status}
                  onChange={(e) =>
                    updateStatus(anime.id, e.target.value as any)
                  }
                  className="mt-1 rounded border px-2 py-1 text-sm"
                >
                  <option value="plan_to_watch">Plan to Watch</option>
                  <option value="watching">Watching</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                onClick={() => deleteAnime(anime.id)}
                className="text-red-500 transition hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {animeList.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No anime added yet</p>
        )}
      </div>
    </div>
  );
}
