import { supabase } from "@/lib/supabase";
import { TodoItem, TodoPriority } from "@/models";

export const todoService = {
    /**
     * Load all todo items for a user
     */
    async getTodoList(userId: string) {
        const { data, error } = await supabase
            .from("todo_items")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        return { data: data as TodoItem[] | null, error };
    },

    /**
     * Add new todo item
     */
    async addTodo(
        userId: string,
        title: string,
        priority: TodoPriority = "medium"
    ) {
        const { error } = await supabase.from("todo_items").insert({
            user_id: userId,
            title: title,
            completed: false,
            priority: priority,
        });

        return { error };
    },

    /**
     * Toggle todo completion status
     */
    async toggleTodo(id: string, completed: boolean) {
        const { error } = await supabase
            .from("todo_items")
            .update({ completed })
            .eq("id", id);

        return { error };
    },

    /**
     * Delete todo item
     */
    async deleteTodo(id: string) {
        const { error } = await supabase
            .from("todo_items")
            .delete()
            .eq("id", id);

        return { error };
    },
};
