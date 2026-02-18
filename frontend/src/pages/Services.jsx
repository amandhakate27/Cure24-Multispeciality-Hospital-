import { Cpu, HeartHandshake, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

import anesthesiologyImg from "../assets/images/anesthesiology.png";
import cardiologyImg from "../assets/images/cardiology.jpg";
import criticalCareImg from "../assets/images/critical care.jpg";
import emergencyCareImg from "../assets/images/emergency-care.jpg";
import generalMedicineImg from "../assets/images/general medicin.png";
import inpatientImg from "../assets/images/inpatient services.png";
import neurologyImg from "../assets/images/neurology.jpeg";
import pathologyImg from "../assets/images/pathology labs.png";
import pharmacyImg from "../assets/images/pharmacy.png";
import preventiveImg from "../assets/images/preventive health checkups.png";
import icuImg from "../assets/images/icu.png";
import ctScanImg from "../assets/images/ct-scan.jpg";
import diabeticsImg from "../assets/images/diabetics.png";
import entImg from "../assets/images/ent.jpg";
import gastroenterologyImg from "../assets/images/Gastroenterology.webp";
import gynaecologyImg from "../assets/images/gynaecology.webp";
import laparoscopicImg from "../assets/images/laparoscopic surgery.webp";
import neurosurgeryImg from "../assets/images/neurosurgery.jpg";
import orthopedicImg from "../assets/images/orthopedic and joint replacement surgery.png";
import paediatricsImg from "../assets/images/PAEDIATRICS.png";
import physiotherapyImg from "../assets/images/physiotherapy.jpg";
import plasticSurgeryImg from "../assets/images/Plastic-surgery.jpg";
import psychiatryImg from "../assets/images/psychiatry.png";
import pulmonologyImg from "../assets/images/Pulmonology.jpg";
import radiologyImg from "../assets/images/radiology.jpg";
import urologyImg from "../assets/images/urology.png";

const services = [
    {
        title: "Emergency Care",
        description: "24/7 emergency services with rapid response team",
        image: emergencyCareImg,
    },
    {
        title: "Cardiology",
        description: "Advanced heart care and cardiovascular treatments",
        image: cardiologyImg,
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
        title: "Critical Care",
        description: "ICU and intensive monitoring for critical patients",
        image: criticalCareImg,
    },
    {
        title: "Anesthesiology",
        description: "Expert anesthesia services for surgeries , pain management and critical care by certified anesthesiologists",
        image: anesthesiologyImg,
    },
    {
        title: "Inpatient Services",
        description: "Comfortable patient rooms with modern amenities, general wards, private and deluxe rooms, and 24/7 nursing care.",
        image: inpatientImg,
    },
    {
        title: "Preventive Health Checkups",
        description: "Comprehensive health screening packages for early detection and prevetion of deseases. Customized checkups plans.",
        image: preventiveImg,
    },
    {
        title: "Critical Care (ICU)",
        description: "24/7 intesive care unit with ventilator support, continuous monitoring, and specialized critical care team.",
        image: icuImg,
    },
    {
        title: "Pathology Lab",
        description: "Fully automated diagnostic labortory with blood tests, microbiology, histopathology, and molcular diagnostics.",
        image: pathologyImg,
    },
    {
        title: "Pharmacy",
        description: "24/7 in house pharmacy stocked with all essential medicines , surgical supplies, and medical equipement.",
        image: pharmacyImg,
    },
    {
        title: "Orthopaedic & Joint Replacement",
        description: "Advanced orthopedic care including joint replacement surgeries, fracture management, and spine surgery by expert orthopedic surgeons.",
        image: orthopedicImg,
    },
    {
        title: "Gynaecology",
        description: "Comprehensive women's healthcare including maternity services, gynecological surgeries, and prenatal and postnatal care.",
        image: gynaecologyImg,
    },
    {
        title: "Paediatrics",
        description: "Specialized child healthcare services with expert pediatricians for newborns, infants, and children up to adolescence.",
        image: paediatricsImg,
    },
    {
        title: "Neurosurgery",
        description: "Advanced neurosurgical procedures for brain and spine conditions with state-of-the-art equipment and experienced neurosurgeons.",
        image: neurosurgeryImg,
    },
    {
        title: "ENT (Ear, Nose & Throat)",
        description: "Comprehensive ENT care including treatment for ear infections, sinus issues, throat disorders, and ENT surgeries.",
        image: entImg,
    },
    {
        title: "Gastroenterology",
        description: "Expert care for digestive system disorders including endoscopy, colonoscopy, and treatment of liver and stomach conditions.",
        image: gastroenterologyImg,
    },
    {
        title: "Urology",
        description: "Specialized urological care including kidney stone treatment, prostate care, and urinary tract disorder management.",
        image: urologyImg,
    },
    {
        title: "Pulmonology",
        description: "Comprehensive respiratory care for lung diseases, asthma, COPD, and breathing disorders with advanced pulmonary function tests.",
        image: pulmonologyImg,
    },
    {
        title: "Psychiatry",
        description: "Mental health services including counseling, psychiatric evaluation, and treatment for depression, anxiety, and other mental disorders.",
        image: psychiatryImg,
    },
    {
        title: "Diabetology",
        description: "Specialized diabetes management with personalized treatment plans, diet counseling, and regular monitoring for blood sugar control.",
        image: diabeticsImg,
    },
    {
        title: "Physiotherapy",
        description: "Rehabilitation and physical therapy services for recovery from injuries, surgeries, and chronic pain management with certified therapists.",
        image: physiotherapyImg,
    },
    {
        title: "Laparoscopic Surgery",
        description: "Minimally invasive surgical procedures with faster recovery, less pain, and smaller incisions for various abdominal surgeries.",
        image: laparoscopicImg,
    },
    {
        title: "Plastic Surgery",
        description: "Cosmetic and reconstructive surgery services including facial procedures, body contouring, and post-trauma reconstruction.",
        image: plasticSurgeryImg,
    },
    {
        title: "Radiology",
        description: "Complete diagnostic imaging services including X-ray, ultrasound, mammography, and interventional radiology procedures.",
        image: radiologyImg,
    },
    {
        title: "CT Scan",
        description: "Advanced CT scanning technology for detailed cross-sectional imaging to diagnose various medical conditions accurately.",
        image: ctScanImg,
    },
];

const highlights = [
    {
        title: "Latest Technology",
        description: "State-of-the-art medical equipment for accurate diagnosis",
        Icon: Cpu,
    },
    {
        title: "Expert Doctors",
        description: "Highly qualified specialists with years of experience",
        Icon: Stethoscope,
    },
    {
        title: "Patient Care",
        description: "Compassionate and personalized healthcare approach",
        Icon: HeartHandshake,
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
    hidden: { opacity: 0, y: 26, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const Services = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">
                <div className="mt-6 bg-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">Our Medical Services</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            Comprehensive healthcare services with advanced medical technology and
                            experienced specialists across multiple departments
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.title}
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                className="group bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-40 md:h-44 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="eager"
                                    decoding="async"
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
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
                        Why Our Services Stand Out
                    </h3>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {highlights.map((item) => (
                            <motion.div
                                key={item.title}
                                variants={cardVariants}
                                className="flex flex-col items-center"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                                    <item.Icon className="w-6 h-6" aria-hidden="true" />
                                </div>
                                <h4 className="text-base font-semibold text-blue-800 mt-4">
                                    {item.title}
                                </h4>
                                <p className="text-blue-700 text-sm mt-2">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;

