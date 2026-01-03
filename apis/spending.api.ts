import { supabase } from "@/lib/supabase";
import { SpendingEntry } from "@/models";

export const spendingService = {
    /**
     * Load all spending entries for a user
     */
    async getSpendingList(userId: string) {
        const { data, error } = await supabase
            .from("spending_entries")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false });

        return { data: data as SpendingEntry[] | null, error };
    },

    /**
     * Add new spending entry
     */
    async addSpending(
        userId: string,
        amount: number,
        category: string,
        description: string
    ) {
        const { error } = await supabase.from("spending_entries").insert({
            user_id: userId,
            amount: amount,
            category: category,
            description: description,
            date: new Date().toISOString().split("T")[0],
        });

        return { error };
    },

    /**
     * Delete spending entry
     */
    async deleteSpending(id: string) {
        const { error } = await supabase
            .from("spending_entries")
            .delete()
            .eq("id", id);

        return { error };
    },

    /**
     * Calculate total spending
     */
    calculateTotal(entries: SpendingEntry[]): number {
        return entries.reduce((sum, entry) => sum + entry.amount, 0);
    },
};
