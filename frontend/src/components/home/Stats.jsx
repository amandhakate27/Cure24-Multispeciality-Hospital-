import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const statsData = [
    {
        value: 24,
        suffix: "/7",
        label: "Emergency Care",
    },
    {
        value: 50,
        suffix: "+",
        label: "Expert Doctors",
    },
    {
        value: 15,
        suffix: "+",
        label: "Departments",
    },
    {
        value: 50,
        suffix: "k+",
        label: "Happy Patients",
    },
];

const StatCard = ({ value, suffix, label, duration = 1200 }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.4 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let frameId;
        const startTime = performance.now();

        const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.max(1, Math.round(eased * value));
            setCount(current);
            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        frameId = requestAnimationFrame(animate);
        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [isInView, value, duration]);

    return (
        <div ref={cardRef} className="sm:px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-700">
                {count}
                {suffix}
            </h3>
            <p className="text-blue-700 mt-2 text-sm md:text-base">{label}</p>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-white via-blue-50 to-blue-100" />
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full -z-10" />
            <div className="absolute -right-10 top-24 w-48 h-48 bg-blue-300/30 blur-2xl rounded-full -z-10" />
            <div className="w-full">
                <div className="w-full bg-blue-50/70 backdrop-blur-md rounded-none border border-blue-100/70 shadow-[0_18px_45px_rgba(30,64,175,0.28)] px-6 py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {statsData.map((item) => (
                            <StatCard
                                key={item.label}
                                value={item.value}
                                suffix={item.suffix}
                                label={item.label}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
