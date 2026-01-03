export interface HealthMetric {
    id: string;
    user_id: string;
    date: string;
    steps: number | null;
    sleep_hours: number | null;
    water_glasses: number | null;
    water_intake: number | null;
    created_at?: string;
}

export interface DailyHealthData {
    steps: string;
    sleep: string;
    water: string;
}
