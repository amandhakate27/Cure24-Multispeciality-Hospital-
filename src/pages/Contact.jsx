import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import LoadingButton from "../components/common/LoadingButton";

const initialFormState = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

const Contact = () => {
    const [formData, setFormData] = useState(initialFormState);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { ...formData };
        console.log("Contact form submit:", payload);

        try {
            const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact";
            await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.warn("Contact form submit failed:", error);
        } finally {
            setFormData(initialFormState);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">
                <div className="mt-0 bg-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">Contact Us</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            Get in touch with us for any queries, feedback, or emergency assistance.
                            We're here to help you 24/7.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-stretch">
                        <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-6 md:p-8 h-full">
                            <h3 className="text-lg font-semibold text-blue-800">Contact Details</h3>
                            <div className="mt-6 space-y-5 text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-semibold text-blue-800">Contact Number</p>
                                        <p>+91 9654317717</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-semibold text-blue-800">Location</p>
                                        <p>
                                            Plot No 5, Daddu's Kitchen, Diamond Nagar,
                                            Besa Road, Nagpur-440037, Maharashtra
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-semibold text-blue-800">Work Days</p>
                                        <p>Emergency Services: 24/7</p>
                                        <p>OPD Timings: Mon - Sat 9:00 AM - 8:00 PM</p>
                                        <p>Sunday: 9:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-semibold text-blue-800">Email</p>
                                        <p>support@cure24hospital.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-100/70 border border-blue-100 rounded-2xl shadow-sm p-6 md:p-8 h-full flex flex-col">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-blue-800">Get in touch</h3>
                                <p className="text-slate-600 text-sm mt-1">
                                    We'd love to hear from you. Reach out for reservations,
                                    feedback, or any queries.
                                </p>
                            </div>
                            <form className="mt-6 space-y-4 flex-1" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone No."
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                                    />
                                </div>
                                <textarea
                                    rows="4"
                                    placeholder="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                                />
                                <div className="flex justify-center mt-2">
                                    <LoadingButton
                                        type="submit"
                                        className="bg-blue-700 text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-800 transition-transform active:scale-95"
                                    >
                                        Send
                                    </LoadingButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-12">
                <div className="max-w-5xl mx-auto px-6 lg:px-10">
                    <h3 className="text-2xl font-bold text-blue-800 text-center">
                        Find Us on Map
                    </h3>
                    <div className="mt-6 bg-white/90 border border-blue-100 rounded-2xl shadow-xl shadow-blue-300/40 overflow-hidden">
                        <div className="w-full h-80 md:h-[420px]">
                            <iframe
                                title="Cure24 Location"
                                className="w-full h-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps?q=Nagpur%20Besa%20Road&output=embed"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
                    <h3 className="text-2xl font-bold text-blue-800">Medical Emergency?</h3>
                    <p className="text-slate-600 mt-2 text-sm md:text-base">
                        Call our emergency hotline immediately for urgent medical assistance
                    </p>
                    <a
                        href="tel:+919654317717"
                        className="inline-flex items-center justify-center gap-2 mt-6 bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-800 transition-transform active:scale-95"
                    >
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        Call: +91 9654317717
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
