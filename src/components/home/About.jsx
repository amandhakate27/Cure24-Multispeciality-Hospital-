import LoadingLink from "../common/LoadingLink";
import LoadingImage from "../common/LoadingImage";
import ctScanImg from "../../assets/images/ct-scan.jpg";
import nurseImg from "../../assets/images/medical-nurse.jpg";
import seniorWomanImg from "../../assets/images/senior-woman.jpg";
import treatmentTechImg from "../../assets/images/treatment-tech.jpg";
import womanDoctorImg from "../../assets/images/woman-doctor-service.jpg";


const About = () => {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">

                    {/* LEFT - CONTENT */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 leading-tight">
                            Leading Healthcare Provider in
                            <br />
                            Nagpur
                        </h2>

                        <p className="text-slate-600 mt-4">
                            Cure 24 Clinic Hospital has been at the forefront of healthcare excellence in
                            Nagpur for nearly two decades. Founded with a vision to provide accessible,
                            affordable, and advanced medical care, we have grown to become one of the most
                            trusted healthcare institutions in Central India.
                        </p>

                        <p className="text-slate-600 mt-4">
                            Our state-of-the-art facility combines modern infrastructure with compassionate
                            care. Led by Dr. Ritesh K. Bhondankar and a team of over 50 specialist doctors,
                            we serve more than 5,000 patients annually across 15+ medical specialties.
                        </p>

                        <p className="text-slate-600 mt-4">
                            From routine checkups to complex surgeries, emergency care to preventive health programs , we offer comprehensive medical service under one roof, backed by the latest diagnostic and treatment technologies.
                        </p>

                        <LoadingLink
                            to="/about"
                            className="mt-6 bg-blue-700 text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-800 transition-transform active:scale-95 mx-auto lg:mx-0 inline-flex justify-center"
                        >
                            Learn More About Us
                        </LoadingLink>
                    </div>

                    {/* RIGHT - IMAGE GRID */}
                    <div className="grid grid-cols-2 gap-4">
                        <LoadingImage
                            src={womanDoctorImg}
                            alt="Doctor consultation"
                            className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md group"
                            imgClassName="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-[0.3deg]"
                        />
                        <LoadingImage
                            src={nurseImg}
                            alt="Nurse care"
                            className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md group"
                            imgClassName="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-[0.3deg]"
                        />
                        <LoadingImage
                            src={ctScanImg}
                            alt="CT scan room"
                            className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md group"
                            imgClassName="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-[0.3deg]"
                        />
                        <LoadingImage
                            src={treatmentTechImg}
                            alt="Treatment technology"
                            className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md group"
                            imgClassName="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-[0.3deg]"
                        />
                        <LoadingImage
                            src={seniorWomanImg}
                            alt="Patient recovery"
                            className="col-span-2 h-40 md:h-48 lg:h-56 rounded-2xl shadow-lg group"
                            imgClassName="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-[0.3deg]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
