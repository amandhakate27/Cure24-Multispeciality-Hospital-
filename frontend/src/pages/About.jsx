import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Heart, Target, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import hospitalLogo from "../assets/images/reallogo1.png";
import bedFacilitiesImg from "../assets/images/Bed Facilities.jpeg";
import hospitalExteriorViewImg from "../assets/images/hospital exterior view.jpeg";
import inpatientImg from "../assets/images/inpatient services.png";
import medicalNurseImg from "../assets/images/medical-nurse.jpg";
import preventiveHealthCheckupsImg from "../assets/images/preventive health checkups.png";
import roomFacilitiesImg from "../assets/images/Room facilities.jpeg";
import stretcherBedImg from "../assets/images/Stretcher Bed.jpeg";
import receptionViewImg from "../assets/images/slideimage.jpg";
import womenDoctorServiceImg from "../assets/images/women-doctor-service.png";

const cardsContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const popCard = {
    hidden: { opacity: 0, scale: 0.9, y: 24, rotateX: -6 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const galleryPhotos = [
    { id: "bed-facilities", title: "Comfortable Bed Facilities", image: bedFacilitiesImg },
    { id: "hospital-exterior-view", title: "Hospital Exterior", image: hospitalExteriorViewImg },
    { id: "inpatient-services", title: "Inpatient Care Services", image: inpatientImg },
    { id: "medical-nurse", title: "Skilled Doctors Care Team", image: medicalNurseImg },
    { id: "preventive-health-checkups", title: "Preventive Health Checkup", image: preventiveHealthCheckupsImg },
    { id: "room-facilities", title: "Patient Room Facilities", image: roomFacilitiesImg },
    { id: "stretcher-bed", title: "Emergency Stretcher Support", image: stretcherBedImg },
    { id: "reception-view", title: "Reception and Front Desk", image: receptionViewImg },
    { id: "women-doctor-service", title: "Personalized Doctor Consultation", image: womenDoctorServiceImg },
];

const About = () => {
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [lightboxDirection, setLightboxDirection] = useState(1);

    const selectedPhotoIndex = useMemo(
        () => galleryPhotos.findIndex((photo) => photo.id === selectedPhotoId),
        [selectedPhotoId]
    );
    const selectedPhoto = selectedPhotoIndex >= 0 ? galleryPhotos[selectedPhotoIndex] : null;

    const handleOpenPhoto = useCallback((photoId, direction = 1) => {
        setLightboxDirection(direction);
        setSelectedPhotoId(photoId);
    }, []);
    const handleClosePhoto = useCallback(() => setSelectedPhotoId(null), []);
    const handlePrevPhoto = useCallback(() => {
        if (selectedPhotoIndex < 0) return;
        const prevIndex = (selectedPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
        setLightboxDirection(-1);
        setSelectedPhotoId(galleryPhotos[prevIndex].id);
    }, [selectedPhotoIndex]);
    const handleNextPhoto = useCallback(() => {
        if (selectedPhotoIndex < 0) return;
        const nextIndex = (selectedPhotoIndex + 1) % galleryPhotos.length;
        setLightboxDirection(1);
        setSelectedPhotoId(galleryPhotos[nextIndex].id);
    }, [selectedPhotoIndex]);

    useEffect(() => {
        if (!selectedPhoto) return undefined;
        const onKeyDown = (event) => {
            if (event.key === "Escape") handleClosePhoto();
            if (event.key === "ArrowLeft") handlePrevPhoto();
            if (event.key === "ArrowRight") handleNextPhoto();
        };
        window.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedPhoto, handleClosePhoto, handlePrevPhoto, handleNextPhoto]);

    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">

                <div className="mt-6 bg-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">About Us</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            Cure24 Clinic is a trusted neighbourhood healthcare centre in Nagpur,
                            offering compassionate medical care, expert consultations, and
                            patient-focused treatment for everyday health needs.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                                Cure 24 Clinic Hospital, Nagpur
                            </h3>
                            <p className="text-blue-700 mt-4 text-sm leading-relaxed [text-align:justify]">
                                Cure 24 Clinic is a patient-centric healthcare facility located in Nagpur,
                                dedicated to providing reliable, compassionate, and accessible medical care
                                for individuals and families. Our clinic focuses on delivering a complete
                                primary healthcare service with emphasis on accurate diagnosis, clinical
                                medical practice, and personalized treatment plans. Led by experienced and
                                qualified doctors, Cure 24 Clinic aims to address everyday health concerns,
                                chronic conditions, and preventive healthcare needs under one roof. We
                                believe in building long-term doctor-patient relationships through trust,
                                transparency, and clear communication. With a clean, comfortable environment
                                and a commitment to timely consultations, we strive to make quality
                                healthcare convenient and affordable for our community. At Cure 24 Clinic,
                                patient well-being is our highest priority, and we continuously work toward
                                improving health outcomes through professional excellence and compassionate
                                care.
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center p-4 sm:p-6">
                                <img
                                    src={hospitalLogo}
                                    alt="Cure 24 Multi-Speciality Hospital"
                                    className="w-full h-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-800">Photo Gallery</h3>
                        <p className="text-blue-700 mt-2 text-sm md:text-base">
                            Explore our facility and healthcare infrastructure
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8"
                        variants={cardsContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {galleryPhotos.map((photo) => (
                            <motion.button
                                key={photo.title}
                                type="button"
                                variants={popCard}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                                onClick={() => handleOpenPhoto(photo.id)}
                                className="text-left bg-white/95 border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                            >
                                <div className="relative h-48 bg-blue-50">
                                    <img
                                        src={photo.image}
                                        alt={photo.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <div className="px-4 pb-3 text-white text-xs font-medium tracking-wide">
                                            Click to view
                                        </div>
                                    </div>
                                </div>
                                <p className="px-4 py-3 text-sm md:text-base font-semibold text-blue-800 text-center">
                                    {photo.title}
                                </p>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
                        Our Mission & Vision
                    </h3>
                    <p className="text-blue-700 mt-2 text-sm md:text-base text-center">
                        Committed to transforming healthcare in Nagpur and beyond
                    </p>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 rounded-3xl bg-blue-50/80 border border-blue-100/70 p-4 sm:p-6"
                        variants={cardsContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.div
                            variants={popCard}
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/95 border border-blue-100 rounded-2xl shadow-sm p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Target className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Mission</h4>
                            <p className="text-blue-700 text-sm mt-2">
                                To provide world-class, patient-centered healthcare services that are
                                accessible, affordable, and delivered with compassion. We strive to be the
                                first choice for comprehensive medical care in Central India.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={popCard}
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/95 border border-blue-100 rounded-2xl shadow-sm p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Eye className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Vision</h4>
                            <p className="text-blue-700 text-sm mt-2">
                                To be recognized as the leading multi-specialty healthcare institution in
                                Maharashtra, setting benchmarks in medical excellence, innovation, and
                                patient satisfaction through continuous improvement.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={popCard}
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white/95 border border-blue-100 rounded-2xl shadow-sm p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                                <Heart className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h4 className="text-base font-semibold text-blue-800 mt-4">Our Values</h4>
                            <p className="text-blue-700 text-sm mt-2">
                                Excellence in care, integrity in practice, compassion in service, innovation
                                in treatment, and commitment to our community. These core values guide
                                every decision we make.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePhoto}
                    >
                        <motion.div
                            className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                            initial={{ scale: 0.92, y: 14, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.94, y: 10, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100">
                                <h4 className="text-base md:text-lg font-semibold text-blue-800">
                                    {selectedPhoto.title}
                                </h4>
                                <button
                                    type="button"
                                    onClick={handleClosePhoto}
                                    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-50 transition-colors"
                                >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                    Close
                                </button>
                            </div>
                            <div className="relative bg-blue-50">
                                <button
                                    type="button"
                                    onClick={handlePrevPhoto}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 border border-blue-200 text-blue-800 flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Previous photo"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.img
                                        key={selectedPhoto.id}
                                        src={selectedPhoto.image}
                                        alt={selectedPhoto.title}
                                        className="w-full max-h-[75vh] object-contain"
                                        initial={{ opacity: 0, x: lightboxDirection * 90, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -lightboxDirection * 90, scale: 0.96 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </AnimatePresence>
                                <button
                                    type="button"
                                    onClick={handleNextPhoto}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 border border-blue-200 text-blue-800 flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Next photo"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="px-4 py-3 border-t border-blue-100 bg-white">
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {galleryPhotos.map((photo) => {
                                        const isSelected = photo.id === selectedPhoto.id;
                                        return (
                                            <button
                                                key={photo.id}
                                                type="button"
                                                onClick={() =>
                                                    handleOpenPhoto(
                                                        photo.id,
                                                        selectedPhotoIndex >= 0 && galleryPhotos.findIndex((item) => item.id === photo.id) < selectedPhotoIndex ? -1 : 1
                                                    )
                                                }
                                                className={`relative h-14 w-20 rounded-md overflow-hidden border shrink-0 ${isSelected ? "border-blue-700 ring-1 ring-blue-700" : "border-blue-200"
                                                    }`}
                                            >
                                                <img
                                                    src={photo.image}
                                                    alt={photo.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default About;

