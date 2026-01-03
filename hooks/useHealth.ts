import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { healthService } from "@/apis";
import { DailyHealthData } from "@/models";

/**
 * Hook to get today's health metrics
 */
export function useTodayHealthMetrics(userId: string | undefined) {
    return useQuery({
        queryKey: ["healthMetrics", userId, "today"],
        queryFn: async () => {
            if (!userId) throw new Error("User ID required");
            const { data, error } = await healthService.getTodayMetrics(userId);
            if (error) throw error;
            return data;
        },
        enabled: !!userId,
    });
}

/**
 * Hook to update health metrics
 */
export function useUpdateHealthMetrics(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            metricType,
            value
        }: {
            metricType: keyof DailyHealthData;
            value: number;
        }) => {
            const { error } = await healthService.updateMetrics(
                userId,
                metricType,
                value
            );
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["healthMetrics", userId, "today"]
            });
        },
    });
}
