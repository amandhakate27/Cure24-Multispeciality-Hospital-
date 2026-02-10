import { Eye, Heart, Target } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

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
                            <p className="text-slate-600 mt-4 text-sm leading-relaxed">
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
                            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-center text-center">
                                <div className="text-4xl md:text-5xl font-bold text-blue-800">
                                    Cure<span className="text-blue-500">24</span>
                                </div>
                                <div className="text-base md:text-lg font-semibold text-blue-600 mt-2">
                                    Multi-Speciality Hospital
                                </div>
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
                    <p className="text-slate-600 mt-2 text-sm md:text-base">
                        Committed to transforming healthcare in Nagpur and beyond
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Target className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Mission</h4>
                            <p className="text-slate-600 text-sm mt-2">
                                To provide world-class, patient-centered healthcare services that are
                                accessible, affordable, and delivered with compassion. We strive to be the
                                first choice for comprehensive medical care in Central India.
                            </p>
                        </div>
                        <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Eye className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Vision</h4>
                            <p className="text-slate-600 text-sm mt-2">
                                To be recognized as the leading multi-specialty healthcare institution in
                                Maharashtra, setting benchmarks in medical excellence, innovation, and
                                patient satisfaction through continuous improvement.
                            </p>
                        </div>
                        <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Heart className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Values</h4>
                            <p className="text-slate-600 text-sm mt-2">
                                Excellence in care, integrity in practice, compassion in service, innovation
                                in treatment, and commitment to our community. These core values guide
                                every decision we make.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
