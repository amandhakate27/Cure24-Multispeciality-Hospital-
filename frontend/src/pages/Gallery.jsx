import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Reveal from "../components/common/Reveal";
import VideoPlayer from "../components/common/VideoPlayer";
import { buildApiUrl, buildAssetUrl } from "../utils/api";
import panelOfDoctorsVideo from "../assets/videos/panel of doctors.mp4";

const defaultVideoGallery = [
    { _id: "vid-1", title: "Advanced Healthcare Facilities", videoUrl: panelOfDoctorsVideo },
    { _id: "vid-2", title: "Patient Care Journey", videoUrl: panelOfDoctorsVideo },
    { _id: "vid-3", title: "Our Expert Panel of Doctors", videoUrl: panelOfDoctorsVideo },
    { _id: "vid-4", title: "Emergency & Critical Care", videoUrl: panelOfDoctorsVideo },
];

const Gallery = () => {
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [lightboxDirection, setLightboxDirection] = useState(1);
    const [lightboxPaused, setLightboxPaused] = useState(false);
    const [videos, setVideos] = useState(defaultVideoGallery);
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const selectedThumbRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        let ignore = false;
        const fetchGalleryPhotos = async () => {
            try {
                const res = await fetch(buildApiUrl("/api/gallery-photos"));
                if (res.ok) {
                    const data = await res.json();
                    if (!ignore && data.success && Array.isArray(data.photos) && data.photos.length > 0) {
                        const dynamicPhotos = data.photos.map((photo) => ({
                            id: photo._id,
                            title: photo.title || "Gallery photo",
                            image: buildAssetUrl(photo.imageUrl),
                        }));
                        setGalleryPhotos(dynamicPhotos);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch gallery photos:", err);
            }
        };

        fetchGalleryPhotos();
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        let ignore = false;
        const fetchVideos = async () => {
            try {
                const res = await fetch(buildApiUrl("/api/videos"));
                if (res.ok) {
                    const data = await res.json();
                    if (!ignore && data.success && Array.isArray(data.videos) && data.videos.length > 0) {
                        setVideos(data.videos);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch gallery videos:", err);
            }
        };

        fetchVideos();
        return () => {
            ignore = true;
        };
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const isVideosHash = location.hash === "#videos" || window.location.hash === "#videos";
        if (isVideosHash) {
            const scrollToVideos = () => {
                const el = document.getElementById("videos");
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            };
            scrollToVideos();
            const timer1 = setTimeout(scrollToVideos, 100);
            const timer2 = setTimeout(scrollToVideos, 450);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    const selectedPhotoIndex = useMemo(
        () => galleryPhotos.findIndex((photo) => photo.id === selectedPhotoId),
        [selectedPhotoId]
    );
    const selectedPhoto = selectedPhotoIndex >= 0 ? galleryPhotos[selectedPhotoIndex] : null;

    const handleOpenPhoto = useCallback((photoId, direction = 1) => {
        setLightboxDirection(direction);
        setSelectedPhotoId(photoId);
    }, []);
    const handleClosePhoto = useCallback(() => setSelectedPhotoId(null), []);
    const handlePrevPhoto = useCallback(() => {
        if (selectedPhotoIndex < 0) return;
        const prevIndex = (selectedPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
        setLightboxDirection(-1);
        setSelectedPhotoId(galleryPhotos[prevIndex].id);
    }, [selectedPhotoIndex]);
    const handleNextPhoto = useCallback(() => {
        if (selectedPhotoIndex < 0) return;
        const nextIndex = (selectedPhotoIndex + 1) % galleryPhotos.length;
        setLightboxDirection(1);
        setSelectedPhotoId(galleryPhotos[nextIndex].id);
    }, [selectedPhotoIndex]);

    useEffect(() => {
        if (!selectedPhoto) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") handleClosePhoto();
            if (event.key === "ArrowLeft") handlePrevPhoto();
            if (event.key === "ArrowRight") handleNextPhoto();
        };

        window.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedPhoto, handleClosePhoto, handlePrevPhoto, handleNextPhoto]);

    useEffect(() => {
        if (!selectedPhoto || galleryPhotos.length < 2 || lightboxPaused) return undefined;
        const timer = setInterval(handleNextPhoto, 3000);
        return () => clearInterval(timer);
    }, [selectedPhoto, galleryPhotos.length, lightboxPaused, handleNextPhoto]);

    useEffect(() => {
        selectedThumbRef.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }, [selectedPhotoId]);

    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">
                <div className="mt-6 bg-blue-800 text-white">
                    <div className="max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14 py-8 text-center">
                        <Reveal>
                            <h2 className="text-2xl md:text-3xl font-semibold">Photo Gallery</h2>
                            <p className="text-blue-100 mt-2 text-sm md:text-base">
                                Explore our facility and healthcare infrastructure
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14">
                    <Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {galleryPhotos.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-slate-500">
                                <Images className="h-14 w-14 text-slate-300" />
                                <p className="mt-4 text-lg font-medium text-slate-600">No gallery photos yet</p>
                                <p className="mt-1 text-sm text-slate-400">Photos added from the admin dashboard will appear here.</p>
                            </div>
                        ) : (
                            galleryPhotos.map((photo) => (
                                <button
                                    key={photo.id}
                                    type="button"
                                    onClick={() => handleOpenPhoto(photo.id)}
                                    className="group text-left bg-white/95 border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                                >
                                    <div className="relative h-48 bg-blue-50 overflow-hidden">
                                        <img
                                            src={photo.image}
                                            alt={photo.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <div className="px-4 pb-3 text-white text-xs font-medium tracking-wide">
                                                Click to view
                                            </div>
                                        </div>
                                    </div>
                                    <p className="px-4 py-3 text-sm md:text-base font-semibold text-blue-800 text-center">
                                        {photo.title}
                                    </p>
                                </button>
                            ))
                        )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Video Gallery Section */}
            <section id="videos" className="pt-8 scroll-mt-20">
                <div className="bg-blue-800 text-white">
                    <div className="max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14 py-8 text-center">
                        <Reveal>
                            <h2 className="text-2xl md:text-3xl font-semibold">Video Gallery</h2>
                            <p className="text-blue-100 mt-2 text-sm md:text-base">
                                Watch our hospital facilities and patient care in action
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14">
                    <Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {videos.map((video) => {
                            const src = video.videoUrl
                                ? (/^https?:\/\//i.test(video.videoUrl) || video.videoUrl.startsWith('blob:')
                                    ? video.videoUrl
                                    : buildAssetUrl(video.videoUrl))
                                : panelOfDoctorsVideo;

                            return (
                                <div
                                    key={video._id || video.id}
                                    className="bg-white/95 border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <VideoPlayer src={src} title={video.title} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center p-4">
                                        <p className="text-sm md:text-base font-semibold text-blue-800 text-center">
                                            {video.title}
                                        </p>
                                        {video.description && (
                                            <p className="text-xs text-slate-500 mt-1 text-center line-clamp-2">{video.description}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </Reveal>
                </div>
            </section>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePhoto}
                    >
                        <motion.div
                            className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                            initial={{ scale: 0.92, y: 14, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.94, y: 10, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(event) => event.stopPropagation()}
                            onMouseEnter={() => setLightboxPaused(true)}
                            onMouseLeave={() => setLightboxPaused(false)}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100">
                                <div className="flex items-center gap-3 min-w-0">
                                    <h4 className="text-base md:text-lg font-semibold text-blue-800 truncate">
                                        {selectedPhoto.title}
                                    </h4>
                                    <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                        {selectedPhotoIndex + 1} / {galleryPhotos.length}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClosePhoto}
                                    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-50 transition-colors"
                                >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                    Close
                                </button>
                            </div>
                            <div className="relative bg-blue-50">
                                <button
                                    type="button"
                                    onClick={handlePrevPhoto}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 border border-blue-200 text-blue-800 flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Previous photo"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.img
                                        key={selectedPhoto.id}
                                        src={selectedPhoto.image}
                                        alt={selectedPhoto.title}
                                        className="w-full max-h-[75vh] object-contain"
                                        initial={{ opacity: 0, x: lightboxDirection * 90, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -lightboxDirection * 90, scale: 0.96 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </AnimatePresence>
                                <button
                                    type="button"
                                    onClick={handleNextPhoto}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 border border-blue-200 text-blue-800 flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Next photo"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="px-4 py-3 border-t border-blue-100 bg-white">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">All Photos</p>
                                    <p className="text-xs text-slate-400">{lightboxPaused ? "Paused" : "Auto-playing"}</p>
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {galleryPhotos.map((photo, index) => {
                                        const isSelected = photo.id === selectedPhoto.id;
                                        return (
                                            <button
                                                key={photo.id}
                                                type="button"
                                                onClick={() =>
                                                    handleOpenPhoto(
                                                        photo.id,
                                                        index < selectedPhotoIndex ? -1 : 1
                                                    )
                                                }
                                                className={`relative h-14 w-20 rounded-md overflow-hidden border shrink-0 ${isSelected ? "border-blue-700 ring-1 ring-blue-700" : "border-blue-200"
                                                    }`}
                                                ref={isSelected ? selectedThumbRef : undefined}
                                            >
                                                <img
                                                    src={photo.image}
                                                    alt={photo.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Gallery;
