import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CalendarCheck, CircleCheckBig, Clock, Building2, Mail, MessageSquare, Phone, Stethoscope, User } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Toast from "../components/common/Toast";
import { buildApiUrl } from "../utils/api";

const initialFormState = {
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    department: "",
    doctor: "",
    message: "",
};

const formVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
};

const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

const Appointment = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [toast, setToast] = useState(null);
    const toastTimer = useRef(null);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const inputWithIconClasses =
        "w-full rounded-xl border border-blue-200/80 bg-white px-4 py-3 pl-11 text-sm text-blue-900 placeholder:text-gray-400 outline-none shadow-sm transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:shadow-md";
    const textareaWithIconClasses =
        "w-full rounded-xl border border-blue-200/80 bg-white px-4 py-3 pl-11 text-sm text-blue-900 placeholder:text-gray-400 outline-none shadow-sm transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:shadow-md resize-none";

    const normalizePhone = (value) => String(value || "").replace(/[\s-]/g, "").trim();
    const isValidIndianMobile = (value) => /^(?:\+91|0)?[6-9]\d{9}$/.test(value);

    const getTodayDateString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const normalizedPhone = normalizePhone(formData.phone);
        if (!isValidIndianMobile(normalizedPhone)) {
            setToast({
                variant: "error",
                title: "Invalid mobile number",
                message: "Enter a valid Indian mobile number (10 digits, starts with 6-9).",
            });
            return;
        }

        const payload = { ...formData, phone: normalizedPhone };

        try {
            const response = await fetch(buildApiUrl("/api/appointments"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to book appointment");
            }

            setToast({
                variant: "success",
                title: "Appointment booked",
                message: "Our team will contact you soon.",
            });
            setFormData(initialFormState);
        } catch (error) {
            console.warn("Appointment booking failed:", error);
            setToast({
                variant: "error",
                title: "Booking failed",
                message:
                    error?.message === "Failed to fetch"
                        ? "Unable to reach server. Please try again later."
                        : "Something went wrong. Please try again.",
            });
        }
    };

    useEffect(() => {
        if (!toast) return undefined;
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 3200);
        return () => clearTimeout(toastTimer.current);
    }, [toast]);

    return (
        <div className="min-h-screen bg-[#F5F9FF]">
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
            <Navbar />

            <section className="pt-16 md:pt-20">


                <div className="mt-6 bg-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">Book an Appointment</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            Schedule your consultation with our expert doctors. Fill out the form below
                            and we'll confirm your appointment shortly.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-5xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="bg-white border border-blue-100 rounded-2xl shadow-lg shadow-blue-100/50 p-6 md:p-10"
                        variants={formVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <motion.div variants={fieldVariants}>
                                    <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className={inputWithIconClasses}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div variants={fieldVariants}>
                                    <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your mobile number"
                                            inputMode="numeric"
                                            maxLength={13}
                                            className={inputWithIconClasses}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div className="md:col-span-2" variants={fieldVariants}>
                                    <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className={inputWithIconClasses}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div variants={fieldVariants}>
                                    <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Preferred Date</label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={getTodayDateString()}
                                            required
                                            className={inputWithIconClasses}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div variants={fieldVariants}>
                                    <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Preferred Time</label>
                                    <div className="relative">
                                        <Clock className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className={inputWithIconClasses}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div variants={fieldVariants}>
                                    <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Department</label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                            className={`${inputWithIconClasses} appearance-none`}
                                        >
                                            <option value="" disabled>
                                                Select Department
                                            </option>
                                            <option value="Emergency Care">Emergency Care</option>
                                            <option value="Orthopedics">Orthopedics</option>
                                            <option value="Pediatrics">Pediatrics</option>
                                            <option value="General Medicine">General Medicine</option>
                                            <option value="Neurology">Neurology</option>
                                        </select>
                                    </div>
                                </motion.div>
                                <motion.div variants={fieldVariants}>
                                    <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Doctor Name</label>
                                    <div className="relative">
                                        <Stethoscope className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                        <input
                                            type="text"
                                            name="doctor"
                                            value={formData.doctor}
                                            onChange={handleChange}
                                            placeholder="Enter Dr. name"
                                            className={inputWithIconClasses}
                                        />
                                    </div>
                                </motion.div>
                            </div>
                            <motion.div variants={fieldVariants}>
                                <label className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1">Message <span className="font-normal text-blue-400">(optional)</span></label>
                                <div className="relative">
                                    <MessageSquare className="w-4 h-4 text-blue-600 absolute left-3.5 top-3.5 pointer-events-none" aria-hidden="true" />
                                    <textarea
                                        rows="4"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Reason for visit, symptoms, or any notes..."
                                        className={textareaWithIconClasses}
                                    />
                                </div>
                            </motion.div>
                            <motion.div variants={fieldVariants} className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-md shadow-blue-700/25 hover:shadow-lg hover:shadow-blue-700/35 hover:from-blue-800 hover:to-blue-900 transition-all duration-200 hover:scale-[1.03] active:scale-95"
                                >
                                    <CalendarCheck className="w-4 h-4" />
                                    Confirm Appointment
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-5xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                                <Calendar className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-base font-semibold text-blue-800 mt-4">
                                Flexible Scheduling
                            </h3>
                            <p className="text-blue-700 text-sm mt-2">
                                Choose a convenient date and time that works for you
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                                <CircleCheckBig className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-base font-semibold text-blue-800 mt-4">
                                Quick Confirmation
                            </h3>
                            <p className="text-blue-700 text-sm mt-2">
                                Receive instant confirmation via email and SMS
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                                <User className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-base font-semibold text-blue-800 mt-4">
                                Expert Care
                            </h3>
                            <p className="text-blue-700 text-sm mt-2">
                                Consult with experienced specialists in your chosen field
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Appointment;



