import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalLogo from "../assets/images/reallogo1.png";
import Toast from "../components/common/Toast";
import { buildApiUrl } from "../utils/api";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const statusOptions = ["pending", "confirmed", "completed", "cancelled"];
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showPastOnly, setShowPastOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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
                const response = await fetch(buildApiUrl("/api/appointments"), {
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
            const response = await fetch(buildApiUrl(`/api/appointments/${id}`), {
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
            const response = await fetch(buildApiUrl(`/api/appointments/${id}`), {
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

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase().trim();
                const matchesName = appointment.name?.toLowerCase().includes(query);
                const matchesEmail = appointment.email?.toLowerCase().includes(query);
                const matchesPhone = appointment.phone?.replace(/[\s-]/g, "").includes(query.replace(/[\s-]/g, ""));
                if (!matchesName && !matchesEmail && !matchesPhone) return false;
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
        <div className="min-h-screen py-6 px-4" style={{ backgroundColor: "#041AA9" }}>
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
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-2xl p-6">
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
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                    <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-blue-900">Appointments Filter</h2>
                                <p className="text-sm text-blue-700">
                                    Filter and sort appointments by date.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-blue-900">Search Patient</label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="Name, Email, or Phone"
                                    className="mt-1 rounded-md border border-blue-200 px-3 py-2 text-sm text-blue-900 placeholder:text-blue-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

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
                                        setSearchQuery("");
                                    }}
                                    className="mt-1 rounded-md border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-100 transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                        Appointments ({filteredAppointments.length} of {appointments.length})
                    </h2>

                    {appointments.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-lg">No appointments found</p>
                            <p className="text-gray-400 mt-2">Appointments booked through the website will appear here</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                            <table className="w-full text-sm">
                                <thead className="bg-blue-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Patient Name</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Doctor</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((appointment, index) => (
                                        <tr
                                            key={appointment._id}
                                            className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-900">{appointment.name || "N/A"}</td>
                                            <td className="px-4 py-3 text-gray-700">{appointment.email || "N/A"}</td>
                                            <td className="px-4 py-3 text-gray-700">{appointment.phone || "N/A"}</td>
                                            <td className="px-4 py-3 font-semibold text-blue-900">{formatDate(appointment.date)}</td>
                                            <td className="px-4 py-3 font-semibold text-blue-900">{formatTime(appointment.time)}</td>
                                            <td className="px-4 py-3 text-gray-700">{appointment.department || "N/A"}</td>
                                            <td className="px-4 py-3 text-gray-700">{appointment.doctor || "N/A"}</td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={appointment.status || "pending"}
                                                    onChange={(event) =>
                                                        updateStatus(appointment._id, event.target.value)
                                                    }
                                                    className="border border-gray-300 rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                                >
                                                    {statusOptions.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => setPendingDelete(appointment)}
                                                    className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold text-xs hover:bg-red-700 transition-all active:scale-95 shadow-sm hover:shadow-md"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {pendingDelete && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border-2 border-red-200 bg-white p-7 shadow-2xl">
                        <h3 className="text-xl font-semibold text-red-900">Delete Appointment?</h3>
                        <p className="mt-3 text-sm text-gray-700">
                            Are you sure you want to delete the appointment
                            {pendingDelete.name && <span className="font-semibold"> for {pendingDelete.name}</span>}? This action cannot be undone.
                        </p>
                        <div className="mt-7 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setPendingDelete(null)}
                                className="rounded-lg border-2 border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
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
                                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-md"
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

