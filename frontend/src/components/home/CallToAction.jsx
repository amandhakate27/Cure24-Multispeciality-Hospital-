import { motion } from "framer-motion";
import LoadingLink from "../common/LoadingLink";

const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const CallToAction = () => {
    return (
        <section className="bg-white py-16 md:py-20">
            <motion.div
                className="max-w-5xl mx-auto px-6 lg:px-10 text-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                    Need Medical Assistance?
                </h2>
                <p className="text-slate-600 mt-3">
                    Book an appointment with our expert doctors or call us for emergency services
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <LoadingLink
                        to="/appointment"
                        className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition-transform hover:scale-[1.03] active:scale-95"
                    >
                        Book Appointment
                    </LoadingLink>
                    <LoadingLink
                        to="/contact"
                        className="px-6 py-3 rounded-full font-semibold border border-blue-300 text-blue-700 hover:bg-blue-50 transition-transform hover:scale-[1.03] active:scale-95"
                    >
                        Contact Us
                    </LoadingLink>
                </div>
            </motion.div>
        </section>
    );
};

export default CallToAction;
