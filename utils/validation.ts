/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * Returns true if password is at least 6 characters
 */
export function isValidPassword(password: string): boolean {
    return password.length >= 6;
}

/**
 * Validate required field
 */
export function isRequired(value: string): boolean {
    return value.trim().length > 0;
}

/**
 * Validate number is positive
 */
export function isPositiveNumber(value: number): boolean {
    return value > 0;
}
