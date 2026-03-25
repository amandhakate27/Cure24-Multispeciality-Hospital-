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
    const isInView = useInView(cardRef, { once: true, amount: 0.35 });
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
        <div ref={cardRef} className="text-center">
            <h3 className="text-3xl font-bold tracking-[-0.04em] text-[#041AA9] sm:text-4xl md:text-5xl">
                {count}
                {suffix}
            </h3>
            <p className="mt-2 text-sm font-medium text-blue-700 sm:text-base">{label}</p>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="relative z-10 -mt-10 pb-10 sm:-mt-14 md:-mt-20 md:pb-14 lg:-mt-24">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-[26px] border border-white/70 bg-white/82 px-6 py-7 shadow-[0_20px_70px_rgba(4,26,169,0.14)] backdrop-blur-xl sm:px-8 md:px-10 md:py-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
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
