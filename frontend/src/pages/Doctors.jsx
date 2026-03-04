import { useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseMedical, GraduationCap } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import LoadingImage from "../components/common/LoadingImage";
import drBhandarkarDummyImg from "../assets/images/dummyImg.jpeg";
import drJaiswalImg from "../assets/images/Dr. Jaiswal.jpeg";
import drPravinImg from "../assets/images/Dr. Pravin.jpeg";
import drTriptiImg from "../assets/images/Dr. Tripti Sawlani.jpeg";
import dummyDoctorImg from "../assets/images/medical-nurse.jpg";

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

const existingDoctors = [
    {
        name: "Dr. Jitesh K. Bhandarkar",
        image: drBhandarkarDummyImg,
        useCenterCrop: true,
        role: "Managing Director",
        qualifications: "MBBS, DNS (Emergency Medicine)",
    },
];

const additionalDoctors = [
    {
        name: "Dr. Akhil Jaiswal",
        image: drJaiswalImg,
        role: "Managing Director",
        qualifications: "BAMS, MS (General & Laparoscopic Surgery)",
    },
    {
        name: "Mr. Pravin Giripunje",
        image: drPravinImg,
        role: "Managing Director",
    },
    {
        name: "Dr. Tripti Sawlani",
        image: drTriptiImg,
        role: "Managing Director",
        qualifications: "BDS, MHA (Hospital Administration)",
    },
];

const allDoctors = [...existingDoctors, ...additionalDoctors];

const DoctorCard = ({ doctor }) => {
    const [imgSrc, setImgSrc] = useState(doctor.image || dummyDoctorImg);

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            className="group bg-white/90 border border-blue-100 rounded-2xl shadow-sm p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
            <h3 className="text-base md:text-lg font-bold text-blue-800 text-center">
                {doctor.name}
            </h3>
            <LoadingImage
                src={imgSrc}
                alt={doctor.name}
                className="mt-3 w-full aspect-[9/8] rounded-xl overflow-hidden bg-blue-50"
                imgClassName={`w-full h-full object-cover ${doctor.useCenterCrop ? "object-center" : "object-top"} transition-transform duration-500 group-hover:scale-105`}
                onError={() => setImgSrc(dummyDoctorImg)}
            />
            <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2 text-blue-700">
                    <BriefcaseMedical className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="text-sm leading-relaxed">
                        <span className="font-semibold text-blue-800">Designation: </span>
                        {doctor.role}
                    </p>
                </div>
                {doctor.qualifications && (
                    <div className="flex items-start gap-2 text-blue-700">
                        <GraduationCap className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                        <p className="text-sm leading-relaxed">
                            <span className="font-semibold text-blue-800">Qualifications: </span>
                            {doctor.qualifications}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

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
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                            Our Doctors 
                        </h3>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        {allDoctors.map((doctor) => (
                            <DoctorCard key={doctor.name} doctor={doctor} />
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Doctors;
