export interface TodoItem {
    id: string;
    user_id: string;
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    created_at?: string;
    updated_at?: string;
}

export type TodoPriority = TodoItem["priority"];
