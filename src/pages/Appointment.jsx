import { useState } from "react";
import { Calendar, CircleCheckBig, Clock, User } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import LoadingButton from "../components/common/LoadingButton";

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

const Appointment = () => {
    const [formData, setFormData] = useState(initialFormState);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = { ...formData };
        console.log("Appointment booking:", payload);
        setFormData(initialFormState);
    };

    return (
        <div className="min-h-screen bg-[#F5F9FF]">
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
                    <div className="bg-blue-100/70 border border-blue-100 rounded-2xl shadow-sm p-6 md:p-8">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone No."
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-blue-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="relative">
                                        <Clock className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-blue-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="Department"
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="doctor"
                                        value={formData.doctor}
                                        onChange={handleChange}
                                        placeholder="Doctor"
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                </div>
                            </div>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message / Reason for visit (optional)"
                                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                            />
                            <div className="flex justify-center">
                                <LoadingButton
                                    type="submit"
                                    className="bg-blue-700 text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-800 transition-transform active:scale-95"
                                >
                                    Confirm Appointment
                                </LoadingButton>
                            </div>
                        </form>
                    </div>
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
                            <p className="text-slate-600 text-sm mt-2">
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
                            <p className="text-slate-600 text-sm mt-2">
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
                            <p className="text-slate-600 text-sm mt-2">
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
