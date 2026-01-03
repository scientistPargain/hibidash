import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/apis";
import { UserSettings } from "@/models";

/**
 * Hook to get user settings
 */
export function useUserSettings(userId: string | undefined) {
    return useQuery({
        queryKey: ["userSettings", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID required");

            const { data, error } = await userService.getUserSettings(userId);

            if (error) throw error;

            // If no settings exist, create default ones
            if (!data) {
                const { data: newSettings, error: createError } =
                    await userService.createUserSettings(userId);
                if (createError) throw createError;
                return newSettings;
            }

            return data;
        },
        enabled: !!userId,
    });
}

/**
 * Hook to update user settings
 */
export function useUpdateUserSettings(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (settings: Partial<UserSettings>) => {
            const { error } = await userService.updateUserSettings(userId, settings);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userSettings", userId] });
        },
    });
}
