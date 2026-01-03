import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "@/apis";
import { TodoPriority } from "@/models";

/**
 * Hook to get todo list
 */
export function useTodoList(userId: string | undefined) {
    return useQuery({
        queryKey: ["todoList", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID required");
            const { data, error } = await todoService.getTodoList(userId);
            if (error) throw error;
            return data || [];
        },
        enabled: !!userId,
    });
}

/**
 * Hook to add todo
 */
export function useAddTodo(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ title, priority }: { title: string; priority?: TodoPriority }) => {
            const { error } = await todoService.addTodo(userId, title, priority);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoList", userId] });
        },
    });
}

/**
 * Hook to toggle todo
 */
export function useToggleTodo(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
            const { error } = await todoService.toggleTodo(id, completed);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoList", userId] });
        },
    });
}

/**
 * Hook to delete todo
 */
export function useDeleteTodo(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await todoService.deleteTodo(id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoList", userId] });
        },
    });
}
