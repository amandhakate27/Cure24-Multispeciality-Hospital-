import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#0620AF_0%,#04156F_100%)] text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
                    <div className="rounded-[26px] border border-white/10 bg-white/6 p-6 text-center shadow-lg shadow-blue-950/20 lg:text-left">
                        <Link to="/" className="text-2xl font-bold text-white">
                            Cure<span className="text-blue-300">24</span> Hospital
                        </Link>
                        <p className="mt-4 text-sm leading-7 text-blue-100">
                            Compassionate multi-speciality healthcare in Nagpur with emergency-ready support,
                            modern treatment infrastructure, and patient-focused care.
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-blue-600 hover:scale-105">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-pink-600 hover:scale-105">
                                <Instagram className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-blue-100">
                            <li><Link to="/" className="transition hover:text-white">Home</Link></li>
                            <li><Link to="/about" className="transition hover:text-white">About Us</Link></li>
                            <li><Link to="/gallery" className="transition hover:text-white">Gallery</Link></li>
                            <li><Link to="/services" className="transition hover:text-white">Services</Link></li>
                            <li><Link to="/doctors" className="transition hover:text-white">Doctors</Link></li>
                            <li><Link to="/appointment" className="transition hover:text-white">Book Appointment</Link></li>
                        </ul>
                    </div>

                    <div className="text-center lg:text-left">
                        <h3 className="text-lg font-semibold text-white">Support</h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-blue-100">
                            <li><Link to="/insurance" className="transition hover:text-white">Insurance & TPA</Link></li>
                            <li><Link to="/privacy" className="transition hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/contact" className="transition hover:text-white">Contact Page</Link></li>
                            <li>Emergency Care</li>
                            <li>General Medicine</li>
                            <li>Diagnostics</li>
                        </ul>
                    </div>

                    <div className="text-center lg:text-left">
                        <h3 className="text-lg font-semibold text-white">Contact</h3>
                        <ul className="mt-4 space-y-4 text-sm text-blue-100">
                            <li className="flex items-start justify-center gap-3 lg:justify-start">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" aria-hidden="true" />
                                <span className="leading-6">
                                    Deshpande Lay-out, Vaishnavi Devi Chowk,
                                    C.A. Road, Nagpur
                                </span>
                            </li>
                            <li className="flex items-center justify-center gap-3 lg:justify-start">
                                <Phone className="h-4 w-4 text-blue-200" aria-hidden="true" />
                                <span>+91 9665151747</span>
                            </li>
                            <li className="flex items-center justify-center gap-3 lg:justify-start">
                                <Clock className="h-4 w-4 text-blue-200" aria-hidden="true" />
                                <span>Open 24/7</span>
                            </li>
                            <li className="flex items-center justify-center gap-3 lg:justify-start">
                                <Mail className="h-4 w-4 text-blue-200" aria-hidden="true" />
                                <a href="mailto:cure24hospital@gmail.com" className="transition hover:text-white">
                                    cure24hospital@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
