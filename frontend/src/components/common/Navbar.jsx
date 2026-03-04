import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingLink from "./LoadingLink";
import hospitalLogo from "../../assets/images/reallogo1.png";

const aboutMenuLinks = [
    { label: "About Us", to: "/about" },
    { label: "Gallery", to: "/gallery" },
];

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Doctors", to: "/doctors" },
    { label: "Insurance", to: "/insurance" },
    { label: "Contact", to: "/contact" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

    const closeMobileMenu = () => {
        setOpen(false);
        setMobileAboutOpen(false);
    };

    const toggleMobileMenu = () => {
        setOpen((prev) => {
            if (prev) {
                setMobileAboutOpen(false);
            }
            return !prev;
        });
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <div className="backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:max-w-none xl:px-12 2xl:px-16 h-16 sm:h-20 flex items-center justify-between">
                    <Link to="/" className="inline-flex items-center h-full cursor-pointer">
                        <img
                            src={hospitalLogo}
                            alt="Cure 24 Hospital"
                            className="h-[70%] w-auto max-h-full max-w-[100px] sm:max-w-[150px] md:max-w-[200px] object-contain transition-transform hover:scale-105"
                        />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 text-base font-medium text-blue-800">
                        <Link
                            to="/"
                            className="relative inline-block transition-all duration-300 hover:scale-110 hover:text-blue-900 text-blue-800"
                        >
                            Home
                        </Link>

                        <div className="relative group">
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 transition-all duration-300 hover:scale-110 hover:text-blue-900 text-blue-800"
                                aria-haspopup="menu"
                            >
                                About
                                <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </button>

                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                                <div className="min-w-[11rem] rounded-xl border border-blue-100 bg-white shadow-lg p-2">
                                    {aboutMenuLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            className="block px-3 py-2 text-sm rounded-lg text-blue-800 hover:bg-blue-50 hover:text-blue-900"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {navLinks.slice(1).map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className="relative inline-block transition-all duration-300 hover:scale-110 hover:text-blue-900 text-blue-800"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <LoadingLink
                            to="/appointment"
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Book Now
                        </LoadingLink>

                        <LoadingLink
                            to="/admin"
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Admin
                        </LoadingLink>
                    </nav>

                    <button
                        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-blue-100 text-blue-700 transition-transform hover:scale-[1.03] active:scale-95"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={open}
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

            {open && (
                <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-md">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 text-base text-blue-800">
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="px-2 py-1 -mx-2 rounded-md transition-colors hover:bg-blue-50/80 hover:text-blue-900 active:bg-blue-100/80 active:text-blue-900 focus-visible:bg-blue-50/80 focus-visible:text-blue-900"
                        >
                            Home
                        </Link>

                        <div className="rounded-md">
                            <button
                                type="button"
                                onClick={() => setMobileAboutOpen((prev) => !prev)}
                                className="w-full flex items-center justify-between px-2 py-1 -mx-2 rounded-md transition-colors hover:bg-blue-50/80 hover:text-blue-900 active:bg-blue-100/80 active:text-blue-900 focus-visible:bg-blue-50/80 focus-visible:text-blue-900"
                                aria-expanded={mobileAboutOpen}
                            >
                                <span>About</span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                />
                            </button>

                            {mobileAboutOpen && (
                                <div className="mt-2 ml-2 border-l-2 border-blue-100 pl-3 flex flex-col gap-2">
                                    {aboutMenuLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            onClick={closeMobileMenu}
                                            className="px-2 py-1 rounded-md text-sm transition-colors hover:bg-blue-50/80 hover:text-blue-900 active:bg-blue-100/80 active:text-blue-900"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {navLinks.slice(1).map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                onClick={closeMobileMenu}
                                className="px-2 py-1 -mx-2 rounded-md transition-colors hover:bg-blue-50/80 hover:text-blue-900 active:bg-blue-100/80 active:text-blue-900 focus-visible:bg-blue-50/80 focus-visible:text-blue-900"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <LoadingLink
                            to="/appointment"
                            onClick={closeMobileMenu}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl w-fit transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Book Now
                        </LoadingLink>

                        <LoadingLink
                            to="/admin"
                            onClick={closeMobileMenu}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl w-fit transition-transform hover:scale-[1.03] active:scale-95"
                        >
                            Admin Login
                        </LoadingLink>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
