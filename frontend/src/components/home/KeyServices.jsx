import LoadingImage from "../common/LoadingImage";
import LoadingLink from "../common/LoadingLink";
import criticalCareImg from "../../assets/images/critical care.jpg";
import emergencyCareImg from "../../assets/images/emergency-care.jpg";
import neurologyImg from "../../assets/images/neurology.jpeg";
import diabeticsImg from "../../assets/images/diabetics.png";
import generalMedicineImg from "../../assets/images/general medicin.png";
import anesthesiologyImg from "../../assets/images/anesthesiology.png";


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
    {
        title: "Anesthesiology",
        description: "Safe perioperative care and anesthesia support for surgeries.",
        image: anesthesiologyImg,
    },
];

const KeyServices = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-20">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_100%)]" />

            <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                        Our Key Services
                    </h2>
                    <p className="text-blue-700 mt-3">
                        Specialized medical departments for comprehensive care
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
                        >
                            <LoadingImage
                                src={service.image}
                                alt={service.title}
                                className="h-44 md:h-48 rounded-xl"
                                imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <h3 className="text-base font-semibold text-blue-800 mt-4 text-center">
                                {service.title}
                            </h3>
                            <p className="text-blue-700 text-sm mt-2 text-center">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

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

