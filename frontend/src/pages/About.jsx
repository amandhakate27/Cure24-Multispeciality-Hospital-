import { Eye, Heart, Target } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import hospitalLogo from "../assets/images/reallogo1.png";

const cardsContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const popCard = {
    hidden: { opacity: 0, scale: 0.88, y: 18 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const About = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">

                <div className="mt-6 bg-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">About Us</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            Cure24 Clinic is a trusted neighbourhood healthcare centre in Nagpur,
                            offering compassionate medical care, expert consultations, and
                            patient-focused treatment for everyday health needs.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                                Cure 24 Clinic Hospital, Nagpur
                            </h3>
                            <p className="text-blue-700 mt-4 text-sm leading-relaxed [text-align:justify]">
                                Cure 24 Clinic is a patient-centric healthcare facility located in Nagpur,
                                dedicated to providing reliable, compassionate, and accessible medical care
                                for individuals and families. Our clinic focuses on delivering a complete
                                primary healthcare service with emphasis on accurate diagnosis, clinical
                                medical practice, and personalized treatment plans. Led by experienced and
                                qualified doctors, Cure 24 Clinic aims to address everyday health concerns,
                                chronic conditions, and preventive healthcare needs under one roof. We
                                believe in building long-term doctor-patient relationships through trust,
                                transparency, and clear communication. With a clean, comfortable environment
                                and a commitment to timely consultations, we strive to make quality
                                healthcare convenient and affordable for our community. At Cure 24 Clinic,
                                patient well-being is our highest priority, and we continuously work toward
                                improving health outcomes through professional excellence and compassionate
                                care.
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center p-4 sm:p-6">
                                <img
                                    src={hospitalLogo}
                                    alt="Cure 24 Multi-Speciality Hospital"
                                    className="w-full h-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                        Our Mission & Vision
                    </h3>
                            <p className="text-blue-700 mt-2 text-sm md:text-base text-center">
                                Committed to transforming healthcare in Nagpur and beyond
                            </p>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 rounded-3xl bg-blue-50/80 border border-blue-100/70 p-4 sm:p-6"
                        variants={cardsContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.div
                            variants={popCard}
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/95 border border-blue-100 rounded-2xl shadow-sm p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Target className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Mission</h4>
                            <p className="text-blue-700 text-sm mt-2">
                                To provide world-class, patient-centered healthcare services that are
                                accessible, affordable, and delivered with compassion. We strive to be the
                                first choice for comprehensive medical care in Central India.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={popCard}
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/95 border border-blue-100 rounded-2xl shadow-sm p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Eye className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Vision</h4>
                            <p className="text-blue-700 text-sm mt-2">
                                To be recognized as the leading multi-specialty healthcare institution in
                                Maharashtra, setting benchmarks in medical excellence, innovation, and
                                patient satisfaction through continuous improvement.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={popCard}
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/95 border border-blue-100 rounded-2xl shadow-sm p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Heart className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Values</h4>
                            <p className="text-blue-700 text-sm mt-2">
                                Excellence in care, integrity in practice, compassion in service, innovation
                                in treatment, and commitment to our community. These core values guide
                                every decision we make.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;

