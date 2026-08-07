import { useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseMedical, GraduationCap } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import LoadingImage from "../components/common/LoadingImage";
import dummyMaleDoctorImg from "../assets/images/dummyMaleDoctor.png";
import dummyFemaleDoctorImg from "../assets/images/dummyFemaleDoctor.png";
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
        image: dummyMaleDoctorImg,
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
        qualifications: "Profile details to be updated soon.",
    },
    {
        name: "Dr. Tripti Sawlani",
        image: drTriptiImg,
        role: "Managing Director",
        qualifications: "BDS, MHA (Hospital Administration)",
    },
];

const femaleDoctorNames = new Set([
    "Dr. Prajaktam Lende",
    "Dr. Neelam Lashkare",
    "Dr. Ankita Khubnani",
]);

const consultingDoctors = [
    { name: "Dr. Prajaktam Lende", department: "Orthopedic and Joint Replacement Surgery" },
    { name: "Dr. Nikhil Lakhade", department: "Orthopedic and Joint Replacement Surgery" },
    { name: "Dr. Nikhilesh Jibkate", department: "Urology" },
    { name: "Dr. Jeevan Kinkar", department: "Neurology" },
    { name: "Dr. Anand Somkuwar", department: "Neurology" },
    { name: "Dr. Ankur Sanghavi", department: "Neurosurgery" },
    { name: "Dr. Neelam Lashkare", department: "Obstetrics and Gynaecology" },
    { name: "Dr. Harihar Lambat", department: "Paediatrics" },
    { name: "Dr. Sandeep Dhoot", department: "Cardiology" },
    { name: "Dr. Avinash Gandhare", department: "Pulmonology" },
    { name: "Dr. Abhishek Somani", department: "Psychiatry" },
    { name: "Dr. Shashank Wanjari", department: "Gastroenterology" },
    { name: "Dr. Nikhil Khobragade", department: "Gastroenterology" },
    { name: "Dr. Chaitanya Jagtap", department: "Radiology" },
    { name: "Dr. Ashish Bhoyar", department: "Nephrology" },
    { name: "Dr. Mohsim Vanjara", department: "Opthalmology" },
    { name: "Dr. Ankita Khubnani", department: "Physiotherapy" },
    { name: "Dr. Mahadeo Narange", department: "Pathology" },
    { name: "Dr. Ritesh Shelkar", department: "ENT" },
    { name: "Dr. Ashish Keche", department: "ENT" },
    { name: "Dr. Amol Patel", department: "Plastic Surgery" },
    { name: "Dr. Tarun Deshbhratar", department: "Plastic Surgery" },
].map((doctor) => ({
    ...doctor,
    image: femaleDoctorNames.has(doctor.name) ? dummyFemaleDoctorImg : dummyMaleDoctorImg,
}));

const managementDoctors = [...existingDoctors, ...additionalDoctors];

const DoctorCard = ({ doctor, detailsLabel = "Qualifications" }) => {
    const [imgSrc, setImgSrc] = useState(doctor.image || dummyDoctorImg);

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            className="group mx-auto flex w-full max-w-[320px] flex-col rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg"
        >
            <h3 className="text-center text-base font-bold text-blue-800 md:text-lg">
                {doctor.name}
            </h3>
            <LoadingImage
                src={imgSrc}
                alt={doctor.name}
                className="mt-3 h-52 w-full overflow-hidden rounded-xl bg-blue-50"
                imgClassName="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgSrc(dummyDoctorImg)}
            />
            <div className="mt-3 space-y-2">
                {doctor.role ? (
                    <div className="flex items-start gap-2 text-blue-700">
                        <BriefcaseMedical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <p className="text-sm leading-relaxed">
                            <span className="font-semibold text-blue-800">Designation: </span>
                            {doctor.role}
                        </p>
                    </div>
                ) : null}
                {doctor.department ? (
                    <div className="flex items-start gap-2 text-blue-700">
                        <BriefcaseMedical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <p className="text-sm leading-relaxed">
                            <span className="font-semibold text-blue-800">Department: </span>
                            {doctor.department}
                        </p>
                    </div>
                ) : null}
                {doctor.qualifications ? (
                    <div className="flex items-start gap-2 text-blue-700">
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <p className="text-sm leading-relaxed">
                            <span className="font-semibold text-blue-800">{detailsLabel}: </span>
                            {doctor.qualifications}
                        </p>
                    </div>
                ) : null}
            </div>
        </motion.div>
    );
};

const DoctorsSection = ({ title, doctors, detailsLabel }) => (
    <section className="py-12">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 xl:px-14">
            <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-2xl font-bold text-blue-800 md:text-3xl">{title}</h3>
            </div>

            <motion.div
                className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
            >
                {doctors.map((doctor) => (
                    <DoctorCard key={`${title}-${doctor.name}`} doctor={doctor} detailsLabel={detailsLabel} />
                ))}
            </motion.div>
        </div>
    </section>
);

const Doctors = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">
                <div className="mt-0 bg-blue-800 text-white">
                    <div className="mx-auto max-w-[1600px] px-6 py-8 text-center lg:px-10 xl:px-14">
                        <h2 className="text-2xl font-semibold md:text-3xl">Our Expert Doctors</h2>
                        <p className="mx-auto mt-2 max-w-3xl text-sm text-blue-100 md:text-base">
                            Meet our team of highly qualified and experienced medical professionals dedicated
                            to providing exceptional healthcare services
                        </p>
                    </div>
                </div>
            </section>

            <DoctorsSection
                title="Our Doctors and Managing Staff"
                doctors={managementDoctors}
                detailsLabel="Qualifications"
            />

            <DoctorsSection
                title="Our Consulting Doctors"
                doctors={consultingDoctors}
                detailsLabel="Qualifications"
            />

            <Footer />
        </div>
    );
};

export default Doctors;
