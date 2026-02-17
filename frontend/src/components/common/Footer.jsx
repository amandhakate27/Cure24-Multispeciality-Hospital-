import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";


const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start">
                        <Link to="/" className="text-2xl font-bold text-white">
                            Cure<span className="text-blue-300">24</span> Hospital
                        </Link>
                        <p className="text-blue-100 mt-4 text-sm leading-relaxed">
                            Providing quality healthcare services 24/7 in Nagpur with
                            state-of-the-art facilities and experienced medical professionals.
                        </p>
                    </div>

                    <div className="flex flex-col items-center lg:items-start">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2 text-blue-100 text-sm">
                            <li><Link to="/" className="hover:underline underline-offset-4">Home</Link></li>
                            <li><Link to="/services" className="hover:underline underline-offset-4">Services</Link></li>
                            <li><Link to="/doctors" className="hover:underline underline-offset-4">Doctors</Link></li>
                            <li><Link to="/appointment" className="hover:underline underline-offset-4">Book Appointment</Link></li>
                            <li><Link to="/privacy" className="hover:underline underline-offset-4">Privacy Policy</Link></li>
                            <li><Link to="/insurance" className="hover:underline underline-offset-4">Insurance & TPA</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center lg:items-start">
                        <h3 className="text-lg font-semibold">Our Services</h3>
                        <ul className="mt-4 space-y-2 text-blue-100 text-sm">
                            <li>Emergency Care</li>
                            <li>Cardiology</li>
                            <li>Orthopedics</li>
                            <li>Pediatrics</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center lg:items-start">
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <ul className="mt-4 space-y-3 text-blue-100 text-sm w-full max-w-sm mx-auto text-center md:text-left lg:mx-0">
                            <li className="flex items-start gap-2 justify-center md:justify-start text-center md:text-left">
                                <MapPin className="w-5 h-5 text-blue-200 shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="leading-relaxed">
                                    Deshpande Lay-out, Vaishnavi Devi Chowk,
                                    C.A. Road, Nagpur
                                </span>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <Phone className="w-4 h-4 text-blue-200" aria-hidden="true" />
                                <span>+91 9654317717</span>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <Clock className="w-4 h-4 text-blue-200" aria-hidden="true" />
                                <span>Open 24/7</span>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <Mail className="w-4 h-4 text-blue-200" aria-hidden="true" />
                                <a href="mailto:cure24hospital@gmail.com" className="hover:underline underline-offset-4">
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
