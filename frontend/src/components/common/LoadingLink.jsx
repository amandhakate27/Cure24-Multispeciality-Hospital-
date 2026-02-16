import { Link } from "react-router-dom";

const LoadingLink = ({ to, children, className = "", onClick }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`inline-flex items-center justify-center ${className}`}
        >
            {children}
        </Link>
    );
};

export default LoadingLink;
