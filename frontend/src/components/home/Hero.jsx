import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import heroImage from "../../assets/images/heroImage1.jpg";
import BlobBackground from "./BlobBackground";

const stats = [
    { value: 24, suffix: "/7", label: "Emergency Care" },
    { value: 50, suffix: "+", label: "Expert Doctors" },
    { value: 15, suffix: "+", label: "Departments" },
    { value: 50, suffix: "k+", label: "Happy Patients" },
];

const Hero = () => {
    const [counts, setCounts] = useState(stats.map(() => 0));

    useEffect(() => {
        const duration = 1400;
        const frameMs = 16;
        const totalFrames = Math.max(1, Math.round(duration / frameMs));
        let frame = 0;

        const interval = setInterval(() => {
            frame += 1;
            const progress = Math.min(frame / totalFrames, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCounts(stats.map((item) => Math.round(item.value * eased)));

            if (progress >= 1) {
                clearInterval(interval);
            }
        }, frameMs);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f7fbff_0%,#eef4ff_48%,#f8fbff_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(4,26,169,0.10),transparent_28%),radial-gradient(circle_at_72%_24%,rgba(4,26,169,0.08),transparent_22%)]" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-0 pt-20 sm:px-7 sm:pt-24 md:pt-20 lg:px-10 xl:px-12">
                <div className="grid flex-1 items-center gap-3 lg:grid-cols-[55%_45%] lg:gap-8 xl:gap-12">
                    <div className="flex flex-col justify-center self-stretch pt-0">
                        <div className="mx-auto w-full max-w-[700px] md:max-w-[760px] lg:max-w-full lg:mx-0">
                            <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.06em] text-[#0a2fc6] sm:text-5xl md:text-[3.6rem] text-center lg:text-[4.4rem] lg:text-left">
                                Care That Never Sleeps
                            </h1>
                            <p className="mt-5 max-w-full text-[15px] leading-7 text-slate-600 sm:text-base md:text-[16px] text-center lg:text-left mx-auto lg:mx-0">
                                Experience world-class healthcare with 24/7 emergency services, advanced medical
                                technology, and compassionate care in Nagpur.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <a
                                    href="tel:+919654317717"
                                    className="inline-flex min-w-[170px] items-center justify-center gap-3 rounded-xl bg-[#0a2fc6] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_rgba(10,47,198,0.22)] transition hover:bg-[#041aa9]"
                                >
                                    <Phone className="h-5 w-5" />
                                    Book Now
                                </a>
                                <a
                                    href="https://wa.me/919654317717"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex min-w-[170px] items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_rgba(37,211,102,0.22)] transition hover:bg-[#1fb95a]"
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                                        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .19 5.32.19 11.87c0 2.09.55 4.13 1.58 5.93L0 24l6.38-1.67a11.83 11.83 0 0 0 5.67 1.45h.01c6.55 0 11.88-5.32 11.88-11.87 0-3.17-1.24-6.14-3.42-8.43ZM12.06 21.77h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.79 1 1.01-3.69-.23-.38a9.85 9.85 0 0 1-1.51-5.24c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 6.99 2.9a9.81 9.81 0 0 1 2.9 7c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.41-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.47.13-.61.14-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.23-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.08-.8.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.04.15.2 2.08 3.18 5.05 4.45.7.3 1.25.48 1.68.61.71.23 1.35.19 1.86.12.56-.08 1.77-.72 2.02-1.41.25-.7.25-1.3.17-1.42-.08-.13-.28-.2-.58-.35Z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>

                            <div className="mt-8 grid max-w-[600px] md:max-w-[720px] grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:mt-9 mx-auto lg:mx-0 pb-6 lg:pb-0">
                                {stats.map((item, index) => (
                                    <div key={item.label} className="text-center lg:text-left">
                                        <p className="text-[1.9rem] font-bold tracking-[-0.05em] text-[#0a2fc6] sm:text-[2.2rem]">
                                            {counts[index]}{item.suffix}
                                        </p>
                                        <p className="mt-1 text-[12px] font-medium text-[#4361b6] sm:text-[14px]">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative flex w-full items-center justify-center self-center overflow-visible min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:self-stretch lg:items-end lg:justify-end lg:min-h-0 lg:pt-0 pb-0 md:pb-0 lg:pb-0">
                        <BlobBackground />
                        <img
                            src={heroImage}
                            alt="Cure24 Hospital care team"
                            className="relative z-10 w-auto max-w-full object-contain object-bottom h-[360px] sm:h-[420px] md:h-[480px] lg:-ml-2 lg:h-full lg:max-h-[680px] xl:-ml-6"
                            decoding="async"
                            fetchPriority="high"
                        />


                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
