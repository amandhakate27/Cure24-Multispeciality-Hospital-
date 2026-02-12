import {
    BadgeCheck,
    Building2,
    CircleCheck,
    Clock,
    FileText,
    Mail,
    Phone,
    ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const highlights = [
    {
        title: "16+ TPAs",
        description: "Partnerships with leading Third Party Administrators",
        Icon: ShieldCheck,
    },
    {
        title: "16+ Insurers",
        description: "Accepted insurance companies for your convenience",
        Icon: Building2,
    },
    {
        title: "Quick Processing",
        description: "Fast approval and settlement for emergency cases",
        Icon: Clock,
    },
];

const processSteps = [
    {
        title: "Intimation",
        description:
            "Inform the hospital insurance desk and your TPA about planned hospitalization at least 48 hours in advance (for planned procedures). For emergency admissions, inform within 24 hours.",
    },
    {
        title: "Pre-Authorization",
        description:
            "Our insurance team will submit a pre-authorization request to your TPA/insurance company with medical details and estimated treatment costs.",
    },
    {
        title: "Approval",
        description:
            "TPA reviews the request and grants approval (usually within 2-6 hours for emergencies, 24-48 hours for planned procedures).",
    },
    {
        title: "Treatment",
        description:
            "Once approved, proceed with the treatment. The hospital will directly settle the approved amount with your insurance company.",
    },
    {
        title: "Settlement",
        description:
            "After discharge, you only pay any non-covered expenses, co-payments, or amounts exceeding the sum insured. The rest is settled cashlessly.",
    },
];

const tpaPartners = [
    "Medi Assist",
    "Paramount Health Services",
    "Vidal Health",
    "Good Health Plan TPA",
    "Raksha TPA",
    "Heritage Health TPA",
    "MD India Healthcare Services",
    "Family Health Plan TPA",
    "Health India TPA",
    "Dedicated Healthcare Services",
    "Grand Healthcare Services",
    "Park Mediclaim",
];

const insurers = [
    "Star Health Insurance",
    "ICICI Lombard",
    "Aditya Birla Health Insurance",
    "Care Health Insurance",
    "Tata AIG",
    "Reliance General Insurance",
    "Bajaj Allianz",
    "HDFC Ergo",
];

const documents = [
    "Valid health insurance policy document",
    "Photo ID proof (Aadhar Card, PAN Card, Driving License, Passport)",
    "Health card / e-health card issued by insurance company/TPA",
    "Previous medical records (if applicable)",
    "Duly filled pre-authorization form",
];

const notes = [
    "Cashless facility is subject to policy terms and TPA approval",
    "Policy must be active and within coverage period",
    "For planned procedures, intimate TPA at least 48 hours in advance",
    "Emergency cases should be intimated within 24 hours of admission",
    "Patient is responsible for co-payment, deductibles, and non-covered items",
    "In case of TPA rejection, patient must arrange for payment",
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
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const Insurance = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">
                <div className="mt-0 bg-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">Insurance & TPA</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            We accept all major insurance companies and TPAs for cashless hospitalization
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                        Cashless Hospitalization Made Easy
                    </h3>
                    <p className="text-blue-700 mt-3 text-sm md:text-base max-w-5xl mx-auto">
                        At Cure 24 Hospital, we understand that medical expenses can be a concern. That's why
                        we've partnered with all major insurance companies and Third Party Administrators
                        (TPAs) to provide seamless cashless hospitalization services, making quality
                        healthcare accessible and hassle-free.
                    </p>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {highlights.map((item) => (
                            <motion.div
                                key={item.title}
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                                className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-6 text-center transition-shadow duration-300 hover:shadow-lg"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                    <item.Icon className="w-6 h-6" aria-hidden="true" />
                                </div>
                                <h4 className="text-base font-semibold text-blue-800 mt-4">{item.title}</h4>
                                <p className="text-blue-700 text-sm mt-2">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
                        How Cashless Hospitalization Works
                    </h3>
                    <p className="text-blue-700 mt-2 text-sm md:text-base text-center">
                        Simple 5-step process for cashless treatment
                    </p>

                    <motion.div
                        className="mt-10 space-y-4"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                variants={cardVariants}
                                className="flex gap-16 items-center justify-center"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-semibold flex items-center justify-center flex-shrink-0">
                                    {index + 1}
                                </div>
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                                    className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-4 flex-1 min-w-0 lg:max-w-3xl transition-shadow duration-300 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-2 text-blue-800 font-semibold">
                                        <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                                        {step.title}
                                    </div>
                                    <p className="text-blue-700 text-sm mt-2">{step.description}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800">Our TPA Partners</h3>
                    <p className="text-blue-700 mt-2 text-sm md:text-base">
                        We work with all major Third Party Administrators in India
                    </p>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {tpaPartners.map((name) => (
                            <motion.div
                                key={name}
                                variants={cardVariants}
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                                className="bg-white/90 border border-blue-100 rounded-xl shadow-sm p-4 text-sm font-semibold text-blue-800 flex flex-col items-center gap-1 justify-center transition-shadow duration-300 hover:shadow-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <CircleCheck className="w-4 h-4 text-green-600" aria-hidden="true" />
                                    <span>{name}</span>
                                </div>
                                <span className="text-xs text-blue-500 font-medium">Leading TPA</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                        Accepted Insurance Companies
                    </h3>
                    <p className="text-blue-700 mt-2 text-sm md:text-base">
                        Partnerships with leading health insurance providers
                    </p>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {insurers.map((name) => (
                            <motion.div
                                key={name}
                                variants={cardVariants}
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                                className="bg-white/90 border border-blue-100 rounded-xl shadow-sm p-4 text-sm font-semibold text-blue-800 flex items-center gap-2 justify-center transition-shadow duration-300 hover:shadow-lg"
                            >
                                <ShieldCheck className="w-4 h-4 text-blue-700" aria-hidden="true" />
                                <span>{name}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-6 transition-shadow duration-300 hover:shadow-lg"
                        >
                            <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                                <FileText className="w-5 h-5" aria-hidden="true" />
                                Documents Required
                            </h4>
                            <ul className="mt-4 space-y-2 text-sm text-blue-700 list-disc list-inside">
                                {documents.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-6 transition-shadow duration-300 hover:shadow-lg"
                        >
                            <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                                Important Notes
                            </h4>
                            <ul className="mt-4 space-y-2 text-sm text-blue-700 list-disc list-inside">
                                {notes.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-5xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="bg-blue-100/80 border border-blue-100 rounded-2xl shadow-sm p-6 md:p-8 text-center transition-shadow duration-300 hover:shadow-lg"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800">
                            Need Help with Insurance?
                        </h3>
                        <p className="text-blue-700 mt-2 text-sm md:text-base">
                            Our dedicated insurance help desk is available 24/7 to assist you with all
                            insurance-related queries, pre-authorization, and claim processing.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-800 font-semibold">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" aria-hidden="true" />
                                <span>Insurance Help Desk</span>
                                <span className="text-blue-600">+91 712-2456791</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" aria-hidden="true" />
                                <span>Email</span>
                                <span className="text-blue-600">insurance@cure24hospital.com</span>
                            </div>
                        </div>
                        <p className="text-xs text-blue-600 mt-4">
                            Visit our insurance desk on the ground floor near the main reception.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Insurance;

