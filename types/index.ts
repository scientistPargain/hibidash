export interface WidgetConfig {
    id: string;
    type: 'anime' | 'inspiration' | 'spending' | 'todo' | 'health' | 'minigames' | 'timer';
    title: string;
    enabled: boolean;
    position: { x: number; y: number };
    size: { w: number; h: number };
}

export interface UserSettings {
    id: string;
    userId: string;
    animeTrackerEnabled: boolean;
    dailyInspirationEnabled: boolean;
    spendingTrackerEnabled: boolean;
    todoListEnabled: boolean;
    healthTrackerEnabled: boolean;
    miniGamesEnabled: boolean;
    layout: WidgetConfig[];
}

export interface AnimeEntry {
    id: string;
    userId: string;
    title: string;
    status: 'watching' | 'completed' | 'plan_to_watch';
    episodesWatched: number;
    totalEpisodes: number;
    rating: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface SpendingEntry {
    id: string;
    userId: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    createdAt: string;
}

export interface SpendingGoal {
    id: string;
    userId: string;
    category: string;
    monthlyLimit: number;
    createdAt: string;
    updatedAt: string;
}

export interface TodoItem {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface HealthMetric {
    id: string;
    userId: string;
    date: string;
    steps: number | null;
    sleepHours: number | null;
    waterIntake: number | null;
    weight: number | null;
    notes: string | null;
    createdAt: string;
}
