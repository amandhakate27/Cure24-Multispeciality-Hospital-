import { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ src, className, onError }) => {
    const containerRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return undefined;

        if (!("IntersectionObserver" in window)) {
            setShouldLoad(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldLoad(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: "300px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={`w-full h-full ${className || ""}`}>
            {shouldLoad ? (
                <video
                    src={src}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onError={onError}
                />
            ) : null}
        </div>
    );
};

export default VideoPlayer;