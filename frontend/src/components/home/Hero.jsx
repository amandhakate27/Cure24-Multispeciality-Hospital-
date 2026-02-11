import LoadingLink from "../common/LoadingLink";
import doctorImg from "../../assets/images/doctors.png";

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-32">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100" />
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full" />
            <div className="absolute -right-10 top-24 w-48 h-48 bg-blue-300/30 blur-2xl rounded-full" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-center">

                    {/* LEFT SIDE - TEXT */}
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-transparent bg-clip-text">
                                Your Health, Our
                                <br />
                                Priority
                            </span>
                        </h1>

                        <p className="text-slate-600 mt-4 max-w-xl mx-auto lg:mx-0">
                            Experience world-class healthcare with 24/7 emergency services, advanced medical
                            technology, and compassionate care in Nagpur.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-8 justify-center lg:justify-start">
                            <LoadingLink
                                to="/appointment"
                                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-transform active:scale-95"
                            >
                                Book Appointment
                            </LoadingLink>

                            <LoadingLink
                                to="/contact"
                                className="text-blue-700 px-4 py-3 rounded-full font-semibold border border-blue-200 hover:border-blue-300 hover:bg-blue-100 transition-transform active:scale-95"
                            >
                                Contact Us
                            </LoadingLink>
                        </div>
                    </div>

                    {/* RIGHT SIDE - IMAGE */}
                    <div className="relative lg:-mt-6 flex justify-center lg:justify-end lg:items-end">
                        <div className="absolute -right-16 -top-10 w-48 h-48 bg-blue-200/40 blur-2xl rounded-full" />
                        <img
                            src={doctorImg}
                            alt="Doctor"
                            className="w-full max-w-[540px] md:max-w-[640px] lg:max-w-[720px] max-h-[760px] object-contain object-bottom rounded-3xl shadow-2xl opacity-95 mix-blend-multiply"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
