import { useEffect, useMemo, useState } from "react";
import LoadingLink from "../common/LoadingLink";

const Hero = () => {
    const slides = useMemo(
        () => [
            () => import("../../assets/images/slideimg0.jpg?url"),
            () => import("../../assets/images/slideimg1.jpeg?url"),
            () => import("../../assets/images/slideimg2.jpeg?url"),
            () => import("../../assets/images/slideimg3.jpg?url"),
            () => import("../../assets/images/slideimg4.jpeg?url"),
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
                            Your Health, Our
                            <br />
                            Priority
                        </span>
                    </h1>

                    <p className="text-[#041AA9] mt-4 max-w-3xl mx-auto text-base md:text-lg">
                        Experience world-class healthcare with 24/7 emergency services, advanced medical
                        technology, and compassionate care in Nagpur.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-8 justify-center">
                        <LoadingLink
                            to="/appointment"
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Book Appointment
                        </LoadingLink>

                        <LoadingLink
                            to="/contact"
                            className="text-blue-700 px-4 py-3 rounded-xl font-semibold border border-blue-200 hover:border-blue-300 hover:bg-blue-100 transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Contact Us
                        </LoadingLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
