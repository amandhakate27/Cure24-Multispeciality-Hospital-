import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoadingLink = ({ to, children, className = "", delay = 2000, onClick }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (event) => {
        event.preventDefault();
        if (location.pathname === to) {
            if (onClick) onClick(event);
            return;
        }
        if (loading) return;
        if (onClick) onClick(event);
        setLoading(true);
        setTimeout(() => navigate(to), delay);
    };

    return (
        <Link
            to={to}
            onClick={handleClick}
            className={`relative inline-flex items-center justify-center ${loading ? "pointer-events-none" : ""} ${className}`}
            aria-busy={loading}
        >
            <span className={loading ? "opacity-0" : "opacity-100"}>{children}</span>
            {loading && (
                <span
                    className="absolute inline-flex w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                    aria-hidden="true"
                />
            )}
        </Link>
    );
};

export default LoadingLink;
