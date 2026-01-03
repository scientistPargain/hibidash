import { supabase } from "@/lib/supabase";

export const authService = {
    /**
     * Sign in with email and password
     */
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    /**
     * Sign up with email and password
     */
    async signUp(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    },

    /**
     * Get current user
     */
    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    },

    /**
     * Sign out current user
     */
    async signOut() {
        await supabase.auth.signOut();
    },
};
