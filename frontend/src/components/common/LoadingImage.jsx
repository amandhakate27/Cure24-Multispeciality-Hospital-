import { useState } from "react";

const LoadingImage = ({
    src,
    alt,
    className = "",
    imgClassName = "",
    loading = "lazy",
    decoding = "async",
    fetchPriority,
    onError,
}) => {
    const [loadedSrc, setLoadedSrc] = useState("");
    const isLoaded = loadedSrc === src;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-blue-100/70 animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoadedSrc(src)}
                onError={(event) => {
                    setLoadedSrc(src);
                    if (onError) onError(event);
                }}
                className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
            />
        </div>
    );
};

export default LoadingImage;
