import { supabase } from "@/lib/supabase";
import { HealthMetric, DailyHealthData } from "@/models";

export const healthService = {
    /**
     * Load health metrics for today
     */
    async getTodayMetrics(userId: string) {
        const today = new Date().toISOString().split("T")[0];

        const { data, error } = await supabase
            .from("health_metrics")
            .select("*")
            .eq("user_id", userId)
            .eq("date", today)
            .maybeSingle();

        return { data: data as HealthMetric | null, error };
    },

    /**
     * Update or create health metrics
     */
    async updateMetrics(
        userId: string,
        metricType: keyof DailyHealthData,
        value: number
    ) {
        const today = new Date().toISOString().split("T")[0];

        // Check if record exists
        const { data: existing } = await supabase
            .from("health_metrics")
            .select("id")
            .eq("user_id", userId)
            .eq("date", today)
            .maybeSingle();

        const metricData = {
            user_id: userId,
            date: today,
            steps: metricType === "steps" ? value : null,
            sleep_hours: metricType === "sleep" ? value : null,
            water_glasses: metricType === "water" ? value : null,
        };

        if (existing) {
            // Update existing record
            const { error } = await supabase
                .from("health_metrics")
                .update({
                    [metricType === "steps" ? "steps" : metricType === "sleep" ? "sleep_hours" : "water_glasses"]: value,
                })
                .eq("id", existing.id);

            return { error };
        } else {
            // Create new record
            const { error } = await supabase
                .from("health_metrics")
                .insert(metricData);

            return { error };
        }
    },
};
