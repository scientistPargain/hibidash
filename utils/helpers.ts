/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date = new Date()): string {
    return date.toISOString().split("T")[0];
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

/**
 * Check if string is empty or whitespace
 */
export function isEmpty(str: string): boolean {
    return !str || str.trim().length === 0;
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

/**
 * Get greeting based on time of day
 */
export function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
