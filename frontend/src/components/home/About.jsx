import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import LoadingLink from "../common/LoadingLink";
import { buildApiUrl, buildAssetUrl } from "../../utils/api";

const HomeGallery = () => {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [lightboxDirection, setLightboxDirection] = useState(1);
    const [lightboxPaused, setLightboxPaused] = useState(false);
    const pointerStartX = useRef(null);
    const movedRef = useRef(false);
    const selectedThumbRef = useRef(null);

    useEffect(() => {
        let ignore = false;
        const fetchHomePhotos = async () => {
            try {
                const res = await fetch(buildApiUrl("/api/gallery-photos?home=true"));
                if (res.ok) {
                    const data = await res.json();
                    if (!ignore && data.success && Array.isArray(data.photos)) {
                        const imgs = data.photos.map((p) => ({
                            id: p._id,
                            title: p.title || "Hospital gallery",
                            url: buildAssetUrl(p.imageUrl),
                        }));
                        if (imgs.length > 0) setImages(imgs);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch home gallery:", err);
            }
        };
        fetchHomePhotos();
        return () => {
            ignore = true;
        };
    }, []);

    const slides = images;

    useEffect(() => {
        if (slides.length < 2 || lightboxIndex !== null) return undefined;
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [slides.length, current, lightboxIndex]);

    const goTo = useCallback((dir) => {
        if (slides.length === 0) return;
        setDirection(dir);
        setCurrent((prev) => (prev + dir + slides.length) % slides.length);
    }, [slides.length]);

    const openLightbox = useCallback((index) => {
        setLightboxIndex(index);
    }, []);

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    const lightboxGoTo = useCallback((dir) => {
        setLightboxDirection(dir);
        setLightboxIndex((prev) => (prev + dir + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        if (lightboxIndex === null) return undefined;
        const onKeyDown = (event) => {
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") lightboxGoTo(-1);
            if (event.key === "ArrowRight") lightboxGoTo(1);
        };
        window.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [lightboxIndex, closeLightbox, lightboxGoTo]);

    useEffect(() => {
        if (lightboxIndex === null || slides.length < 2 || lightboxPaused) return undefined;
        const timer = setInterval(() => lightboxGoTo(1), 3000);
        return () => clearInterval(timer);
    }, [lightboxIndex, slides.length, lightboxPaused, lightboxGoTo]);

    useEffect(() => {
        selectedThumbRef.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }, [lightboxIndex]);

    const onPointerDown = (e) => {
        pointerStartX.current = e.clientX;
        movedRef.current = false;
    };

    const onPointerUp = (e) => {
        if (pointerStartX.current === null) return;
        const dx = e.clientX - pointerStartX.current;
        if (Math.abs(dx) > 50) {
            movedRef.current = true;
            goTo(dx > 0 ? -1 : 1);
        }
        pointerStartX.current = null;
    };

    const handleClick = () => {
        if (movedRef.current) {
            movedRef.current = false;
            return;
        }
        openLightbox(current);
    };

    const currentSlide = slides.length > 0 ? slides[current % slides.length] : null;

    return (
        <>
            {images.length === 0 ? (
                <div className="flex h-64 sm:h-80 lg:h-[540px] w-full items-center justify-center rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/60 text-center">
                    <div className="px-6">
                        <Images className="mx-auto h-10 w-10 text-blue-300" aria-hidden="true" />
                        <p className="mt-3 text-sm font-medium text-blue-600">Gallery photos will appear here</p>
                        <p className="mt-1 text-xs text-blue-400">
                            Photos marked "Send to Home" in the admin dashboard will show up in this rotating gallery.
                        </p>
                    </div>
                </div>
            ) : (
            <div
                className="group relative w-full h-64 sm:h-80 lg:h-[540px] overflow-hidden rounded-3xl shadow-xl select-none cursor-pointer"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onClick={handleClick}
                style={{ touchAction: "pan-y" }}
            >
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentSlide.id}
                        src={currentSlide.url}
                        alt={currentSlide.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{
                            opacity: 1,
                            scale: 1.05,
                            transition: {
                                opacity: { duration: 1, ease: "easeInOut" },
                                scale: { duration: 7, ease: "easeOut" },
                            },
                        }}
                        exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                        draggable={false}
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Hover hint */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
                    <div className="w-full px-5 pb-5 text-white">
                        <p className="text-sm font-semibold tracking-wide">Click to view</p>
                    </div>
                </div>

                {slides.length > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Previous image"
                            onClick={(e) => { e.stopPropagation(); goTo(-1); }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 text-blue-800 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next image"
                            onClick={(e) => { e.stopPropagation(); goTo(1); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 text-blue-800 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {slides.map((slide, i) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    aria-label={`Go to image ${i + 1}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDirection(i > current % slides.length ? 1 : -1);
                                        setCurrent(i);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === current % slides.length ? "w-6 bg-white" : "w-2 bg-white/60"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            )}

            {/* Lightbox */}
            {createPortal(
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.div
                            className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                            initial={{ scale: 0.92, y: 14, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.94, y: 10, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => setLightboxPaused(true)}
                            onMouseLeave={() => setLightboxPaused(false)}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100">
                                <div className="flex items-center gap-3 min-w-0">
                                    <h4 className="text-base md:text-lg font-semibold text-blue-800 truncate">
                                        {slides[lightboxIndex % slides.length].title}
                                    </h4>
                                    <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                        {(lightboxIndex % slides.length) + 1} / {slides.length}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeLightbox}
                                    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-50 transition-colors"
                                >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                    Close
                                </button>
                            </div>
                            <div className="relative bg-blue-50">
                                <button
                                    type="button"
                                    onClick={() => lightboxGoTo(-1)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 border border-blue-200 text-blue-800 flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Previous photo"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.img
                                        key={lightboxIndex}
                                        src={slides[lightboxIndex % slides.length].url}
                                        alt={slides[lightboxIndex % slides.length].title}
                                        className="w-full max-h-[75vh] object-contain"
                                        initial={{ opacity: 0, x: lightboxDirection * 90, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -lightboxDirection * 90, scale: 0.96 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </AnimatePresence>
                                <button
                                    type="button"
                                    onClick={() => lightboxGoTo(1)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 border border-blue-200 text-blue-800 flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Next photo"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="px-4 py-3 border-t border-blue-100 bg-white">
                                {slides.length > 1 && (
                                    <>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">All Photos</p>
                                            <p className="text-xs text-slate-400">{lightboxPaused ? "Paused" : "Auto-playing"}</p>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto pb-1">
                                            {slides.map((slide, index) => {
                                                const isSelected = index === lightboxIndex % slides.length;
                                                return (
                                                    <button
                                                        key={slide.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setLightboxDirection(index < (lightboxIndex % slides.length) ? -1 : 1);
                                                            setLightboxIndex(index);
                                                        }}
                                                        className={`relative h-14 w-20 rounded-md overflow-hidden border shrink-0 ${isSelected ? "border-blue-700 ring-1 ring-blue-700" : "border-blue-200"
                                                            }`}
                                                        ref={isSelected ? selectedThumbRef : undefined}
                                                    >
                                                        <img
                                                            src={slide.url}
                                                            alt={slide.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            , document.body)}
        </>
    );
};

const About = () => {
    return (
        <section className="bg-white pt-12 pb-16 md:pt-16 md:pb-20">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-800 leading-tight">
                    Leading Healthcare Provider in
                    <br />
                    Nagpur
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start mt-8 lg:mt-12">

                    {/* LEFT - CONTENT */}
                    <div className="text-left">
                        <p className="text-blue-700 mt-4 [text-align:justify]">
                            Cure 24 Clinic Hospital has been at the forefront of healthcare excellence in
                            Nagpur for nearly two decades. Founded with a vision to provide accessible,
                            affordable, and advanced medical care, we have grown to become one of the most
                            trusted healthcare institutions in Central India.
                        </p>

                        <p className="text-blue-700 mt-4 [text-align:justify]">
                            Our state-of-the-art facility combines modern infrastructure with compassionate
                            care. Led by Dr. Jitesh K. Bhandankar and a team of over 50 specialist doctors,
                            we serve more than 5,000 patients annually across 15+ medical specialties.
                        </p>

                        <p className="text-blue-700 mt-4 [text-align:justify]">
                            From routine checkups to complex surgeries, emergency care to preventive health programs , we offer comprehensive medical service under one roof, backed by the latest diagnostic and treatment technologies.
                        </p>

                        <LoadingLink
                            to="/about"
                            className="mt-6 bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-transform hover:scale-[1.03] active:scale-95 mx-auto lg:mx-0 inline-flex justify-center"
                        >
                            Learn More About Us
                        </LoadingLink>
                    </div>

                    {/* RIGHT - HOME GALLERY */}
                    <HomeGallery />
                </div>
            </div>
        </section>
    );
};

export default About;
