import { useState } from "react";
import { motion } from "framer-motion";
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

const formVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
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

const cardVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const Contact = () => {
    const [formData, setFormData] = useState(initialFormState);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const inputClasses =
        "w-full rounded-xl border border-blue-200/80 bg-white/95 px-4 py-2.5 text-sm text-blue-800 placeholder:text-blue-400 outline-none shadow-sm transition-shadow transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/70 focus:shadow-md";
    const textareaClasses =
        "w-full rounded-xl border border-blue-200/80 bg-white/95 px-4 py-3 text-sm text-blue-800 placeholder:text-blue-400 outline-none shadow-sm transition-shadow transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/70 focus:shadow-md";

    const mapEmbedUrl =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.120000862208!2d79.13550111005296!3d21.147622180450426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c76b577c7ddb%3A0xd2bd1c7d5e55aaf5!2sAuro%20Critical%20Care%20Hospital%20%7C%20Orthopedic%20Hospital%20in%20Nagpur%20%7C%20Kne%20Replacement%20Hospital%20in%20Nagpur%20%7C%20Join%20Replacement%20Surgeon%20in%20Nagpur%20%7C!5e0!3m2!1sen!2sin!4v1771320732076!5m2!1sen!2sin";


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
                        <motion.div
                            className="bg-white/90 border border-blue-100 rounded-2xl shadow-md shadow-blue-200/40 p-6 md:p-8 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-300/50 hover:bg-white"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.25 }}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        >
                            <h3 className="text-lg font-semibold text-blue-800">Contact Details</h3>
                            <div className="mt-6 space-y-5 text-sm text-blue-700">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-extrabold text-blue-800">Contact Number</p>
                                        <p className="text-blue-800">+91 9654317717</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-extrabold text-blue-800">Location</p>
                                        <p className="text-blue-800">
                                            Deshpande Lay-out, Vaishnavi Devi Chowk,
                                            C.A. Road, Nagpur
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-extrabold text-blue-800">Work Days</p>
                                        <p className="text-blue-800">Emergency Services: 24/7</p>
                                        <p className="text-blue-800">OPD Timings: Mon - Sat 9:00 AM - 8:00 PM</p>
                                        <p className="text-blue-800">Sunday: 9:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-extrabold text-blue-800">Email</p>
                                        <p className="text-blue-800">cure24hospital@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-blue-100/70 border border-blue-100 rounded-2xl shadow-md shadow-blue-200/40 p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-300/50 hover:bg-blue-50/90"
                            variants={formVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.25 }}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        >
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-blue-800">Get in touch</h3>
                                <p className="text-blue-700 text-sm mt-1">
                                    We'd love to hear from you. Reach out for reservations,
                                    feedback, or any queries.
                                </p>
                            </div>
                            <form className="mt-6 space-y-4 flex-1" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <motion.div variants={fieldVariants}>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                        />
                                    </motion.div>
                                    <motion.div variants={fieldVariants}>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                        />
                                    </motion.div>
                                    <motion.div variants={fieldVariants}>
                                        <input
                                            type="tel"
                                            placeholder="Phone No."
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                        />
                                    </motion.div>
                                    <motion.div variants={fieldVariants}>
                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                        />
                                    </motion.div>
                                </div>
                                <motion.div variants={fieldVariants}>
                                    <textarea
                                        rows="4"
                                        placeholder="Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className={textareaClasses}
                                    />
                                </motion.div>
                                <motion.div variants={fieldVariants} className="flex justify-center mt-2">
                                    <LoadingButton
                                        type="submit"
                                        className="bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-lg hover:bg-blue-800 transition-all duration-200 hover:scale-[1.03] active:scale-95"
                                    >
                                        Send
                                    </LoadingButton>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="pb-12">
                <div className="max-w-5xl mx-auto px-6 lg:px-10">
                    <h3 className="text-2xl font-bold text-blue-800 text-center">
                        Find Us on Map
                    </h3>
                    <motion.div
                        className="mt-6 bg-white/90 border border-blue-100 rounded-2xl shadow-2xl shadow-blue-300/40 overflow-hidden transition-shadow duration-300 hover:shadow-[0_28px_60px_-24px_rgba(30,64,175,0.45)]"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.25 }}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    >
                        <div className="w-full h-80 md:h-105">
                            <iframe
                                title="Auro Critical Care Hospital Location"
                                src={mapEmbedUrl}
                                className="w-full h-full border-0"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            />

                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
                    <h3 className="text-2xl font-bold text-blue-800">Medical Emergency?</h3>
                    <p className="text-blue-700 mt-2 text-sm md:text-base">
                        Call our emergency hotline immediately for urgent medical assistance
                    </p>
                    <motion.a
                        href="tel:+919654317717"
                        className="inline-flex items-center justify-center gap-2 mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-95"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        Call: +91 9654317717
                    </motion.a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
