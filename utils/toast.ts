import toast from "react-hot-toast";

/**
 * Show success toast notification
 */
export function showSuccess(message: string): void {
    toast.success(message);
}

/**
 * Show error toast notification
 */
export function showError(message: string): void {
    toast.error(message);
}

/**
 * Show info toast notification
 */
export function showInfo(message: string): void {
    toast(message);
}

/**
 * Show loading toast notification
 */
export function showLoading(message: string): string {
    return toast.loading(message);
}

/**
 * Dismiss toast by ID
 */
export function dismissToast(toastId: string): void {
    toast.dismiss(toastId);
}
