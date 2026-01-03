export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            user_settings: {
                Row: {
                    id: string
                    user_id: string
                    anime_tracker_enabled: boolean
                    daily_inspiration_enabled: boolean
                    spending_tracker_enabled: boolean
                    todo_list_enabled: boolean
                    health_tracker_enabled: boolean
                    mini_games_enabled: boolean
                    layout: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    anime_tracker_enabled?: boolean
                    daily_inspiration_enabled?: boolean
                    spending_tracker_enabled?: boolean
                    todo_list_enabled?: boolean
                    health_tracker_enabled?: boolean
                    mini_games_enabled?: boolean
                    layout?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    anime_tracker_enabled?: boolean
                    daily_inspiration_enabled?: boolean
                    spending_tracker_enabled?: boolean
                    todo_list_enabled?: boolean
                    health_tracker_enabled?: boolean
                    mini_games_enabled?: boolean
                    layout?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            anime_entries: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    status: 'watching' | 'completed' | 'plan_to_watch'
                    episodes_watched: number
                    total_episodes: number
                    rating: number | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    status?: 'watching' | 'completed' | 'plan_to_watch'
                    episodes_watched?: number
                    total_episodes?: number
                    rating?: number | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    status?: 'watching' | 'completed' | 'plan_to_watch'
                    episodes_watched?: number
                    total_episodes?: number
                    rating?: number | null
                    created_at?: string
                    updated_at?: string
                }
            }
            spending_entries: {
                Row: {
                    id: string
                    user_id: string
                    amount: number
                    category: string
                    description: string
                    date: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    amount: number
                    category: string
                    description: string
                    date: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    amount?: number
                    category?: string
                    description?: string
                    date?: string
                    created_at?: string
                }
            }
            spending_goals: {
                Row: {
                    id: string
                    user_id: string
                    category: string
                    monthly_limit: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    category: string
                    monthly_limit: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    category?: string
                    monthly_limit?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            todo_items: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    completed: boolean
                    priority: 'low' | 'medium' | 'high'
                    due_date: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    completed?: boolean
                    priority?: 'low' | 'medium' | 'high'
                    due_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    completed?: boolean
                    priority?: 'low' | 'medium' | 'high'
                    due_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            health_metrics: {
                Row: {
                    id: string
                    user_id: string
                    date: string
                    steps: number | null
                    sleep_hours: number | null
                    water_intake: number | null
                    weight: number | null
                    notes: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    date: string
                    steps?: number | null
                    sleep_hours?: number | null
                    water_intake?: number | null
                    weight?: number | null
                    notes?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    date?: string
                    steps?: number | null
                    sleep_hours?: number | null
                    water_intake?: number | null
                    weight?: number | null
                    notes?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
