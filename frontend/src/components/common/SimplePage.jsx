import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const SimplePage = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="relative overflow-hidden pt-28 pb-16 md:pt-32">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100" />
                <div className="absolute -left-24 -top-24 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full" />
                <div className="absolute -right-10 top-24 w-48 h-48 bg-blue-300/30 blur-2xl rounded-full" />

                <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
                    <div className="text-sm text-blue-600">
                        <Link to="/" className="hover:text-blue-700 transition">Home</Link>
                        <span className="mx-2 text-blue-300">/</span>
                        <span className="text-blue-700">{title}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mt-3">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-blue-700 mt-3">
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>

            <main className="relative -mt-6 pb-16">
                {children ?? (
                    <div className="max-w-3xl mx-auto px-6 lg:px-10">
                        <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm p-8 text-center text-blue-700">
                            We are updating this page. Please check back soon.
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default SimplePage;

