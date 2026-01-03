import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { animeService } from "@/apis";
import { AnimeStatus } from "@/models";

/**
 * Hook to get anime list
 */
export function useAnimeList(userId: string | undefined) {
    return useQuery({
        queryKey: ["animeList", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID required");
            const { data, error } = await animeService.getAnimeList(userId);
            if (error) throw error;
            return data || [];
        },
        enabled: !!userId,
    });
}

/**
 * Hook to add anime
 */
export function useAddAnime(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (title: string) => {
            const { error } = await animeService.addAnime(userId, title);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["animeList", userId] });
        },
    });
}

/**
 * Hook to update anime status
 */
export function useUpdateAnimeStatus(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: AnimeStatus }) => {
            const { error } = await animeService.updateAnimeStatus(id, status);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["animeList", userId] });
        },
    });
}

/**
 * Hook to delete anime
 */
export function useDeleteAnime(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await animeService.deleteAnime(id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["animeList", userId] });
        },
    });
}
