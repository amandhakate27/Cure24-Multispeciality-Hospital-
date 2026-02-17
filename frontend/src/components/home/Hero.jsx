import { useEffect, useMemo, useState } from "react";
import { Phone } from "lucide-react";

const Hero = () => {
    const slides = useMemo(
        () => [
            () => import("../../assets/images/slideimg0.jpg?url"),
            () => import("../../assets/images/slideimg1.jpeg?url"),
            () => import("../../assets/images/slideimg2.jpeg?url"),
            () => import("../../assets/images/slideimg3.jpg?url"),
            () => import("../../assets/images/slideimg4.jpeg?url"),
            () => import("../../assets/images/slideimage.jpg?url"),
        ],
        []
    );

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    useEffect(() => {
        // Load current image
        slides[currentSlide]()
            .then(module => {
                setCurrentImageUrl(module.default);
                setLoadedImages(prev => ({ ...prev, [currentSlide]: module.default }));
            });
    }, [currentSlide, slides]);

    useEffect(() => {
        let fadeTimer;
        let timer;

        const start = () => {
            if (timer) return;
            timer = setInterval(() => {
                setIsFading(true);
                fadeTimer = setTimeout(() => {
                    setCurrentSlide((prev) => (prev + 1) % slides.length);
                    setIsFading(false);
                }, 600);
            }, 3000);
        };

        const stop = () => {
            if (timer) {
                clearInterval(timer);
                timer = undefined;
            }
            if (fadeTimer) {
                clearTimeout(fadeTimer);
                fadeTimer = undefined;
            }
        };

        const handleVisibility = () => {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        };

        start();
        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            stop();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [slides.length]);

    // Preload next image
    useEffect(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        if (!loadedImages[nextIndex]) {
            slides[nextIndex]()
                .then(module => {
                    setLoadedImages(prev => ({ ...prev, [nextIndex]: module.default }));
                    const img = new Image();
                    img.src = module.default;
                });
        }
    }, [currentSlide, slides, loadedImages]);

    return (
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-32">
            <div className="absolute inset-0 overflow-hidden">
                {currentImageUrl && (
                    <img
                        src={currentImageUrl}
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                        loading={currentSlide === 0 ? "eager" : "lazy"}
                        fetchPriority={currentSlide === 0 ? "high" : "auto"}
                        className={`w-full h-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${isFading ? "opacity-0" : "opacity-[0.65]"}`}
                        style={{ willChange: "opacity" }}
                    />
                )}
            </div>

            <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
                <div className="text-center flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                        <span className="bg-linear-to-r from-blue-900 via-blue-700 to-blue-500 text-transparent bg-clip-text">
                            CARE THAT, NEVER
                            <br />
                            SLEEPS
                        </span>
                    </h1>

                    <p className="text-[#041AA9] mt-4 max-w-3xl mx-auto text-base md:text-lg">
                        Experience world-class healthcare with 24/7 emergency services, advanced medical
                        technology, and compassionate care in Nagpur.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-8 justify-center">
                        <a
                            href="tel:+919665151746"
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-transform hover:scale-[1.03] active:scale-95 inline-flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" aria-hidden="true" />
                            Call Now
                        </a>

                        <a
                            href="https://wa.me/919665151746"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#25D366] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#1EBE5D] transition-transform hover:scale-[1.03] active:scale-95 inline-flex items-center gap-2"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.31-1.65a11.87 11.87 0 0 0 5.73 1.46h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.41-8.44Zm-8.48 18.33h-.01c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.75.99 1-3.65-.22-.35a9.9 9.9 0 0 1-1.5-5.26c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.89-9.9 9.89Zm5.44-7.43c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.39-1.48-.88-.78-1.48-1.76-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.08-.12-.27-.2-.57-.35Z" />
                            </svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
