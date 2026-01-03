import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { spendingService } from "@/apis";

/**
 * Hook to get spending list
 */
export function useSpendingList(userId: string | undefined) {
    return useQuery({
        queryKey: ["spendingList", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID required");
            const { data, error } = await spendingService.getSpendingList(userId);
            if (error) throw error;
            return data || [];
        },
        enabled: !!userId,
    });
}

/**
 * Hook to add spending entry
 */
export function useAddSpending(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            amount,
            category,
            description
        }: {
            amount: number;
            category: string;
            description: string;
        }) => {
            const { error } = await spendingService.addSpending(
                userId,
                amount,
                category,
                description
            );
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spendingList", userId] });
        },
    });
}

/**
 * Hook to delete spending entry
 */
export function useDeleteSpending(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await spendingService.deleteSpending(id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spendingList", userId] });
        },
    });
}

/**
 * Hook to calculate total spending
 */
export function useTotalSpending(userId: string | undefined) {
    const { data: spendingList } = useSpendingList(userId);

    return spendingService.calculateTotal(spendingList || []);
}
