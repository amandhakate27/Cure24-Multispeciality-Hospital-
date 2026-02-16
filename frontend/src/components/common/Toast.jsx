import { Check, Trash2, X } from "lucide-react";

const variants = {
    success: {
        icon: Check,
        ring: "bg-emerald-100 text-emerald-700",
        border: "border-emerald-200",
        title: "text-emerald-900",
    },
    delete: {
        icon: Trash2,
        ring: "bg-red-100 text-red-700",
        border: "border-red-200",
        title: "text-red-900",
    },
    error: {
        icon: X,
        ring: "bg-rose-100 text-rose-700",
        border: "border-rose-200",
        title: "text-rose-900",
    },
};

const Toast = ({ variant = "success", title, message, onClose }) => {
    const styles = variants[variant] || variants.success;
    const Icon = styles.icon;
    const iconAnimation = variant === "success" ? "animate-bounce" : "animate-pulse";

    return (
        <div className="pointer-events-auto w-full max-w-md rounded-2xl border bg-white shadow-2xl" role="status" aria-live="polite">
            <div className={`flex items-start gap-4 border-b px-5 py-4 ${styles.border}`}>
                <div className={`mt-0.5 flex h-12 w-12 items-center justify-center rounded-full ${styles.ring}`}>
                    <Icon className={`h-6 w-6 ${iconAnimation}`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                    <p className={`text-base font-semibold ${styles.title}`}>{title}</p>
                    {message && <p className="text-sm text-gray-600 mt-1">{message}</p>}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close notification"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
