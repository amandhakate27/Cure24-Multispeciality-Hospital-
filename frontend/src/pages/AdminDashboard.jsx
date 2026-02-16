import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalLogo from "../assets/images/reallogo1.png";
import Toast from "../components/common/Toast";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const statusOptions = ["pending", "confirmed", "completed", "cancelled"];
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showPastOnly, setShowPastOnly] = useState(false);
    const [toast, setToast] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const toastTimer = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        const fetchAppointments = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
                const response = await fetch(`${apiBase}/api/appointments`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to load appointments");
                }

                const data = await response.json();
                setAppointments(data.appointments || []);
            } catch (error) {
                console.error(error);
                setAppointments([]);
            }
        };

        fetchAppointments();
    }, [navigate]);

    const updateStatus = async (id, nextStatus) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
            const response = await fetch(`${apiBase}/api/appointments/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: nextStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            const data = await response.json();
            setAppointments((prev) =>
                prev.map((item) => (item._id === id ? data.appointment : item))
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        try {
            const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
            const response = await fetch(`${apiBase}/api/appointments/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Failed to delete appointment");
            }

            setAppointments((prev) => prev.filter((item) => item._id !== id));
            setToast({
                variant: "delete",
                title: "Appointment deleted",
                message: "The appointment was removed successfully.",
            });
        } catch (error) {
            console.error(error);
            setToast({
                variant: "error",
                title: "Delete failed",
                message: "Unable to delete appointment. Please try again.",
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
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
        if (!Number.isFinite(hours) || minutesStr === undefined) {
            return normalized;
        }

        const minutes = String(minutesStr).padStart(2, "0").slice(0, 2);
        const isPm = hours >= 12;
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${isPm ? "PM" : "AM"}`;
    };

    const parseAppointmentDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return null;
        return date;
    };

    const isPastAppointment = (dateString) => {
        const date = parseAppointmentDate(dateString);
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const filteredAppointments = appointments
        .filter((appointment) => {
            const appointmentDate = parseAppointmentDate(appointment.date);
            if (showPastOnly) {
                if (!appointmentDate) return false;
                if (!isPastAppointment(appointment.date)) return false;
            }

            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (appointmentDate && appointmentDate < start) return false;
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                if (appointmentDate && appointmentDate > end) return false;
            }

            return true;
        })
        .sort((a, b) => {
            const dateA = parseAppointmentDate(a.date);
            const dateB = parseAppointmentDate(b.date);

            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;

            return dateB - dateA;
        });

    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return String(dateString);
        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    useEffect(() => {
        if (!toast) return undefined;
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 3200);
        return () => clearTimeout(toastTimer.current);
    }, [toast]);

    return (
        <div className="h-screen overflow-hidden py-4 px-4" style={{ backgroundColor: "#041AA9" }}>
            {toast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm px-4">
                    <Toast
                        variant={toast.variant}
                        title={toast.title}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="max-w-7xl mx-auto h-full min-h-0 flex flex-col gap-4">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4">
                    <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_1fr_auto]">
                        <div className="flex items-center gap-4 justify-self-center sm:justify-self-start">
                            <img
                                src={hospitalLogo}
                                alt="Cure24 Hospital"
                                className="h-12 w-auto"
                                loading="eager"
                            />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-1">Cure 24 Hospital - Appointments Management</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="justify-self-center sm:justify-self-end bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 flex-1 min-h-0 flex flex-col">
                    <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-blue-900">Appointments Filter</h2>
                                <p className="text-sm text-blue-700">
                                    Filter and sort appointments by date.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-blue-900">View</label>
                                <select
                                    value={showPastOnly ? "past" : "all"}
                                    onChange={(event) => setShowPastOnly(event.target.value === "past")}
                                    className="mt-1 rounded-md border border-blue-200 px-3 py-2 text-sm text-blue-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="all">All appointments</option>
                                    <option value="past">Past appointments only</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-blue-900">From date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                    className="mt-1 rounded-md border border-blue-200 px-3 py-2 text-sm text-blue-900 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-blue-900">To date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(event) => setEndDate(event.target.value)}
                                    className="mt-1 rounded-md border border-blue-200 px-3 py-2 text-sm text-blue-900 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-blue-900">Quick reset</label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStartDate("");
                                        setEndDate("");
                                        setShowPastOnly(false);
                                    }}
                                    className="mt-1 rounded-md border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-100"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4">
                        Appointments ({filteredAppointments.length} of {appointments.length})
                    </h2>

                    <div className="flex-1 min-h-0 overflow-y-auto pr-2 pb-4 snap-y snap-mandatory scroll-py-4">
                        {appointments.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No appointments found</p>
                                <p className="text-gray-400 mt-2">Appointments booked through the website will appear here</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredAppointments.map((appointment) => (
                                    <div
                                        key={appointment._id}
                                        className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-gray-50 snap-start scroll-mt-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {/* Patient Info */}
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Patient Name</h3>
                                                <p className="text-lg font-semibold text-gray-900">{appointment.name || "N/A"}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                                                <p className="text-base text-gray-900">{appointment.email || "N/A"}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                                                <p className="text-base text-gray-900">{appointment.phone || "N/A"}</p>
                                            </div>

                                            {/* Appointment Details */}
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                                                <p className="text-base font-semibold text-blue-900">
                                                    {formatDate(appointment.date)}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Time</h3>
                                                <p className="text-base font-semibold text-blue-900">
                                                    {formatTime(appointment.time)}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Department</h3>
                                                <p className="text-base text-gray-900">{appointment.department || "N/A"}</p>
                                            </div>

                                            {appointment.doctor && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Doctor</h3>
                                                    <p className="text-base text-gray-900">{appointment.doctor}</p>
                                                </div>
                                            )}

                                            {appointment.message && (
                                                <div className="md:col-span-2 lg:col-span-3">
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Message</h3>
                                                    <p className="text-base text-gray-700">{appointment.message}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-500">Status</span>
                                                <select
                                                    value={appointment.status || "pending"}
                                                    onChange={(event) =>
                                                        updateStatus(appointment._id, event.target.value)
                                                    }
                                                    className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700"
                                                >
                                                    {statusOptions.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        <button
                                            onClick={() => setPendingDelete(appointment)}
                                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                        {/* Booking Timestamp */}
                                        {appointment.createdAt && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-xs text-gray-400">
                                                    Booked on: {formatDateTime(appointment.createdAt)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {pendingDelete && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-semibold text-blue-900">Delete appointment?</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to delete the appointment
                            {pendingDelete.name ? ` for ${pendingDelete.name}` : ""}?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setPendingDelete(null)}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const targetId = pendingDelete._id;
                                    setPendingDelete(null);
                                    handleDelete(targetId);
                                }}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

