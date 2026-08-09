import { Suspense, lazy } from 'react';
import Hero from '../components/home/Hero';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Reveal from '../components/common/Reveal';

const About = lazy(() => import('../components/home/About'));
const ServicesPreview = lazy(() => import('../components/home/ServicesPreview'));
const KeyServices = lazy(() => import('../components/home/KeyServices'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const CallToAction = lazy(() => import('../components/home/CallToAction'));
const CampaignVideos = lazy(() => import('../components/home/CampaignVideos'));

const SectionFallback = ({ height = 'min-h-[220px]' }) => (
    <div className={`${height} bg-transparent`} />
);

const Home = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />
            <Hero />
            <Suspense fallback={<SectionFallback height="min-h-[520px]" />}>
                <Reveal><About /></Reveal>
            </Suspense>
            <Suspense fallback={<SectionFallback height="min-h-[420px]" />}>
                <Reveal><ServicesPreview /></Reveal>
            </Suspense>
            <Suspense fallback={<SectionFallback height="min-h-[420px]" />}>
                <Reveal><KeyServices /></Reveal>
            </Suspense>
            <Suspense fallback={<SectionFallback height="min-h-[260px]" />}>
                <Reveal><CallToAction /></Reveal>
            </Suspense>
            <Suspense fallback={<SectionFallback height="min-h-[380px]" />}>
                <Reveal><CampaignVideos /></Reveal>
            </Suspense>
            <Suspense fallback={null}>
                <Reveal><Testimonials /></Reveal>
            </Suspense>
            <Footer />
        </div>
    );
};

export default Home;
