import LoadingLink from "../common/LoadingLink";

const CallToAction = () => {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                    Need Medical Assistance?
                </h2>
                <p className="text-slate-600 mt-3">
                    Book an appointment with our expert doctors or call us for emergency services
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <LoadingLink
                        to="/appointment"
                        className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition-transform active:scale-95"
                    >
                        Book Appointment
                    </LoadingLink>
                    <LoadingLink
                        to="/contact"
                        className="px-6 py-3 rounded-full font-semibold border border-blue-300 text-blue-700 hover:bg-blue-50 transition-transform active:scale-95"
                    >
                        Contact Us
                    </LoadingLink>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
