import { motion } from "framer-motion";
import LoadingImage from "../common/LoadingImage";
import LoadingLink from "../common/LoadingLink";
import criticalCareImg from "../../assets/images/critical care.jpg";
import emergencyCareImg from "../../assets/images/emergency-care.jpg";
import neurologyImg from "../../assets/images/neurology.jpeg";
import diabeticsImg from "../../assets/images/diabetics.png";
import generalMedicineImg from "../../assets/images/general medicin.png";


const services = [
    {
        title: "Emergency Care",
        description: "24/7 emergency services with rapid response team",
        image: emergencyCareImg,
    },
    {
        title: "Neurology",
        description: "Comprehensive neurological care and treatment",
        image: neurologyImg,
    },
    {
        title: "General Medicine",
        description: "Complete primary and preventive healthcare",
        image: generalMedicineImg,
    },
    {
        title: "Diabetics",
        description: "Expert treatment for Personalized insulin therapy and lifestyle management.",
        image: diabeticsImg,
    },
    {
        title: "Critical Care",
        description: "ICU and intensive monitoring for critical patients",
        image: criticalCareImg,
    },
];

const gridVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const KeyServices = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-20">
            <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50 to-blue-100" />
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full" />
            <div className="absolute -right-10 top-24 w-48 h-48 bg-blue-300/30 blur-2xl rounded-full" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                        Our Key Services
                    </h2>
                    <p className="text-blue-700 mt-3">
                        Specialized medical departments for comprehensive care
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            className="group bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-shadow duration-300"
                        >
                            <LoadingImage
                                src={service.image}
                                alt={service.title}
                                className="h-44 md:h-48 rounded-xl"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <h3 className="text-base font-semibold text-blue-800 mt-4 text-center">
                                {service.title}
                            </h3>
                            <p className="text-blue-700 text-sm mt-2 text-center">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex justify-center mt-10">
                    <LoadingLink
                        to="/services"
                        className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-transform hover:scale-[1.03] active:scale-95"
                    >
                        View All Services
                    </LoadingLink>
                </div>
            </div>
        </section>
    );
};

export default KeyServices;

