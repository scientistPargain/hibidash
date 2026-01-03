export interface AnimeEntry {
    id: string;
    user_id: string;
    title: string;
    status: "watching" | "completed" | "plan_to_watch";
    episodes_watched: number;
    total_episodes: number;
    rating: number | null;
    created_at?: string;
    updated_at?: string;
}

export type AnimeStatus = AnimeEntry["status"];
