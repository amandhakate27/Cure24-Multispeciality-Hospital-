import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ClipboardList,
    MessageSquareQuote,
    Search,
    Trash2,
    Image,
    Upload,
    ImageOff,
    Video as VideoIcon,
} from "lucide-react";
import hospitalLogo from "../assets/images/reallogo1.png";
import Toast from "../components/common/Toast";
import { buildApiUrl, buildAssetUrl } from "../utils/api";
import { compressImage } from "../utils/imageCompressor";


const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

const emptyAppointmentFilters = {
    search: "",
    status: "all",
    from: "",
    to: "",
    view: "all",
};

const emptyFeedbackFilters = {
    search: "",
    from: "",
    to: "",
    sort: "newest",
};

const parseDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date;
};

const normalizeText = (value) => String(value || "").trim().toLowerCase();

const formatDate = (dateString) => {
    const date = parseDate(dateString);
    if (!date) return "N/A";
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const normalized = String(timeString).trim();
    if (!normalized) return "N/A";
    if (/am|pm/i.test(normalized)) {
        return normalized.replace(/\s*(am|pm)\s*/i, (_, period) => ` ${period.toUpperCase()}`);
    }
    const [hoursStr, minutesStr] = normalized.split(":");
    const hours = Number.parseInt(hoursStr, 10);
    if (!Number.isFinite(hours) || minutesStr === undefined) return normalized;

    const minutes = String(minutesStr).padStart(2, "0").slice(0, 2);
    const isPm = hours >= 12;
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${isPm ? "PM" : "AM"}`;
};

const formatDateTime = (dateString) => {
    const date = parseDate(dateString);
    if (!date) return "N/A";
    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const getStatusClasses = (status) => {
    switch (status) {
        case "confirmed":
            return "bg-cyan-100 text-cyan-800";
        case "completed":
            return "bg-emerald-100 text-emerald-800";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-amber-100 text-amber-800";
    }
};

const SectionTab = ({ active, onClick, label, count, icon: Icon }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl border px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition ${active
            ? "border-blue-700 bg-blue-700 text-white"
            : "border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
            }`}
    >
        <span className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {createElement(Icon, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0", "aria-hidden": "true" })}
            <span className="truncate">{label}</span>
        </span>
        {count !== undefined && (
            <span className={`rounded-full px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-xs shrink-0 ${active ? "bg-white/15 text-white" : "bg-blue-100 text-blue-800"}`}>
                {count}
            </span>
        )}
    </button>
);

const HeroSliderUpload = ({ onUpload, uploading }) => {
    const [file, setFile] = useState(null);
    const [altText, setAltText] = useState("");
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        if (f && f.type.startsWith("image/")) {
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const f = e.dataTransfer.files[0];
        if (f && f.type.startsWith("image/")) {
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onUpload(file, altText);
            setFile(null);
            setAltText("");
            setPreview(null);
        }
    };

    const handleCancel = () => {
        setFile(null);
        setAltText("");
        if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {!preview ? (
                <div
                    className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition min-h-[200px] flex flex-col items-center justify-center ${dragActive ? "border-blue-500 bg-blue-50" : "border-blue-200 hover:border-blue-400 cursor-pointer"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                        aria-label="Choose slider image"
                    />
                    <Upload className="mx-auto h-12 w-12 text-blue-500" />
                    <p className="mt-3 text-sm font-medium text-slate-700">
                        Add Slider Image
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Drag & drop or click to upload</p>
                    <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                </div>
            ) : (
                <div className="relative rounded-2xl border border-blue-200 bg-white overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="text-center text-white p-4">
                                <p className="font-medium">Preview</p>
                                <p className="text-xs opacity-80 mt-1">Alt: {altText || "No alt text"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 space-y-2 bg-slate-50">
                        <label className="flex flex-col gap-1 text-sm text-slate-700">
                            <span className="font-semibold text-slate-900">Alt Text</span>
                            <input
                                type="text"
                                value={altText}
                                onChange={(e) => setAltText(e.target.value)}
                                placeholder="e.g., Hospital entrance view"
                                className="rounded-xl border border-blue-200 bg-white px-3 py-2 outline-none transition focus:border-blue-500 text-sm"
                                disabled={uploading}
                            />
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {uploading ? "Adding..." : "Add to Slider"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};

const HeroSlideCard = ({ slide, onToggleActive, onDelete, isNew }) => {
    const imageUrl = buildAssetUrl(slide.imageUrl);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="group relative rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-sm transition hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 flex items-center justify-center">
                {!hasError ? (
                    <img
                        src={imageUrl}
                        alt={slide.altText}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                        crossOrigin="anonymous"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
                        <ImageOff className="h-8 w-8 mb-1 text-slate-300" />
                        <p className="text-xs">Image unavailable</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium shadow-lg ${
                        slide.isActive 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-500 text-white"
                    }`}>
                        {slide.isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                {/* Action buttons on hover */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={() => onToggleActive(slide)}
                        className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition shadow-lg ${
                            slide.isActive
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-emerald-500 text-white hover:bg-emerald-600"
                        }`}
                        title={slide.isActive ? "Remove from slider" : "Add to slider"}
                    >
                        {slide.isActive ? "Remove" : "Add to Slider"}
                    </button>
                    <button
                        onClick={() => onDelete(slide)}
                        className="rounded-xl bg-red-500 text-white px-3 py-2 text-sm font-medium transition hover:bg-red-600 shadow-lg"
                        title="Delete permanently"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <div className="p-3">
                <p className="text-sm font-medium text-slate-900 truncate" title={slide.altText}>
                    {slide.altText || "No alt text"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                    {isNew ? "New" : "Existing"} • {slide.isActive ? "Visible on homepage" : "Hidden from homepage"}
                </p>
            </div>
        </div>
    );
};

const VideoUpload = ({ onUpload, uploading }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        if (f && f.type.startsWith("video/")) {
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const f = e.dataTransfer.files[0];
        if (f && f.type.startsWith("video/")) {
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onUpload(file, title);
            setFile(null);
            setTitle("");
            setPreview(null);
        }
    };

    const handleCancel = () => {
        setFile(null);
        setTitle("");
        if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {!preview ? (
                <div
                    className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition min-h-[200px] flex flex-col items-center justify-center ${dragActive ? "border-blue-500 bg-blue-50" : "border-blue-200 hover:border-blue-400 cursor-pointer"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                        aria-label="Choose video file"
                    />
                    <Upload className="mx-auto h-12 w-12 text-blue-500" />
                    <p className="mt-3 text-sm font-medium text-slate-700">
                        Add Video
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Drag & drop or click to upload video</p>
                    <p className="text-xs text-slate-400">MP4, WebM up to 100MB</p>
                </div>
            ) : (
                <div className="relative rounded-2xl border border-blue-200 bg-white overflow-hidden">
                    <div className="relative aspect-video overflow-hidden bg-black">
                        <video src={preview} controls muted className="w-full h-full object-contain" />
                    </div>
                    <div className="p-3 space-y-2 bg-slate-50">
                        <label className="flex flex-col gap-1 text-sm text-slate-700">
                            <span className="font-semibold text-slate-900">Video Title</span>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Hospital Facilities Overview"
                                className="rounded-xl border border-blue-200 bg-white px-3 py-2 outline-none transition focus:border-blue-500 text-sm"
                                disabled={uploading}
                            />
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {uploading ? "Uploading Video..." : "Add Video"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};

const VideoCard = ({ video, onToggleActive, onDelete }) => {
    const videoUrl = buildAssetUrl(video.videoUrl);

    return (
        <div className="group relative rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-sm transition hover:shadow-lg">
            <div className="relative aspect-video overflow-hidden bg-slate-950 flex items-center justify-center">
                <video src={videoUrl} controls muted preload="metadata" className="w-full h-full object-contain" />
                <div className="absolute top-3 left-3 pointer-events-none">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium shadow-lg ${
                        video.useInVideosSection 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-500 text-white"
                    }`}>
                        {video.useInVideosSection ? "Active in Videos Section" : "Hidden"}
                    </span>
                </div>
            </div>
            <div className="p-3 space-y-3">
                <p className="text-sm font-medium text-slate-900 truncate" title={video.title}>
                    {video.title || "Hospital Video"}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => onToggleActive(video)}
                        className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition shadow-sm ${
                            video.useInVideosSection
                                ? "bg-amber-500 text-white hover:bg-amber-600"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                        title={video.useInVideosSection ? "Remove from Videos Section" : "Use in Videos Section"}
                    >
                        {video.useInVideosSection ? "In Videos Section" : "Use in Videos Section"}
                    </button>
                    <button
                        onClick={() => onDelete(video)}
                        className="inline-flex items-center justify-center rounded-xl bg-red-500 text-white px-3 py-2 text-xs font-semibold transition hover:bg-red-600 shadow-sm"
                        title="Delete video permanently"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [heroSlides, setHeroSlides] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeSection, setActiveSection] = useState("appointments");
    const [appointmentFilters, setAppointmentFilters] = useState(emptyAppointmentFilters);
    const [feedbackFilters, setFeedbackFilters] = useState(emptyFeedbackFilters);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [toast, setToast] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const toastTimer = useRef(null);

    const handleUnauthorized = useCallback(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin");
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return undefined;
        }

        let ignore = false;
        const controller = new AbortController();

        const fetchDashboardData = async () => {
            setIsLoading(true);
            setLoadError("");

            try {
                const [appointmentsResult, feedbackResult, heroSlidesResult, videosResult] = await Promise.allSettled([
                    fetch(buildApiUrl("/api/appointments"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                    fetch(buildApiUrl("/api/feedback"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                    fetch(buildApiUrl("/api/admin/hero-slider"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                    fetch(buildApiUrl("/api/admin/videos"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                ]);

                if (ignore) return;

                let unauthorized = false;
                let nextAppointments = [];
                let nextFeedback = [];
                let nextHeroSlides = [];
                let nextVideos = [];
                let nextError = "";

                if (appointmentsResult.status === "fulfilled") {
                    const response = appointmentsResult.value;
                    if (response.status === 401) {
                        unauthorized = true;
                    } else if (response.ok) {
                        const data = await response.json();
                        nextAppointments = data.appointments || [];
                    } else {
                        nextError = "Appointments could not be loaded.";
                    }
                } else if (appointmentsResult.reason?.name !== "AbortError") {
                    nextError = "Appointments could not be loaded.";
                }

                if (feedbackResult.status === "fulfilled") {
                    const response = feedbackResult.value;
                    if (response.status === 401) {
                        unauthorized = true;
                    } else if (response.ok) {
                        const data = await response.json();
                        nextFeedback = data.feedback || [];
                    } else {
                        nextError = nextError || "Feedback could not be loaded.";
                    }
                } else if (feedbackResult.reason?.name !== "AbortError") {
                    nextError = nextError || "Feedback could not be loaded.";
                }

                if (heroSlidesResult.status === "fulfilled") {
                    const response = heroSlidesResult.value;
                    if (response.status === 401) {
                        unauthorized = true;
                    } else if (response.ok) {
                        const data = await response.json();
                        nextHeroSlides = data.slides || [];
                    }
                } else if (heroSlidesResult.reason?.name !== "AbortError") {
                    nextError = nextError || "Slider images could not be loaded.";
                }

                if (videosResult.status === "fulfilled") {
                    const response = videosResult.value;
                    if (response.status === 401) {
                        unauthorized = true;
                    } else if (response.ok) {
                        const data = await response.json();
                        nextVideos = data.videos || [];
                    }
                }

                if (unauthorized) {
                    handleUnauthorized();
                    return;
                }

                setAppointments(nextAppointments);
                setFeedbackList(nextFeedback);
                setHeroSlides(nextHeroSlides);
                setVideos(nextVideos);
                setLoadError(nextError);
            } catch (error) {
                if (error.name === "AbortError") return;
                if (!ignore) {
                    setAppointments([]);
                    setFeedbackList([]);
                    setHeroSlides([]);
                    setVideos([]);
                    setLoadError("Dashboard data could not be loaded. Please refresh.");
                }
            } finally {
                if (!ignore) setIsLoading(false);
            }
        };

        fetchDashboardData();

        return () => {
            ignore = true;
            controller.abort();
        };
    }, [handleUnauthorized, navigate]);

    useEffect(() => {
        if (!toast) return undefined;
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 3200);
        return () => clearTimeout(toastTimer.current);
    }, [toast]);

    const updateAppointmentFilter = (key, value) => {
        setAppointmentFilters((prev) => ({ ...prev, [key]: value }));
    };

    const updateFeedbackFilter = (key, value) => {
        setFeedbackFilters((prev) => ({ ...prev, [key]: value }));
    };

    const toggleTestimonial = async (feedback) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const response = await fetch(buildApiUrl(`/api/feedback/${feedback._id}/testimonial`), {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ showOnTestimonials: !feedback.showOnTestimonials }),
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Failed to update testimonial state");

            const data = await response.json();
            setFeedbackList((prev) => prev.map((item) => (item._id === feedback._id ? data.feedback : item)));
            setToast({
                variant: "success",
                title: data.feedback.showOnTestimonials ? "Sent to testimonials" : "Removed from testimonials",
                message: `${feedback.name || "Feedback"} was updated successfully.`,
            });
        } catch {
            setToast({
                variant: "error",
                title: "Update failed",
                message: "Testimonial state could not be updated.",
            });
        }
    };

    const updateStatus = async (id, nextStatus) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const response = await fetch(buildApiUrl(`/api/appointments/${id}`), {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: nextStatus }),
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Failed to update status");

            const data = await response.json();
            setAppointments((prev) => prev.map((item) => (item._id === id ? data.appointment : item)));
            setToast({
                variant: "success",
                title: "Status updated",
                message: `Appointment marked as ${nextStatus}.`,
            });
        } catch {
            setToast({
                variant: "error",
                title: "Update failed",
                message: "Appointment status could not be updated.",
            });
        }
    };

    const confirmDelete = (item) => {
        setPendingDelete(item);
    };

    const handleDelete = async () => {
        if (!pendingDelete) return;

        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        const { id, type, name } = pendingDelete;
        const endpoint = type === "feedback" ? `/api/feedback/${id}` : `/api/appointments/${id}`;

        try {
            const response = await fetch(buildApiUrl(endpoint), {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Delete failed");

            if (type === "feedback") {
                setFeedbackList((prev) => prev.filter((item) => item._id !== id));
            } else {
                setAppointments((prev) => prev.filter((item) => item._id !== id));
            }

            setToast({
                variant: "delete",
                title: `${type === "feedback" ? "Feedback" : "Appointment"} deleted`,
                message: `${name || "Record"} was removed successfully.`,
            });
        } catch {
            setToast({
                variant: "error",
                title: "Delete failed",
                message: `Unable to delete this ${type === "feedback" ? "feedback" : "appointment"}.`,
            });
        } finally {
            setPendingDelete(null);
        }
    };

    const uploadHeroSlide = async (file, altText) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        setUploading(true);
        try {
            // Compress image client-side before upload (~70% size reduction)
            const compressed = await compressImage(file, { maxWidth: 1920, maxHeight: 1080, quality: 0.82 });

            const formData = new FormData();
            formData.append("image", compressed);
            if (altText) formData.append("altText", altText);

            const response = await fetch(buildApiUrl("/api/admin/hero-slider"), {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            setHeroSlides((prev) => [...prev, data.slide].sort((a, b) => a.order - b.order));
            setToast({
                variant: "success",
                title: "Image uploaded",
                message: "Slider image added successfully.",
            });
        } catch {
            setToast({
                variant: "error",
                title: "Upload failed",
                message: "Could not upload image. Please try again.",
            });
        } finally {
            setUploading(false);
        }
    };


    const toggleHeroSlideActive = async (slide) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const response = await fetch(buildApiUrl(`/api/admin/hero-slider/${slide._id}`), {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: !slide.isActive }),
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Failed to update slide");

            const data = await response.json();
            setHeroSlides((prev) => prev.map((item) => (item._id === slide._id ? data.slide : item)));
            setToast({
                variant: "success",
                title: data.slide.isActive ? "Slide activated" : "Slide deactivated",
                message: "Slider image updated successfully.",
            });
        } catch {
            setToast({
                variant: "error",
                title: "Update failed",
                message: "Could not update slide status.",
            });
        }
    };

    const deleteHeroSlide = async (slide) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const response = await fetch(buildApiUrl(`/api/admin/hero-slider/${slide._id}`), {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Delete failed");

            setHeroSlides((prev) => prev.filter((item) => item._id !== slide._id));
            setToast({
                variant: "delete",
                title: "Slide deleted",
                message: "Slider image removed successfully.",
            });
        } catch {
            setToast({
                variant: "error",
                title: "Delete failed",
                message: "Could not delete slide.",
            });
        }
    };

    // Video management functions
    const uploadVideo = async (file, title) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        setUploadingVideo(true);
        try {
            const formData = new FormData();
            formData.append("video", file);
            if (title) formData.append("title", title);

            const response = await fetch(buildApiUrl("/api/admin/videos"), {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            setVideos((prev) => [data.video, ...prev]);
            setToast({
                variant: "success",
                title: "Video uploaded",
                message: "Video added successfully.",
            });
        } catch {
            setToast({
                variant: "error",
                title: "Upload failed",
                message: "Could not upload video. Please try again.",
            });
        } finally {
            setUploadingVideo(false);
        }
    };

    const toggleVideoActive = async (video) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const response = await fetch(buildApiUrl(`/api/admin/videos/${video._id}`), {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ useInVideosSection: !video.useInVideosSection }),
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Failed to update video");

            const data = await response.json();
            setVideos((prev) => prev.map((item) => (item._id === video._id ? data.video : item)));
            setToast({
                variant: "success",
                title: data.video.useInVideosSection ? "Added to Videos Section" : "Removed from Videos Section",
                message: "Video visibility updated successfully.",
            });
        } catch {
            setToast({
                variant: "error",
                title: "Update failed",
                message: "Could not update video status.",
            });
        }
    };

    const deleteVideo = async (video) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const response = await fetch(buildApiUrl(`/api/admin/videos/${video._id}`), {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) throw new Error("Delete failed");

            setVideos((prev) => prev.filter((item) => item._id !== video._id));
            setToast({
                variant: "delete",
                title: "Video deleted",
                message: "Video removed successfully.",
            });
        } catch {
            setToast({
                variant: "error",
                title: "Delete failed",
                message: "Could not delete video.",
            });
        }
    };

    const filteredAppointments = appointments
        .filter((appointment) => {
            const appointmentDate = parseDate(appointment.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const query = normalizeText(appointmentFilters.search);

            if (appointmentFilters.view === "past") {
                if (!appointmentDate) return false;
                const normalizedDate = new Date(appointmentDate);
                normalizedDate.setHours(0, 0, 0, 0);
                if (normalizedDate >= today) return false;
            }

            if (appointmentFilters.view === "today") {
                if (!appointmentDate) return false;
                const normalizedDate = new Date(appointmentDate);
                normalizedDate.setHours(0, 0, 0, 0);
                if (normalizedDate.getTime() !== today.getTime()) return false;
            }

            if (appointmentFilters.status !== "all" && appointment.status !== appointmentFilters.status) return false;

            if (appointmentFilters.from) {
                const fromDate = new Date(appointmentFilters.from);
                fromDate.setHours(0, 0, 0, 0);
                if (!appointmentDate || appointmentDate < fromDate) return false;
            }

            if (appointmentFilters.to) {
                const toDate = new Date(appointmentFilters.to);
                toDate.setHours(23, 59, 59, 999);
                if (!appointmentDate || appointmentDate > toDate) return false;
            }

            if (query) {
                const values = [
                    appointment.name,
                    appointment.email,
                    appointment.phone,
                    appointment.department,
                    appointment.doctor,
                ].map(normalizeText);
                if (!values.some((value) => value.includes(query))) return false;
            }

            return true;
        })
        .sort((a, b) => {
            const dateA = parseDate(a.date)?.getTime() || 0;
            const dateB = parseDate(b.date)?.getTime() || 0;
            return dateB - dateA;
        });

    const filteredFeedback = feedbackList
        .filter((feedback) => {
            const createdAt = parseDate(feedback.createdAt);
            const query = normalizeText(feedbackFilters.search);

            if (feedbackFilters.from) {
                const fromDate = new Date(feedbackFilters.from);
                fromDate.setHours(0, 0, 0, 0);
                if (!createdAt || createdAt < fromDate) return false;
            }

            if (feedbackFilters.to) {
                const toDate = new Date(feedbackFilters.to);
                toDate.setHours(23, 59, 59, 999);
                if (!createdAt || createdAt > toDate) return false;
            }

            if (query) {
                const values = [feedback.name, feedback.email, feedback.phone, feedback.subject, feedback.message].map(normalizeText);
                if (!values.some((value) => value.includes(query))) return false;
            }

            return true;
        })
        .sort((a, b) => {
            const timeA = parseDate(a.createdAt)?.getTime() || 0;
            const timeB = parseDate(b.createdAt)?.getTime() || 0;
            return feedbackFilters.sort === "oldest" ? timeA - timeB : timeB - timeA;
        });

    return (
        <div className="h-screen overflow-hidden bg-[linear-gradient(180deg,#041AA9_0%,#0A2FC6_30%,#1E3FAE_60%,#0D2B9A_100%)] p-3 sm:p-4">
            {toast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
                    <Toast variant={toast.variant} title={toast.title} message={toast.message} onClose={() => setToast(null)} />
                </div>
            )}

            <div className="mx-auto flex h-full w-full flex-col gap-4">
                {/* Header */}
                <section className="shrink-0 rounded-2xl sm:rounded-[28px] border border-white/15 bg-white/10 shadow-[0_30px_80px_-35px_rgba(2,12,74,0.75)] backdrop-blur-sm">
                    {/* Mobile header: logo + logout in a row, title below */}
                    <div className="px-4 py-3 sm:px-5 sm:py-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="rounded-xl bg-white/95 px-3 py-1.5 shadow-lg shadow-blue-950/10 shrink-0">
                                <img src={hospitalLogo} alt="Cure24 Hospital" className="h-8 sm:h-10 w-auto" loading="eager" />
                            </div>
                            <div className="flex-1 text-center">
                                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight">Admin Dashboard</h1>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("adminToken");
                                    navigate("/admin");
                                }}
                                className="shrink-0 rounded-xl border border-red-400/30 bg-red-600 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                        <p className="mt-1.5 text-center text-xs text-blue-100/80 hidden sm:block">Manage appointments, patient feedback, slider images &amp; hospital videos.</p>
                    </div>
                </section>
                {loadError && (
                    <div className="shrink-0 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-sm">
                        {loadError}
                    </div>
                )}

                <div className="grid min-h-0 flex-1 gap-3 sm:gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-stretch overflow-hidden">
                    {/* Sidebar tabs */}
                    <aside className="rounded-2xl sm:rounded-[28px] border border-blue-100 bg-white p-3 sm:p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] overflow-y-auto lg:flex lg:h-full lg:flex-col">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1 lg:gap-3">
                            <SectionTab
                                active={activeSection === "appointments"}
                                onClick={() => setActiveSection("appointments")}
                                icon={ClipboardList}
                                label="Appointments"
                                count={appointments.length}
                            />
                            <SectionTab
                                active={activeSection === "feedback"}
                                onClick={() => setActiveSection("feedback")}
                                icon={MessageSquareQuote}
                                label="Feedback"
                                count={feedbackList.length}
                            />
                            <SectionTab
                                active={activeSection === "hero-slider"}
                                onClick={() => setActiveSection("hero-slider")}
                                icon={Image}
                                label="Slider Images"
                                count={heroSlides.length}
                            />
                            <SectionTab
                                active={activeSection === "videos"}
                                onClick={() => setActiveSection("videos")}
                                icon={VideoIcon}
                                label="Videos"
                                count={videos.length}
                            />
                        </div>
                    </aside>

                    <div className="flex h-full min-h-0 flex-col min-w-0 overflow-hidden">
                        {activeSection === "appointments" && (
                            <section className="flex h-full min-h-0 flex-col rounded-2xl sm:rounded-[28px] border border-blue-100 bg-white p-3 sm:p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Appointments</p>
                                        <h2 className="mt-1 text-2xl font-bold text-slate-900">Patient Appointments</h2>
                                    </div>
                                </div>

                                <div className="mt-2 sm:mt-6 shrink-0 grid grid-cols-2 gap-2 sm:gap-3 rounded-2xl sm:rounded-[24px] border border-blue-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#F8FBFF_100%)] p-2 sm:p-3 md:grid-cols-2 xl:grid-cols-7">
                                    <label className="col-span-2 flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700 xl:col-span-2">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">Search</span>
                                        <div className="relative">
                                            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-blue-500" />
                                            <input
                                                type="text"
                                                value={appointmentFilters.search}
                                                onChange={(event) => updateAppointmentFilter("search", event.target.value)}
                                                placeholder="Name, phone, email, department"
                                                className="w-full rounded-xl sm:rounded-2xl border border-blue-200 bg-white py-1.5 pl-8 pr-2.5 sm:py-2.5 sm:pl-10 sm:pr-4 text-xs sm:text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">Status</span>
                                        <select
                                            value={appointmentFilters.status}
                                            onChange={(event) => updateAppointmentFilter("status", event.target.value)}
                                            className="rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm outline-none transition focus:border-blue-500"
                                        >
                                            <option value="all">All</option>
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">View</span>
                                        <select
                                            value={appointmentFilters.view}
                                            onChange={(event) => updateAppointmentFilter("view", event.target.value)}
                                            className="rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm outline-none transition focus:border-blue-500"
                                        >
                                            <option value="all">All</option>
                                            <option value="today">Today</option>
                                            <option value="past">Past</option>
                                        </select>
                                    </label>
                                    <label className="flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">From</span>
                                        <input
                                            type="date"
                                            value={appointmentFilters.from}
                                            onChange={(event) => updateAppointmentFilter("from", event.target.value)}
                                            className="rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm outline-none transition focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">To</span>
                                        <input
                                            type="date"
                                            value={appointmentFilters.to}
                                            onChange={(event) => updateAppointmentFilter("to", event.target.value)}
                                            className="rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm outline-none transition focus:border-blue-500"
                                        />
                                    </label>
                                    <div className="col-span-2 xl:col-span-1 flex items-end xl:self-end mt-1 sm:mt-0">
                                        <button
                                            type="button"
                                            onClick={() => setAppointmentFilters(emptyAppointmentFilters)}
                                            className="w-full rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-blue-900 transition hover:bg-blue-100 whitespace-nowrap"
                                        >
                                            Clear filters
                                        </button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="mt-6 flex min-h-0 flex-1 items-center justify-center rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading appointments...</div>
                                ) : filteredAppointments.length === 0 ? (
                                    <div className="mt-6 flex min-h-0 flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                        <p className="text-lg font-semibold text-slate-700">No appointments found</p>
                                        <p className="mt-2 text-sm text-slate-500">Try clearing filters or changing the date range.</p>
                                    </div>
                                ) : (
                                    <div className="mt-6 min-h-0 flex-1 overflow-hidden rounded-[24px] border border-blue-100">
                                        <div className="h-full overflow-auto">
                                            <table className="w-full min-w-[1120px] divide-y divide-blue-100 text-sm">
                                                <thead className="sticky top-0 z-10 bg-blue-50 text-left text-slate-700">
                                                    <tr>
                                                        <th className="px-4 py-3 font-semibold">Patient</th>
                                                        <th className="px-4 py-3 font-semibold">Contact</th>
                                                        <th className="px-4 py-3 font-semibold">Date</th>
                                                        <th className="px-4 py-3 font-semibold">Time</th>
                                                        <th className="px-4 py-3 font-semibold">Department</th>
                                                        <th className="px-4 py-3 font-semibold">Doctor</th>
                                                        <th className="px-4 py-3 font-semibold">Status</th>
                                                        <th className="px-4 py-3 font-semibold">Created</th>
                                                        <th className="px-4 py-3 text-center font-semibold">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-blue-50 bg-white">
                                                    {filteredAppointments.map((appointment) => (
                                                        <tr key={appointment._id} className="align-top">
                                                            <td className="px-4 py-4">
                                                                <p className="font-semibold text-slate-900">{appointment.name || "N/A"}</p>
                                                            </td>
                                                            <td className="px-4 py-4 text-slate-700">
                                                                <p>{appointment.phone || "N/A"}</p>
                                                                <p className="mt-1 break-all text-slate-500">{appointment.email || "N/A"}</p>
                                                            </td>
                                                            <td className="px-4 py-4 text-slate-700">{formatDate(appointment.date)}</td>
                                                            <td className="px-4 py-4 text-slate-700">{formatTime(appointment.time)}</td>
                                                            <td className="px-4 py-4 text-slate-700">{appointment.department || "N/A"}</td>
                                                            <td className="px-4 py-4 text-slate-700">{appointment.doctor || "N/A"}</td>
                                                            <td className="px-4 py-4">
                                                                <div className="flex flex-col gap-2">
                                                                    <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(appointment.status)}`}>
                                                                        {appointment.status || "pending"}
                                                                    </span>
                                                                    <select
                                                                        value={appointment.status || "pending"}
                                                                        onChange={(event) => updateStatus(appointment._id, event.target.value)}
                                                                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-700 outline-none transition focus:border-blue-500"
                                                                    >
                                                                        {statusOptions.map((status) => (
                                                                            <option key={status} value={status}>
                                                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-slate-700">{formatDateTime(appointment.createdAt)}</td>
                                                            <td className="px-4 py-4 text-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => confirmDelete({ id: appointment._id, type: "appointment", name: appointment.name })}
                                                                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {activeSection === "feedback" && (
                            <section className="flex h-full min-h-0 flex-col rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Feedback</p>
                                        <h2 className="mt-1 text-2xl font-bold text-slate-900">Patient Feedback</h2>
                                    </div>
                                </div>

                                <div className="mt-2 sm:mt-6 shrink-0 grid grid-cols-2 gap-2 sm:gap-3 rounded-2xl sm:rounded-[24px] border border-blue-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#F8FBFF_100%)] p-2 sm:p-3 md:grid-cols-2 xl:grid-cols-6">
                                    <label className="col-span-2 flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700 xl:col-span-2">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">Search</span>
                                        <div className="relative">
                                            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-blue-500" />
                                            <input
                                                type="text"
                                                value={feedbackFilters.search}
                                                onChange={(event) => updateFeedbackFilter("search", event.target.value)}
                                                placeholder="Name, phone, email, subject, message"
                                                className="w-full rounded-xl sm:rounded-2xl border border-blue-200 bg-white py-1.5 pl-8 pr-2.5 sm:py-2.5 sm:pl-10 sm:pr-4 text-xs sm:text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">From</span>
                                        <input
                                            type="date"
                                            value={feedbackFilters.from}
                                            onChange={(event) => updateFeedbackFilter("from", event.target.value)}
                                            className="rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm outline-none transition focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">To</span>
                                        <input
                                            type="date"
                                            value={feedbackFilters.to}
                                            onChange={(event) => updateFeedbackFilter("to", event.target.value)}
                                            className="rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm outline-none transition focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-0.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900">Sort</span>
                                        <select
                                            value={feedbackFilters.sort}
                                            onChange={(event) => updateFeedbackFilter("sort", event.target.value)}
                                            className="rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm outline-none transition focus:border-blue-500"
                                        >
                                            <option value="newest">Newest first</option>
                                            <option value="oldest">Oldest first</option>
                                        </select>
                                    </label>
                                    <div className="flex items-end xl:self-end mt-1 sm:mt-0">
                                        <button
                                            type="button"
                                            onClick={() => setFeedbackFilters(emptyFeedbackFilters)}
                                            className="w-full rounded-xl sm:rounded-2xl border border-blue-200 bg-white px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-blue-900 transition hover:bg-blue-100 whitespace-nowrap"
                                        >
                                            Clear filters
                                        </button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="mt-6 flex min-h-0 flex-1 items-center justify-center rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading feedback...</div>
                                ) : filteredFeedback.length === 0 ? (
                                    <div className="mt-6 flex min-h-0 flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                        <p className="text-lg font-semibold text-slate-700">No feedback found</p>
                                        <p className="mt-2 text-sm text-slate-500">Try clearing filters or changing the date range.</p>
                                    </div>
                                ) : (
                                    <div className="mt-6 min-h-0 flex-1 overflow-hidden rounded-[24px] border border-blue-100">
                                        <div className="h-full overflow-auto">
                                            <table className="w-full min-w-[1180px] divide-y divide-blue-100 text-sm">
                                                <thead className="sticky top-0 z-10 bg-blue-50 text-left text-slate-700">
                                                    <tr>
                                                        <th className="px-4 py-3 font-semibold">Patient</th>
                                                        <th className="px-4 py-3 font-semibold">Contact</th>
                                                        <th className="px-4 py-3 font-semibold">Subject</th>
                                                        <th className="px-4 py-3 font-semibold">Message</th>
                                                        <th className="px-4 py-3 font-semibold">Submitted</th>
                                                        <th className="px-4 py-3 text-center font-semibold">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-blue-50 bg-white">
                                                    {filteredFeedback.map((feedback) => (
                                                        <tr key={feedback._id} className="align-top">
                                                            <td className="px-4 py-4">
                                                                <p className="font-semibold text-slate-900">{feedback.name || "N/A"}</p>
                                                            </td>
                                                            <td className="px-4 py-4 text-slate-700">
                                                                <p>{feedback.phone || "N/A"}</p>
                                                                <p className="mt-1 break-all text-slate-500">{feedback.email || "N/A"}</p>
                                                            </td>
                                                            <td className="px-4 py-4 text-slate-700">{feedback.subject || "No subject"}</td>
                                                            <td className="px-4 py-4 text-slate-700">
                                                                <div className="max-w-xl whitespace-pre-wrap leading-6">{feedback.message || "N/A"}</div>
                                                            </td>
                                                            <td className="px-4 py-4 text-slate-700">{formatDateTime(feedback.createdAt)}</td>
                                                            <td className="px-4 py-4 text-center">
                                                                <div className="flex min-w-[170px] flex-col items-center gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => toggleTestimonial(feedback)}
                                                                        className={`inline-flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition ${feedback.showOnTestimonials ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"}`}
                                                                    >
                                                                        {feedback.showOnTestimonials ? "In Testimonials" : "Send to Testimonials"}
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => confirmDelete({ id: feedback._id, type: "feedback", name: feedback.name })}
                                                                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {activeSection === "hero-slider" && (
                            <section className="flex h-full min-h-0 flex-col rounded-[28px] border border-blue-100 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)]">
                                <div className="shrink-0 p-4 sm:p-6 border-b border-blue-100">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Slider Images</p>
                                            <h2 className="mt-1 text-2xl font-bold text-slate-900">Homepage Slider Images</h2>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                                                {heroSlides.filter(s => s.isActive).length} Active
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                                                {heroSlides.length} Total
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 min-h-0 overflow-auto p-4 sm:p-6">
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full">
                                        {/* Upload Card - always first */}
                                        <HeroSliderUpload 
                                            onUpload={uploadHeroSlide} 
                                            uploading={uploading} 
                                        />
                                        
                                        {/* Existing Slides */}
                                        {heroSlides.length === 0 ? (
                                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                                <ImageOff className="h-16 w-16 text-slate-300" />
                                                <p className="mt-4 text-lg font-medium text-slate-700">No slider images yet</p>
                                                <p className="mt-1 text-sm text-slate-500">Click above to add your first slider image</p>
                                            </div>
                                        ) : (
                                            heroSlides.map((slide) => (
                                                <HeroSlideCard
                                                    key={slide._id}
                                                    slide={slide}
                                                    onToggleActive={toggleHeroSlideActive}
                                                    onDelete={deleteHeroSlide}
                                                    isNew={false}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeSection === "videos" && (
                            <section className="flex h-full min-h-0 flex-col rounded-[28px] border border-blue-100 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)]">
                                <div className="shrink-0 p-4 sm:p-6 border-b border-blue-100">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Videos</p>
                                            <h2 className="mt-1 text-2xl font-bold text-slate-900">Hospital Videos</h2>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                                                {videos.filter(v => v.useInVideosSection).length} Active in Videos Section
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                                                {videos.length} Total
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 min-h-0 overflow-auto p-4 sm:p-6">
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-full">
                                        {/* Upload Video Card */}
                                        <VideoUpload 
                                            onUpload={uploadVideo} 
                                            uploading={uploadingVideo} 
                                        />
                                        
                                        {/* Existing Videos */}
                                        {videos.length === 0 ? (
                                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                                <VideoIcon className="h-16 w-16 text-slate-300" />
                                                <p className="mt-4 text-lg font-medium text-slate-700">No videos uploaded yet</p>
                                                <p className="mt-1 text-sm text-slate-500">Click above to upload your first hospital video</p>
                                            </div>
                                        ) : (
                                            videos.map((video) => (
                                                <VideoCard
                                                    key={video._id}
                                                    video={video}
                                                    onToggleActive={toggleVideoActive}
                                                    onDelete={deleteVideo}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {pendingDelete && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[28px] border border-red-200 bg-white p-7 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-red-100 p-3 text-red-700">
                                <Trash2 className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Delete {pendingDelete.type === "feedback" ? "Feedback" : "Appointment"}?</h3>
                                <p className="text-sm text-slate-500">This action cannot be undone.</p>
                            </div>
                        </div>
                        <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                            {pendingDelete.name || "This record"} will be removed permanently from the dashboard.
                        </p>
                        <div className="mt-7 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setPendingDelete(null)}
                                className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Delete now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
