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

const trackAnimation = (name, duration, reverse = false) => ({
    animation: `${name} ${duration}s linear infinite`,
    animationDirection: reverse ? "reverse" : "normal",
});

const splitTestimonials = (items) => {
    const primary = items.filter((_, index) => index % 2 === 0);
    const secondary = items.filter((_, index) => index % 2 === 1);

    return {
        primaryTrack: primary.length >= 3 ? primary : items,
        secondaryTrack: secondary.length >= 3 ? secondary : items,
    };
};

const TestimonialCard = ({ item, onPause, onResume }) => (
    <article
        className="flex w-[232px] sm:w-[360px] lg:w-[460px] max-w-[70vw] sm:max-w-[88vw] shrink-0 flex-col justify-between rounded-[20px] sm:rounded-[28px] border border-slate-200 bg-[#F3F4F6] p-3 sm:p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.28)]"
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        onFocus={onPause}
        onBlur={onResume}
    >
        <div>
            <div className="mb-2 flex items-center text-blue-700 sm:mb-3">
                <Quote className="h-5 w-5 sm:h-9 sm:w-9 scale-x-[-1] fill-current" aria-hidden="true" />
            </div>
            <p className="min-h-[58px] sm:min-h-[88px] text-[12px] sm:text-base font-semibold leading-5 sm:leading-7 text-black">
                {item.message}
            </p>
        </div>

        <div className="mt-3 flex items-center gap-3 border-t border-slate-200 pt-3 sm:gap-4">
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

const TestimonialTrack = ({ items, pause, onPause, onResume, reverse, animationName, duration }) => {
    const repeatedItems = [...items, ...items];

    return (
        <div className="relative overflow-hidden">
            <div
                className="flex w-max gap-3"
                style={{
                    ...trackAnimation(animationName, duration, reverse),
                    animationPlayState: pause ? "paused" : "running",
                    willChange: "transform",
                    transform: "translate3d(0, 0, 0)",
                }}
            >
                {repeatedItems.map((item, index) => (
                    <TestimonialCard
                        key={`${item._id || item.name}-${index}`}
                        item={item}
                        onPause={onPause}
                        onResume={onResume}
                    />
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

    const { primaryTrack, secondaryTrack } = splitTestimonials(testimonials);

    return (
        <section className="relative overflow-hidden py-16 md:py-20">
            <style>{`
                @keyframes testimonial-marquee-left {
                    from { transform: translate3d(0, 0, 0); }
                    to { transform: translate3d(calc(-50% - 0.75rem), 0, 0); }
                }

                @keyframes testimonial-marquee-right {
                    from { transform: translate3d(calc(-50% - 0.75rem), 0, 0); }
                    to { transform: translate3d(0, 0, 0); }
                }
            `}</style>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,#041AA9_0%,#0A2FC6_55%,#1237B8_100%)]" />
            <div className="absolute left-0 top-10 h-44 w-44 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" />

            <motion.div
                className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-100/90">Patient Stories</p>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                        Words of care from our patients
                    </h2>
                    <p className="mt-3 text-base leading-7 text-blue-100/90">
                        Real feedback shared by families who trusted Cure24 Hospital for timely treatment and compassionate support.
                    </p>
                </div>

                <div className="relative mt-10 space-y-4 sm:space-y-6">
                    <TestimonialTrack
                        items={primaryTrack}
                        pause={isPaused}
                        onPause={() => setIsPaused(true)}
                        onResume={() => setIsPaused(false)}
                        animationName="testimonial-marquee-right"
                        duration={34}
                    />

                    <TestimonialTrack
                        items={secondaryTrack}
                        pause={isPaused}
                        onPause={() => setIsPaused(true)}
                        onResume={() => setIsPaused(false)}
                        animationName="testimonial-marquee-left"
                        duration={26}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;




