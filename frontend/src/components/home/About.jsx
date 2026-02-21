import { motion } from "framer-motion";
import LoadingLink from "../common/LoadingLink";
import LoadingImage from "../common/LoadingImage";
import womanDoctorImg from "../../assets/images/women-doctor-service.png";
import nurseImg from "../../assets/images/medical-nurse.jpg";
import seniorWomanImg from "../../assets/images/senior-woman.jpg";
import icuImg from "../../assets/images/icu.png";
import inpatientImg from "../../assets/images/inpatient services.png";

const gridVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const About = () => {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">

                    {/* LEFT - CONTENT */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 leading-tight">
                            Leading Healthcare Provider in
                            <br />
                            Nagpur
                        </h2>

                        <p className="text-blue-700 mt-4 [text-align:justify]">
                            Cure 24 Clinic Hospital has been at the forefront of healthcare excellence in
                            Nagpur for nearly two decades. Founded with a vision to provide accessible,
                            affordable, and advanced medical care, we have grown to become one of the most
                            trusted healthcare institutions in Central India.
                        </p>

                        <p className="text-blue-700 mt-4 [text-align:justify]">
                            Our state-of-the-art facility combines modern infrastructure with compassionate
                            care. Led by Dr. Jitesh K. Bhandankar and a team of over 50 specialist doctors,
                            we serve more than 5,000 patients annually across 15+ medical specialties.
                        </p>

                        <p className="text-blue-700 mt-4 [text-align:justify]">
                            From routine checkups to complex surgeries, emergency care to preventive health programs , we offer comprehensive medical service under one roof, backed by the latest diagnostic and treatment technologies.
                        </p>

                        <LoadingLink
                            to="/about"
                            className="mt-6 bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-transform hover:scale-[1.03] active:scale-95 mx-auto lg:mx-0 inline-flex justify-center"
                        >
                            Learn More About Us
                        </LoadingLink>
                    </div>

                    {/* RIGHT - IMAGE GRID */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        >
                            <LoadingImage
                                src={womanDoctorImg}
                                alt="Doctor consultation"
                                className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                            />
                        </motion.div>
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        >
                            <LoadingImage
                                src={nurseImg}
                                alt="Nurse care"
                                className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                            />
                        </motion.div>
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        >
                            <LoadingImage
                                src={icuImg}
                                alt="ICU care"
                                className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                            />
                        </motion.div>
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        >
                            <LoadingImage
                                src={inpatientImg}
                                alt="Inpatient services"
                                className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                            />
                        </motion.div>
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.03, y: -6 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="col-span-2"
                        >
                            <LoadingImage
                                src={seniorWomanImg}
                                alt="Patient recovery"
                                className="h-40 md:h-48 lg:h-56 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

