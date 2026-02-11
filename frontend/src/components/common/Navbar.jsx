import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingLink from "./LoadingLink";
import hospitalLogo from "../../assets/images/reallogo1.png";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Doctors", to: "/doctors" },
    { label: "Insurance", to: "/insurance" },
    { label: "Contact", to: "/contact" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <div className=" backdrop-blur-md ">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/" className="inline-flex items-center h-full cursor-pointer">
                        <img
                            src={hospitalLogo}
                            alt="Cure 24 Hospital"
                            className="h-[70%] w-auto max-h-full max-w-[100px] sm:max-w-[150px] md:max-w-[200px] object-contain transition-transform hover:scale-105  "
                        />
                    </Link>

                    {/* DESKTOP MENU */}
                    <nav className="hidden lg:flex items-center gap-8 text-lg font-medium text-slate-700">
                        {navLinks.map((link) => (
                            <div key={link.label} className="relative">
                                <Link
                                    to={link.to}
                                    className="relative inline-block transition-all duration-300 hover:scale-110 hover:text-blue-600 text-slate-700"
                                >
                                    {link.label}
                                </Link>
                            </div>
                        ))}

                        <LoadingLink
                            to="/appointment"
                            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Book Now
                        </LoadingLink>
                    </nav>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-blue-100 text-blue-700 transition-transform hover:scale-[1.03] active:scale-95"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 6h16" />
                            <path d="M4 12h16" />
                            <path d="M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-md">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 text-slate-700">
                        <Link to="/" onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Home</Link>
                        <Link to="/about" onClick={() => setOpen(false)} className="hover:underline underline-offset-4">About Us</Link>
                        <Link to="/services" onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Services</Link>
                        <Link to="/doctors" onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Doctors</Link>
                        <Link to="/insurance" onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Insurance</Link>
                        <Link to="/contact" onClick={() => setOpen(false)} className="hover:underline underline-offset-4">Contact</Link>

                        <LoadingLink
                            to="/appointment"
                            onClick={() => setOpen(false)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full w-fit transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Book Now
                        </LoadingLink>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
