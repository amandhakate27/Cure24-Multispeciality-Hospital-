import {
    BadgeCheck,
    Clock3,
    Cpu,
    HeartHandshake,
    Stethoscope,
    Users,
} from "lucide-react";

const features = [
    {
        title: "Advanced Technology",
        description:
            "State-of-the-art medical equipment and latest treatment methodologies for accurate diagnosis and effective care.",
        Icon: Cpu,
    },
    {
        title: "Expert Team",
        description:
            "Highly qualified and experienced doctors, nurses, and medical staff dedicated to providing exceptional care.",
        Icon: Users,
    },
    {
        title: "24/7 Availability",
        description:
            "Round-the-clock emergency services and ambulance facilities ensuring immediate medical attention.",
        Icon: Clock3,
    },
    {
        title: "Compassionate Care",
        description:
            "Patient-centered approach with personalized treatment plans and empathetic healthcare professionals.",
        Icon: HeartHandshake,
    },
    {
        title: "Accredited Facility",
        description:
            "Certified and recognized healthcare facility meeting international standards of medical excellence.",
        Icon: BadgeCheck,
    },
    {
        title: "Comprehensive Services",
        description:
            "Wide range of medical specialties and services under one roof for complete healthcare solutions.",
        Icon: Stethoscope,
    },
];

const ServicesPreview = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-20">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_100%)]" />

            <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                        Why Choose Cure24?
                    </h2>
                    <p className="text-blue-700 mt-3">
                        Comprehensive healthcare solutions with cutting-edge technology
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((item) => (
                        <div
                            key={item.title}
                            className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <item.Icon className="w-5 h-5" aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-800">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-blue-700 mt-2 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesPreview;


