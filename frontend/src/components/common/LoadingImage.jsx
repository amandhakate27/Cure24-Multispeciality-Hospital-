import { useEffect, useRef, useState } from "react";

const LoadingImage = ({
    src,
    alt,
    className = "",
    imgClassName = "",
    loading = "lazy",
    decoding = "async",
    fetchPriority,
}) => {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    useEffect(() => {
        const img = imgRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
            setLoaded(true);
        }
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!loaded && (
                <div className="absolute inset-0 bg-blue-100/70 animate-pulse" />
            )}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(true)}
                className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
            />
        </div>
    );
};

export default LoadingImage;
