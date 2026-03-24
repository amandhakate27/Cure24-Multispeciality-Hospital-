
import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ClipboardList, MessageSquareQuote,
    Search,
    Trash2,
} from "lucide-react";
import hospitalLogo from "../assets/images/reallogo1.png";
import Toast from "../components/common/Toast";
import { buildApiUrl } from "../utils/api";

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
        className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${active
            ? "border-blue-700 bg-blue-700 text-white"
            : "border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
            }`}
    >
        <span className="flex items-center gap-2">
            {createElement(Icon, { className: "h-4 w-4", "aria-hidden": "true" })}
            {label}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs ${active ? "bg-white/15 text-white" : "bg-blue-100 text-blue-800"}`}>
            {count}
        </span>
    </button>
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [activeSection, setActiveSection] = useState("appointments");
    const [appointmentFilters, setAppointmentFilters] = useState(emptyAppointmentFilters);
    const [feedbackFilters, setFeedbackFilters] = useState(emptyFeedbackFilters);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [toast, setToast] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
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
                const [appointmentsResult, feedbackResult] = await Promise.allSettled([
                    fetch(buildApiUrl("/api/appointments"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                    fetch(buildApiUrl("/api/feedback"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                ]);

                if (ignore) return;

                let unauthorized = false;
                let nextAppointments = [];
                let nextFeedback = [];
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

                if (unauthorized) {
                    handleUnauthorized();
                    return;
                }

                setAppointments(nextAppointments);
                setFeedbackList(nextFeedback);
                setLoadError(nextError);
            } catch (error) {
                if (error.name === "AbortError") return;
                if (!ignore) {
                    setAppointments([]);
                    setFeedbackList([]);
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
    }; const filteredAppointments = appointments
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
        <div className="min-h-screen bg-[linear-gradient(180deg,#041AA9_0%,#0A2FC6_30%,#1E3FAE_60%,#0D2B9A_100%)] px-4 py-6">
            {toast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
                    <Toast variant={toast.variant} title={toast.title} message={toast.message} onClose={() => setToast(null)} />
                </div>
            )}

            <div className="mx-auto max-w-7xl space-y-6">
                <section className="rounded-[28px] border border-white/15 bg-white/10 shadow-[0_30px_80px_-35px_rgba(2,12,74,0.75)] backdrop-blur-sm">
                    <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                        <div className="flex items-center justify-center lg:justify-start">
                            <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg shadow-blue-950/10">
                                <img src={hospitalLogo} alt="Cure24 Hospital" className="h-12 w-auto" loading="eager" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white sm:text-4xl">Admin Dashboard</h1>
                            <p className="mt-2 text-sm text-blue-100/90">Manage appointments, patient feedback, and daily operations of Cure24 Hospital.</p>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("adminToken");
                                    navigate("/admin");
                                }}
                                className="rounded-2xl border border-red-400/30 bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </section>
                {loadError && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-sm">
                        {loadError}
                    </div>
                )}

                <section className="mx-auto max-w-md rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
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
                    </div>
                </section>

                {activeSection === "appointments" && (
                    <section className="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Appointments</p>
                                <h2 className="mt-1 text-2xl font-bold text-slate-900">Patient Appointments</h2>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 rounded-[24px] border border-blue-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#F8FBFF_100%)] p-4 md:grid-cols-2 xl:grid-cols-6">
                            <label className="flex flex-col gap-2 text-sm text-slate-700 xl:col-span-2">
                                <span className="font-semibold text-slate-900">Search</span>
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
                                    <input
                                        type="text"
                                        value={appointmentFilters.search}
                                        onChange={(event) => updateAppointmentFilter("search", event.target.value)}
                                        placeholder="Name, phone, email, department"
                                        className="w-full rounded-2xl border border-blue-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">Status</span>
                                <select
                                    value={appointmentFilters.status}
                                    onChange={(event) => updateAppointmentFilter("status", event.target.value)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                >
                                    <option value="all">All</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">View</span>
                                <select
                                    value={appointmentFilters.view}
                                    onChange={(event) => updateAppointmentFilter("view", event.target.value)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                >
                                    <option value="all">All</option>
                                    <option value="today">Today</option>
                                    <option value="past">Past</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">From</span>
                                <input
                                    type="date"
                                    value={appointmentFilters.from}
                                    onChange={(event) => updateAppointmentFilter("from", event.target.value)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">To</span>
                                <input
                                    type="date"
                                    value={appointmentFilters.to}
                                    onChange={(event) => updateAppointmentFilter("to", event.target.value)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                />
                            </label>
                            <div className="flex flex-col gap-2 text-sm text-slate-700 xl:justify-end">
                                <span className="font-semibold text-slate-900">Reset</span>
                                <button
                                    type="button"
                                    onClick={() => setAppointmentFilters(emptyAppointmentFilters)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 font-semibold text-blue-900 transition hover:bg-blue-100"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="mt-6 rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading appointments...</div>
                        ) : filteredAppointments.length === 0 ? (
                            <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                <p className="text-lg font-semibold text-slate-700">No appointments found</p>
                                <p className="mt-2 text-sm text-slate-500">Try clearing filters or changing the date range.</p>
                            </div>
                        ) : (
                            <div className="mt-6 overflow-hidden rounded-[24px] border border-blue-100">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1120px] divide-y divide-blue-100 text-sm">
                                        <thead className="bg-blue-50 text-left text-slate-700">
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
                    <section className="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Feedback</p>
                                <h2 className="mt-1 text-2xl font-bold text-slate-900">Patient Feedback</h2>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 rounded-[24px] border border-blue-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#F8FBFF_100%)] p-4 md:grid-cols-2 xl:grid-cols-5">
                            <label className="flex flex-col gap-2 text-sm text-slate-700 xl:col-span-2">
                                <span className="font-semibold text-slate-900">Search</span>
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
                                    <input
                                        type="text"
                                        value={feedbackFilters.search}
                                        onChange={(event) => updateFeedbackFilter("search", event.target.value)}
                                        placeholder="Name, phone, email, subject, message"
                                        className="w-full rounded-2xl border border-blue-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">From</span>
                                <input
                                    type="date"
                                    value={feedbackFilters.from}
                                    onChange={(event) => updateFeedbackFilter("from", event.target.value)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">To</span>
                                <input
                                    type="date"
                                    value={feedbackFilters.to}
                                    onChange={(event) => updateFeedbackFilter("to", event.target.value)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">Sort</span>
                                <select
                                    value={feedbackFilters.sort}
                                    onChange={(event) => updateFeedbackFilter("sort", event.target.value)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                >
                                    <option value="newest">Newest first</option>
                                    <option value="oldest">Oldest first</option>
                                </select>
                            </label>
                            <div className="flex flex-col gap-2 text-sm text-slate-700 xl:justify-end">
                                <span className="font-semibold text-slate-900">Reset</span>
                                <button
                                    type="button"
                                    onClick={() => setFeedbackFilters(emptyFeedbackFilters)}
                                    className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 font-semibold text-blue-900 transition hover:bg-blue-100"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="mt-6 rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading feedback...</div>
                        ) : filteredFeedback.length === 0 ? (
                            <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                <p className="text-lg font-semibold text-slate-700">No feedback found</p>
                                <p className="mt-2 text-sm text-slate-500">Try clearing filters or changing the date range.</p>
                            </div>
                        ) : (
                            <div className="mt-6 overflow-hidden rounded-[24px] border border-blue-100">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1180px] divide-y divide-blue-100 text-sm">
                                        <thead className="bg-blue-50 text-left text-slate-700">
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







