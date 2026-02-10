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
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100" />
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full" />
            <div className="absolute -right-10 top-24 w-48 h-48 bg-blue-300/30 blur-2xl rounded-full" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                        Why Choose Cure24?
                    </h2>
                    <p className="text-slate-600 mt-3">
                        Comprehensive healthcare solutions with cutting-edge technology
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {features.map((item) => (
                        <div
                            key={item.title}
                            className="group bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200"
                        >
                            <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <item.Icon className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-800 mt-4">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 mt-2 text-sm leading-relaxed">
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

