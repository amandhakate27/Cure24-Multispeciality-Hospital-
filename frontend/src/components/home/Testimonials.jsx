import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import dummyTestimonialProfile from "../../assets/images/dummyTestimonialProfile.png";
import { buildApiUrl } from "../../utils/api";

const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const trackAnimation = (name, duration) => ({
    animation: `${name} ${duration}s linear infinite`,
});

const buildLoopItems = (items, minCount = 8) => {
    if (!items.length) return [];

    const loopItems = [];
    while (loopItems.length < minCount) {
        loopItems.push(...items);
    }

    return loopItems.slice(0, Math.max(minCount, items.length));
};

const TestimonialCard = ({ item, onPause, onResume }) => (
    <article
        className="flex w-[232px] sm:w-[360px] lg:w-[460px] max-w-[70vw] sm:max-w-[88vw] shrink-0 flex-col justify-between rounded-[20px] sm:rounded-[28px] border border-slate-200 bg-[#F3F4F6] p-3 sm:p-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.28)]"
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        onFocus={onPause}
        onBlur={onResume}
    >
        <div>
            <div className="mb-1 flex items-center text-blue-700 sm:mb-2">
                <Quote className="h-5 w-5 sm:h-8 sm:w-8 scale-x-[-1] fill-current" aria-hidden="true" />
            </div>
            <p className="min-h-[40px] sm:min-h-[60px] text-[12px] sm:text-[15px] font-semibold leading-5 sm:leading-6 text-black italic">
                {item.message}
            </p>
        </div>

        <div className="mt-2 flex items-center gap-3 border-t border-slate-200 pt-2 sm:mt-3 sm:gap-4 sm:pt-3">
            <img
                src={dummyTestimonialProfile}
                alt={item.name}
                className="h-9 w-9 sm:h-14 sm:w-14 rounded-full border border-slate-200 object-cover"
                loading="lazy"
            />
            <div>
                <h3 className="text-[13px] sm:text-lg font-semibold text-blue-900">{item.name}</h3>
            </div>
        </div>
    </article>
);

const TestimonialTrack = ({ items, pause, onPause, onResume, animationName, duration }) => {
    const loopBaseItems = buildLoopItems(items);

    return (
        <div className="relative overflow-hidden">
            <div
                className="flex w-max"
                style={{
                    ...trackAnimation(animationName, duration),
                    animationPlayState: pause ? "paused" : "running",
                    willChange: "transform",
                    transform: "translate3d(0, 0, 0)",
                }}
            >
                {[0, 1].map((groupIndex) => (
                    <div key={groupIndex} className="flex gap-3 pr-3 will-change-transform">
                        {loopBaseItems.map((item, index) => (
                            <TestimonialCard
                                key={`${item._id || item.name}-${groupIndex}-${index}`}
                                item={item}
                                onPause={onPause}
                                onResume={onResume}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        const fetchTestimonials = async () => {
            try {
                const response = await fetch(buildApiUrl("/api/testimonials"), {
                    signal: controller.signal,
                });

                if (!response.ok) return;

                const data = await response.json();
                if (!ignore) {
                    setTestimonials(data.testimonials || []);
                }
            } catch (error) {
                if (error.name !== "AbortError" && !ignore) {
                    setTestimonials([]);
                }
            }
        };

        fetchTestimonials();

        return () => {
            ignore = true;
            controller.abort();
        };
    }, []);

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="relative overflow-hidden py-12 md:py-14 lg:py-14">
            <style>{`
                @keyframes testimonial-marquee-left {
                    from { transform: translate3d(0, 0, 0); }
                    to { transform: translate3d(calc(-50% - 0.1875rem), 0, 0); }
                }

                @keyframes testimonial-marquee-right {
                    from { transform: translate3d(calc(-50% - 0.1875rem), 0, 0); }
                    to { transform: translate3d(0, 0, 0); }
                }
            `}</style>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,#041AA9_0%,#0A2FC6_55%,#1237B8_100%)]" />

            <motion.div
                className="relative"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="mx-auto max-w-[1600px] px-4 text-center sm:px-6 lg:px-10 xl:px-14">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-100/90">Patient Stories</p>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                        Words of care from our patients
                    </h2>
                    <p className="mt-3 text-base leading-7 text-blue-100/90">
                        Real feedback shared by families who trusted Cure24 Hospital for timely treatment and compassionate support.
                    </p>
                </div>

                <div className="relative mt-10 overflow-hidden">
                    <TestimonialTrack
                        items={testimonials}
                        pause={isPaused}
                        onPause={() => setIsPaused(true)}
                        onResume={() => setIsPaused(false)}
                        animationName="testimonial-marquee-left"
                        duration={72}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;

