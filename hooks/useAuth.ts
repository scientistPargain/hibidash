import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/apis";

/**
 * Hook to get current user
 */
export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const { user, error } = await authService.getCurrentUser();
            if (error) throw error;
            return user;
        },
        retry: false,
    });
}

/**
 * Hook to sign in
 */
export function useSignIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await authService.signIn(email, password);
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });
}

/**
 * Hook to sign up
 */
export function useSignUp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await authService.signUp(email, password);
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });
}

/**
 * Hook to sign out
 */
export function useSignOut() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await authService.signOut();
        },
        onSuccess: () => {
            queryClient.clear();
        },
    });
}
