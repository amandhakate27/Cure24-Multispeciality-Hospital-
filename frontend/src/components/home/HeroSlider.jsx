import { useEffect, useState } from "react";
import { buildApiUrl, buildAssetUrl } from "../../utils/api";

const HeroSlider = ({ variant = "inline" }) => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getImageUrl = (imageUrl) => buildAssetUrl(imageUrl);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await fetch(buildApiUrl("/api/hero-slider"));
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setSlides(data.slides || []);
                    } else {
                        setError(data.message || "Failed to load slides");
                    }
                } else {
                    setError(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to fetch hero slides:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const isBackground = variant === "background";

    if (isLoading) {
        return (
            <div className={isBackground ? "absolute inset-0 z-0 bg-slate-900 animate-pulse" : "relative w-full h-full min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:h-full lg:max-h-[680px] overflow-hidden bg-slate-100 animate-pulse"}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
            </div>
        );
    }

    if (error || slides.length === 0) {
        if (isBackground) return null;
        return (
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:h-full lg:max-h-[680px] overflow-hidden bg-slate-50 flex items-center justify-center">
                <div className="text-center p-4 text-slate-500">
                    <p className="text-sm">No active slider images</p>
                    {error && <p className="text-xs mt-1 text-red-500">Error: {error}</p>}
                    <p className="text-xs mt-2">Add images in Admin Hero Slider tab</p>
                </div>
            </div>
        );
    }

    return (
        <div className={isBackground ? "absolute inset-0 z-0 overflow-hidden bg-slate-950" : "relative w-full h-full min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:h-full lg:max-h-[680px] overflow-hidden"}>
            <div
                className={isBackground ? "absolute inset-0" : "flex h-full transition-transform duration-700 ease-in-out"}
                style={isBackground ? undefined : { transform: `translateX(-${currentIndex * 100}%)` }}
                role="region"
                aria-label="Hero image slider"
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide._id}
                        className={isBackground ? "absolute inset-0 transition-opacity duration-1000 ease-in-out" : "flex-shrink-0 w-full h-full flex items-center justify-center"}
                        style={isBackground ? { opacity: index === currentIndex ? 1 : 0 } : undefined}
                    >
                        <img
                            src={getImageUrl(slide.imageUrl)}
                            alt={slide.altText}
                            className={isBackground
                                ? `h-full w-full object-cover object-center transform transition-transform duration-7000 ease-out ${index === currentIndex ? "scale-105" : "scale-100"}`
                                : "w-auto max-w-full object-contain object-bottom h-full"}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "low"}
                            onError={(e) => {
                                console.error("Failed to load slide image:", getImageUrl(slide.imageUrl));
                            }}
                        />
                    </div>
                ))}
            </div>

            {slides.length > 1 && (
                <div className={`absolute left-1/2 -translate-x-1/2 flex gap-2 z-20 ${isBackground ? "bottom-6 sm:bottom-8" : "bottom-4"}`} role="tablist" aria-label="Slide indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2.5 rounded-full transition-all ${
                                index === currentIndex ? "w-8 bg-blue-600 shadow-md" : "w-2.5 bg-slate-400/60 hover:bg-slate-600/80"
                            }`}
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroSlider;
