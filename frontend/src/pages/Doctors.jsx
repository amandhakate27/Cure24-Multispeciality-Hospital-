import { GraduationCap, Stethoscope, User } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import LoadingImage from "../components/common/LoadingImage";
import femaleDoctorImg from "../assets/images/female dr staff.png";
import maleDoctorImg from "../assets/images/male dr staff.png";

const Doctors = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">
                <div className="mt-0 bg-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">Our Expert Doctors</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base max-w-3xl mx-auto">
                            Meet our team of highly qualified and experienced medical professionals dedicated
                            to providing exceptional healthcare services
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-12 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
                        <div className="order-2 lg:order-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                                Meet Our Lead Consultant
                            </h3>

                            <div className="mt-6 space-y-5 text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <User className="w-6 h-6 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-bold text-blue-800 text-lg md:text-xl">
                                            Dr. Jitesh K. Bhandarkar
                                        </p>
                                        <p>
                                            Consulting Physician, Cardiologist, Diabetologist
                                            <br />
                                            &amp; Emergency Specialist
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-6 h-6 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-bold text-blue-800 text-lg">Qualifications</p>
                                        <p>MBBS, MD (Medicine), DM (Cardiology)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Stethoscope className="w-6 h-6 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-bold text-blue-800 text-lg">Expertise</p>
                                        <p>
                                            Multi-Specialty Expert: Cardiology, Diabetes Management,
                                            <br />
                                            General Medicine, Emergency Care
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">
                            <LoadingImage
                                src={maleDoctorImg}
                                alt="Dr. Jitesh K. Bhandarkar"
                                className="w-full max-w-[260px] md:max-w-[300px] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                                imgClassName="w-full h-full object-cover"
                            />
                            <p className="mt-3 text-base md:text-lg font-semibold text-blue-800 text-center md:hidden">
                                Dr. Jitesh K. Bhandarkar
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start mt-12">
                        <div className="flex flex-col items-center lg:items-start order-1">
                            <LoadingImage
                                src={femaleDoctorImg}
                                alt="Dr. Prajakta Bhandarkar"
                                className="w-full max-w-[260px] md:max-w-[300px] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                                imgClassName="w-full h-full object-cover"
                            />
                            <p className="mt-3 text-base md:text-lg font-semibold text-blue-800 text-center md:hidden">
                                Dr. Prajakta Bhandarkar
                            </p>
                        </div>

                        <div className="order-2 lg:order-2">
                            <div className="mt-2 space-y-5 text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <User className="w-6 h-6 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-bold text-blue-800 text-lg md:text-xl">
                                            Dr. Prajakta Bhandarkar
                                        </p>
                                        <p>
                                            Consulting Physician, Cardiologist, Diabetologist
                                            <br />
                                            &amp; Emergency Specialist
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-6 h-6 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-bold text-blue-800 text-lg">Qualifications</p>
                                        <p>MBBS, DM (Cardiology)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Stethoscope className="w-6 h-6 text-blue-700 flex-shrink-0" aria-hidden="true" />
                                    <div>
                                        <p className="font-bold text-blue-800 text-lg">Expertise</p>
                                        <p>
                                            Multi-Specialty Expert: Cardiology, Diabetes Management,
                                            <br />
                                            General Medicine, Emergency Care
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Doctors;
