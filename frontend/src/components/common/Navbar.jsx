import { useState, useEffect, useRef } from "react";
import { ChevronDown, Home, Stethoscope, UserRound, Shield, Phone, Image, Info, CalendarCheck, Facebook, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LoadingLink from "./LoadingLink";
import hospitalLogo from "../../assets/images/reallogo1.png";

const aboutMenuLinks = [
    { label: "About Us", to: "/about", icon: Info },
    { label: "Gallery", to: "/gallery", icon: Image },
];

const navLinks = [
    { label: "Home", to: "/", icon: Home },
    { label: "Services", to: "/services", icon: Stethoscope },
    { label: "Doctors", to: "/doctors", icon: UserRound },
    { label: "Insurance", to: "/insurance", icon: Shield },
    { label: "Contact", to: "/contact", icon: Phone },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    const closeMobileMenu = () => {
        setAnimateIn(false);
        setTimeout(() => {
            setOpen(false);
            setMobileAboutOpen(false);
        }, 250);
    };

    const toggleMobileMenu = () => {
        if (open) {
            closeMobileMenu();
        } else {
            setOpen(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimateIn(true));
            });
        }
    };

    // Close menu on route change
    useEffect(() => {
        setOpen(false);
        setAnimateIn(false);
        setMobileAboutOpen(false);
    }, [location.pathname]);

    // Scroll blur effect — passive listener for zero perf impact
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu on outside click
    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMobileMenu();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const isActive = (to) => location.pathname === to;

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm shadow-blue-100/60" : "bg-transparent"}`}>
            <div>
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20 lg:px-8 xl:px-10">
                    <Link to="/" className="inline-flex items-center h-full cursor-pointer">
                        <img
                            src={hospitalLogo}
                            alt="Cure 24 Hospital"
                            className="h-[70%] w-auto max-h-full max-w-[100px] sm:max-w-[150px] md:max-w-[200px] object-contain transition-transform hover:scale-105"
                        />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-7 text-[0.95rem] font-medium text-blue-800">
                        <Link
                            to="/"
                            className="relative inline-block text-blue-800 transition-all duration-300 hover:scale-110 hover:text-blue-900"
                        >
                            Home
                        </Link>

                        <div className="relative group">
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 text-blue-800 transition-all duration-300 hover:scale-110 hover:text-blue-900"
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
                                className="relative inline-block text-blue-800 transition-all duration-300 hover:scale-110 hover:text-blue-900"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <LoadingLink
                            to="/appointment"
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-blue-700 active:scale-95"
                        >
                            Book Appointment 
                        </LoadingLink>

                        <div className="flex items-center gap-3 ml-2">
                            <a href="https://www.facebook.com/share/17xjxcuYXM/" target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-[#1877F2] hover:scale-110 shadow-sm hover:shadow-md">
                                <Facebook className="h-[20px] w-[20px]" />
                            </a>
                            <a href="https://www.instagram.com/cure24multispecialityhospital?utm_source=qr&igsh=aGxsaDM0MGM4cWFr" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-[#E1306C] hover:scale-110 shadow-sm hover:shadow-md">
                                <Instagram className="h-[20px] w-[20px]" />
                            </a>
                        </div>
                    </nav>

                    {/* Animated Hamburger / X button */}
                    <button
                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 text-blue-700 transition-all duration-300 hover:bg-blue-50 active:scale-90 lg:hidden"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={open}
                    >
                        <div className="w-5 h-5 flex flex-col items-center justify-center">
                            <span
                                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : "-translate-y-1"}`}
                            />
                            <span
                                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "opacity-0 scale-0" : "opacity-100"}`}
                            />
                            <span
                                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : "translate-y-1"}`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay + Panel */}
            {open && (
                <div
                    className={`lg:hidden fixed inset-0 top-16 sm:top-20 z-40 transition-opacity duration-300 ${animateIn ? "opacity-100" : "opacity-0"}`}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />

                    {/* Menu Panel */}
                    <div
                        ref={menuRef}
                        className={`relative mx-3 mt-2 rounded-2xl backdrop-blur-xl shadow-2xl shadow-blue-900/30 border border-[#0a2bbf]/40 overflow-hidden transition-all duration-300 ease-out ${animateIn ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
                        style={{ background: "linear-gradient(to bottom, #041AA9, #031590)" }}
                    >
                        {/* Decorative top accent */}
                        <div className="h-1 bg-gradient-to-r from-cyan-400 via-white/60 to-cyan-400" />

                        <div className="px-4 py-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
                            {/* Nav Links */}
                            <div className="space-y-1">
                                {/* Home */}
                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${isActive("/")
                                        ? "bg-white/20 text-white"
                                        : "text-blue-100 hover:bg-white/10 hover:text-white active:bg-white/15"
                                        }`}
                                    style={{ animationDelay: "50ms" }}
                                >
                                    <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${isActive("/") ? "bg-white/25 text-white" : "bg-white/10 text-blue-200"}`}>
                                        <Home className="w-[18px] h-[18px]" />
                                    </span>
                                    <span>Home</span>
                                    {isActive("/") && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </Link>

                                {/* About Dropdown */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setMobileAboutOpen((prev) => !prev)}
                                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${(isActive("/about") || isActive("/gallery"))
                                            ? "bg-white/20 text-white"
                                            : "text-blue-100 hover:bg-white/10 hover:text-white active:bg-white/15"
                                            }`}
                                        aria-expanded={mobileAboutOpen}
                                    >
                                        <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${(isActive("/about") || isActive("/gallery")) ? "bg-white/25 text-white" : "bg-white/10 text-blue-200"}`}>
                                            <Info className="w-[18px] h-[18px]" />
                                        </span>
                                        <span>About</span>
                                        <ChevronDown
                                            className={`ml-auto h-4 w-4 text-blue-200 transition-transform duration-300 ${mobileAboutOpen ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                        />
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300 ease-out ${mobileAboutOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                                        <div className="ml-6 pl-4 border-l-2 border-white/20 space-y-1 py-1">
                                            {aboutMenuLinks.map((link) => {
                                                const Icon = link.icon;
                                                return (
                                                    <Link
                                                        key={link.label}
                                                        to={link.to}
                                                        onClick={closeMobileMenu}
                                                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive(link.to)
                                                            ? "bg-white/20 text-white font-medium"
                                                            : "text-blue-200 hover:bg-white/10 hover:text-white"
                                                            }`}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                        <span>{link.label}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Other Nav Links */}
                                {navLinks.slice(1).map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            onClick={closeMobileMenu}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${isActive(link.to)
                                                ? "bg-white/20 text-white"
                                                : "text-blue-100 hover:bg-white/10 hover:text-white active:bg-white/15"
                                                }`}
                                        >
                                            <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${isActive(link.to) ? "bg-white/25 text-white" : "bg-white/10 text-blue-200"}`}>
                                                <Icon className="w-[18px] h-[18px]" />
                                            </span>
                                            <span>{link.label}</span>
                                            {isActive(link.to) && (
                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Divider */}
                            <div className="my-3 border-t border-white/15" />

                            {/* CTA Buttons */}
                            <div className="space-y-2">
                                <LoadingLink
                                    to="/appointment"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center gap-2 w-full bg-white text-blue-700 px-4 py-3 rounded-xl font-semibold shadow-lg shadow-black/10 transition-all duration-200 hover:bg-blue-50 active:scale-[0.98]"
                                >
                                    <CalendarCheck className="w-[18px] h-[18px]" />
                                    Book Appointment
                                </LoadingLink>

                                <div className="flex items-center justify-center gap-6 w-full pt-3 pb-2">
                                    <a href="https://www.facebook.com/share/17xjxcuYXM/" target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-700 transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:scale-110 shadow-lg">
                                        <Facebook className="h-6 w-6" />
                                    </a>
                                    <a href="https://www.instagram.com/cure24multispecialityhospital?utm_source=qr&igsh=aGxsaDM0MGM4cWFr" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-700 transition-all duration-300 hover:bg-[#E1306C] hover:text-white hover:scale-110 shadow-lg">
                                        <Instagram className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

