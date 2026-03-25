import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const random = (min, max) => min + (max - min) * Math.random();

const buildCardinalPath = (points, closed = true, tension = 1) => {
    if (!points.length) return "M0 0";
    const size = points.length - (closed ? 0 : 1);
    let path = `M${points[0].x} ${points[0].y} C`;
    for (let i = 0; i < size; i += 1) {
        let p0, p1, p2, p3;
        if (closed) {
            p0 = points[(i - 1 + size) % size];
            p1 = points[i];
            p2 = points[(i + 1) % size];
            p3 = points[(i + 2) % size];
        } else {
            p0 = i === 0 ? points[0] : points[i - 1];
            p1 = points[i];
            p2 = points[i + 1];
            p3 = i === size - 1 ? p2 : points[i + 2];
        }
        const x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
        const y1 = p1.y + ((p2.y - p0.y) / 6) * tension;
        const x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
        const y2 = p2.y - ((p3.y - p1.y) / 6) * tension;
        path += ` ${x1} ${y1} ${x2} ${y2} ${p2.x} ${p2.y}`;
    }
    return closed ? `${path}z` : path;
};

const BlobBackground = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const primaryBlobRef = useRef(null);
    const secondaryBlobRef = useRef(null);
    const tweensRef = useRef([]);
    const frameRef = useRef(0);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        gsap.ticker.lagSmoothing(0);

        const createBlob = ({ element, centerX, centerY, minRadius, maxRadius, minDuration, maxDuration, pointCount, tension = 1 }) => {
            const points = [];
            const angleStep = (Math.PI * 2) / pointCount;
            const baseAngle = random(0, Math.PI * 2);

            for (let i = 0; i < pointCount; i += 1) {
                const angle = baseAngle + i * angleStep;
                const point = {
                    x: centerX + Math.cos(angle) * minRadius,
                    y: centerY + Math.sin(angle) * minRadius,
                };
                const move = () => {
                    const tween = gsap.to(point, {
                        duration: random(minDuration, maxDuration),
                        x: centerX + Math.cos(angle) * random(minRadius, maxRadius),
                        y: centerY + Math.sin(angle) * random(minRadius, maxRadius),
                        ease: "sine.inOut",
                        overwrite: "auto",
                        onComplete: move,
                    });
                    tweensRef.current.push(tween);
                };
                move();
                points.push(point);
            }
            return () => {
                element.setAttribute("d", buildCardinalPath(points, true, tension));
            };
        };

        const drawPrimary = createBlob({
            element: primaryBlobRef.current,
            centerX: 142,
            centerY: 138,
            minRadius: 100,
            maxRadius: 145,
            minDuration: 2.0,
            maxDuration: 3.2,
            pointCount: 6,
            tension: 1,
        });

        const drawSecondary = createBlob({
            element: secondaryBlobRef.current,
            centerX: 168,
            centerY: 150,
            minRadius: 58,
            maxRadius: 84,
            minDuration: 1.6,
            maxDuration: 2.6,
            pointCount: 5,
            tension: 0.95,
        });

        // ✅ THROTTLE: every 2nd frame (30fps) + skip entirely when off-screen
        const render = () => {
            if (!isVisibleRef.current) return;
            frameRef.current += 1;
            if (frameRef.current % 2 === 0) {
                drawPrimary();
                drawSecondary();
            }
        };

        gsap.ticker.add(render);

        // ✅ PAUSE when hero scrolls off screen — biggest scroll lag fix
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        if (containerRef.current) observer.observe(containerRef.current);

        // GPU-composited float tweens
        tweensRef.current.push(
            gsap.to(primaryBlobRef.current, {
                x: 10, y: -8, duration: 3.2,
                repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true,
            }),
            gsap.to(secondaryBlobRef.current, {
                x: -10, y: 10, duration: 3.6,
                repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true,
            }),
            gsap.to(wrapperRef.current, {
                rotate: 1.5, duration: 4.5,
                repeat: -1, yoyo: true, ease: "sine.inOut",
                transformOrigin: "50% 50%", force3D: true,
            })
        );

        return () => {
            gsap.ticker.remove(render);
            observer.disconnect();
            tweensRef.current.forEach((t) => t?.kill());
            tweensRef.current = [];
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_30%,rgba(255,255,255,0.78),transparent_30%),radial-gradient(circle_at_32%_62%,rgba(127,211,255,0.18),transparent_36%)]" />
            <svg
                ref={wrapperRef}
                viewBox="0 0 320 320"
                className="absolute left-[-2%] top-[1%] h-[110%] w-[110%] overflow-visible"
                style={{ willChange: "transform" }}
            >
                <defs>
                    <filter id="hero-blob-soften" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="10" />
                    </filter>
                    <filter id="hero-blob-glow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="16" result="blur" />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 20 -8"
                        />
                    </filter>
                    <linearGradient id="hero-primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#BFE9FF" />
                        <stop offset="48%" stopColor="#7FD3FF" />
                        <stop offset="100%" stopColor="#0A2FC6" />
                    </linearGradient>
                    <linearGradient id="hero-secondary-gradient" x1="20%" y1="10%" x2="90%" y2="100%">
                        <stop offset="0%" stopColor="#E9F8FF" />
                        <stop offset="52%" stopColor="#8BD8FF" />
                        <stop offset="100%" stopColor="#1B4BE0" />
                    </linearGradient>
                </defs>
                <path
                    ref={primaryBlobRef}
                    fill="url(#hero-primary-gradient)"
                    opacity="0.88"
                    filter="url(#hero-blob-glow)"
                    style={{ willChange: "transform" }}
                />
                <path
                    ref={secondaryBlobRef}
                    fill="url(#hero-secondary-gradient)"
                    opacity="0.74"
                    filter="url(#hero-blob-soften)"
                    style={{ willChange: "transform" }}
                />
            </svg>
        </div>
    );
};

export default BlobBackground;
