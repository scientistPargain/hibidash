import { supabase } from "@/lib/supabase";
import { AnimeEntry, AnimeStatus } from "@/models";

export const animeService = {
    /**
     * Load all anime entries for a user
     */
    async getAnimeList(userId: string) {
        const { data, error } = await supabase
            .from("anime_entries")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        return { data: data as AnimeEntry[] | null, error };
    },

    /**
     * Add new anime entry
     */
    async addAnime(userId: string, title: string) {
        const { error } = await supabase.from("anime_entries").insert({
            user_id: userId,
            title: title,
            status: "plan_to_watch" as AnimeStatus,
            episodes_watched: 0,
            total_episodes: 12,
        });

        return { error };
    },

    /**
     * Update anime status
     */
    async updateAnimeStatus(id: string, status: AnimeStatus) {
        const { error } = await supabase
            .from("anime_entries")
            .update({ status })
            .eq("id", id);

        return { error };
    },

    /**
     * Delete anime entry
     */
    async deleteAnime(id: string) {
        const { error } = await supabase
            .from("anime_entries")
            .delete()
            .eq("id", id);

        return { error };
    },
};
