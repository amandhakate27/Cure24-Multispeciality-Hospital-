import { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ src, poster, className, onError }) => {
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
            { rootMargin: "200px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={className}>
            {shouldLoad ? (
                <video
                    src={src}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    poster={poster || undefined}
                    onError={onError}
                />
            ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <span className="sr-only">Video</span>
                    <svg
                        className="h-10 w-10 text-white/40"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;