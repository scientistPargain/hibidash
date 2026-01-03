import { supabase } from "@/lib/supabase";
import { UserSettings } from "@/models";

export const userService = {
    /**
     * Load user settings
     */
    async getUserSettings(userId: string) {
        const { data, error } = await supabase
            .from("user_settings")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

        return { data, error };
    },

    /**
     * Create default user settings
     */
    async createUserSettings(userId: string) {
        const { data, error } = await supabase
            .from("user_settings")
            .insert({
                user_id: userId,
                anime_tracker_enabled: true,
                daily_inspiration_enabled: true,
                spending_tracker_enabled: true,
                todo_list_enabled: true,
                health_tracker_enabled: true,
                mini_games_enabled: true,
            })
            .select()
            .single();

        return { data, error };
    },

    /**
     * Update user settings
     */
    async updateUserSettings(userId: string, settings: Partial<UserSettings>) {
        const { error } = await supabase
            .from("user_settings")
            .update({
                ...settings,
                updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);

        return { error };
    },
};
