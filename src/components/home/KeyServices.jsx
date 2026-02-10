import LoadingImage from "../common/LoadingImage";
import LoadingLink from "../common/LoadingLink";
import cardiologyImg from "../../assets/images/cardiology.jpg";
import criticalCareImg from "../../assets/images/critical care.jpg";
import emergencyCareImg from "../../assets/images/emergency-care.jpg";
import neurologyImg from "../../assets/images/neurology.jpg";
import diabeticsImg from "../../assets/images/diabetics.png";
import generalMedicineImg from "../../assets/images/general medicin.png";


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

const KeyServices = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100" />
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full" />
            <div className="absolute -right-10 top-24 w-48 h-48 bg-blue-300/30 blur-2xl rounded-full" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                        Our Key Services
                    </h2>
                    <p className="text-slate-600 mt-3">
                        Specialized medical departments for comprehensive care
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
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
                            <p className="text-slate-600 text-sm mt-2 text-center">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <LoadingLink
                        to="/services"
                        className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition-transform active:scale-95"
                    >
                        View All Services
                    </LoadingLink>
                </div>
            </div>
        </section>
    );
};

export default KeyServices;
