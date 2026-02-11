import Hero from '../components/home/Hero';
import Navbar from '../components/common/Navbar';
import Stats from '../components/home/Stats';
import About from '../components/home/About';
import ServicesPreview from '../components/home/ServicesPreview';
import KeyServices from '../components/home/KeyServices';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/common/Footer';
const Home = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />
            <Hero />
            <Stats />
            <About />
            <ServicesPreview />
            <KeyServices />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Home;
