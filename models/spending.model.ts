export interface SpendingEntry {
    id: string;
    user_id: string;
    title?: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    created_at?: string;
}
