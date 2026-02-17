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
        <div className={`pointer-events-auto w-full max-w-xl rounded-2xl border-2 bg-white shadow-2xl ${styles.border}`} role="status" aria-live="polite">
            <div className="flex items-start gap-5 px-6 py-5">
                <div className={`mt-1 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${styles.ring}`}>
                    <Icon className={`h-7 w-7 ${iconAnimation}`} aria-hidden="true" />
                </div>
                <div className="flex-1 pt-1">
                    <p className={`text-lg font-semibold ${styles.title}`}>{title}</p>
                    {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close notification"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
