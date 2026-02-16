import { useState } from "react";

const LoadingButton = ({
    children,
    className = "",
    duration = 1000,
    onClick,
    type = "button",
    disabled = false,
}) => {
    const [loading, setLoading] = useState(false);

    const handleClick = (event) => {
        if (loading || disabled) return;

        if (type === "submit" && event.currentTarget.form) {
            event.preventDefault();
            const form = event.currentTarget.form;
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                form.requestSubmit();
            }, duration);
            return;
        }

        if (onClick) onClick(event);
        setLoading(true);
        setTimeout(() => setLoading(false), duration);
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center ${className}`}
            aria-busy={loading}
        >
            {children}
        </button>
    );
};

export default LoadingButton;
