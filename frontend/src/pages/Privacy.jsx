import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            <section className="pt-16 md:pt-20">
                <div className="mt-0 bg-blue-800 text-white">
                    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold">Privacy Policy</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            Your privacy and confidentiality are of utmost importance to us
                        </p>
                        <p className="text-blue-200 mt-2 text-xs">
                            Last Updated: February 3, 2026
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-6xl mx-auto px-6 lg:px-10 text-blue-800">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
                        Introduction
                    </h3>
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-center">
                        At Cure 24 Clinic Hospital, we are committed to protecting your personal information
                        and your right to privacy. This Privacy Policy explains how we collect, use, disclose,
                        and safeguard your information when you visit our hospital or use our services.
                    </p>

                    <div className="mt-10 space-y-8">
                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                Information We Collect
                            </h4>

                            <div className="mt-4 space-y-6 text-sm md:text-base">
                                <div>
                                    <p className="font-semibold text-blue-800">Personal Information</p>
                                    <p className="mt-2">When you register as a patient or book an appointment, we may collect:</p>
                                    <ul className="mt-2 list-disc list-inside space-y-1 pl-6 md:pl-8">
                                        <li>Full name, date of birth, and gender</li>
                                        <li>Contact information (phone number, email address, residential address)</li>
                                        <li>Emergency contact details</li>
                                        <li>Government-issued identification numbers (Aadhar, PAN for billing purposes)</li>
                                        <li>Insurance information and policy details</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-blue-800">Medical Information</p>
                                    <p className="mt-2">To provide quality healthcare services, we collect:</p>
                                    <ul className="mt-2 list-disc list-inside space-y-1 pl-6 md:pl-8">
                                        <li>Medical history and family medical history</li>
                                        <li>Current medications and allergies</li>
                                        <li>Diagnosis, treatment plans, and prescriptions</li>
                                        <li>Laboratory test results and imaging reports</li>
                                        <li>Vital signs and clinical notes</li>
                                        <li>Billing and payment information</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-blue-800">Website Usage Information</p>
                                    <p className="mt-2">When you visit our website, we may automatically collect:</p>
                                    <ul className="mt-2 list-disc list-inside space-y-1 pl-6 md:pl-8">
                                        <li>IP address and browser type</li>
                                        <li>Pages visited and time spent on pages</li>
                                        <li>Referring website and search terms used</li>
                                        <li>Cookie data for website functionality</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                How We Use Your Information
                            </h4>
                            <p className="mt-2 text-sm md:text-base">
                                We use your information for the following purposes:
                            </p>
                            <ul className="mt-2 list-disc list-inside space-y-1 text-sm md:text-base pl-6 md:pl-8">
                                <li>Medical Care: To provide diagnosis, treatment, and follow-up care</li>
                                <li>Appointment Management: To schedule, confirm, and remind you of appointments</li>
                                <li>Billing and Insurance: To process payments and insurance claims</li>
                                <li>Emergency Situations: To contact you or your emergency contacts when necessary</li>
                                <li>Quality Improvement: To improve our services and patient care standards</li>
                                <li>Legal Compliance: To comply with applicable healthcare regulations and laws</li>
                                <li>Communication: To send you important health information, appointment reminders, and updates</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                Information Security
                            </h4>
                            <p className="mt-2 text-sm md:text-base">
                                We implement stringent security measures to protect your information:
                            </p>
                            <ul className="mt-2 list-disc list-inside space-y-1 text-sm md:text-base pl-6 md:pl-8">
                                <li>Encrypted storage of electronic medical records</li>
                                <li>Secure access controls and password-protected systems</li>
                                <li>Regular security audits and staff training on privacy protocols</li>
                                <li>Physical security measures for paper records</li>
                                <li>Restricted access to patient information on a need-to-know basis</li>
                                <li>Secure backup and disaster recovery systems</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                When We Share Information
                            </h4>
                            <p className="mt-2 text-sm md:text-base">
                                We may share your information only in the following circumstances:
                            </p>
                            <ul className="mt-2 list-disc list-inside space-y-1 text-sm md:text-base pl-6 md:pl-8">
                                <li>Healthcare Providers: With other doctors, specialists, and healthcare professionals involved in your care</li>
                                <li>Diagnostic Services: With laboratories and diagnostic centers for testing purposes</li>
                                <li>Insurance Companies: For processing claims and obtaining approvals</li>
                                <li>Legal Requirements: When required by law, court order, or government authorities</li>
                                <li>Emergency Situations: To protect your vital interests or public health</li>
                                <li>With Your Consent: When you explicitly authorize us to share your information</li>
                            </ul>
                            <p className="mt-2 text-sm md:text-base">
                                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                Your Privacy Rights
                            </h4>
                            <p className="mt-2 text-sm md:text-base">
                                You have the following rights regarding your personal information:
                            </p>
                            <ul className="mt-2 list-disc list-inside space-y-1 text-sm md:text-base pl-6 md:pl-8">
                                <li>Right to Access: Request copies of your medical records and personal information</li>
                                <li>Right to Correction: Request corrections to inaccurate or incomplete information</li>
                                <li>Right to Restriction: Request limitations on how we use your information</li>
                                <li>Right to Object: Object to processing of your information for certain purposes</li>
                                <li>Right to Confidentiality: Expect that your health information remains confidential</li>
                                <li>Right to Notification: Be informed of any data breaches affecting your information</li>
                            </ul>
                            <p className="mt-2 text-sm md:text-base">
                                To exercise these rights, please contact our Privacy Officer at privacy@cure24hospital.com
                                or visit our Medical Records Department.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                Data Retention
                            </h4>
                            <p className="mt-2 text-sm md:text-base">
                                We retain your medical records and personal information as required by Indian healthcare
                                regulations and medical board guidelines. Generally, medical records are retained for a
                                minimum of 5-10 years after the last treatment date, or longer as required by law or for
                                minors until they reach adulthood plus the applicable retention period.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                Children's Privacy
                            </h4>
                            <p className="mt-2 text-sm md:text-base">
                                For patients under 18 years of age, we require parental or legal guardian consent to collect
                                and use personal information. Parents/guardians have the right to access, correct, or request
                                deletion of their child's information.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl md:text-2xl font-bold text-blue-800">
                                Changes to This Policy
                            </h4>
                            <p className="mt-2 text-sm md:text-base">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or
                                legal requirements. We will notify you of any material changes by posting the updated policy
                                on our website and updating the "Last Updated" date. We encourage you to review this policy
                                periodically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <div className="bg-blue-100/80 border border-blue-100 rounded-2xl shadow-sm p-6 md:p-8 text-center">
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800">Contact Us</h3>
                        <p className="text-blue-700 mt-2 text-sm md:text-base">
                            If you have questions or concerns about this Privacy Policy or our data practices, please contact:
                        </p>
                        <div className="mt-4 text-sm md:text-base text-blue-800 font-semibold">
                            <p>Cure 24 Clinic Hospital</p>
                            <p>Deshpande Lay-out, Vaishnavi Devi Chowk</p>
                            <p>C.A. Road, Nagpur</p>
                            <p>Email: cure24hospital@gmail.com</p>
                            <p>Phone: +91 9654317717</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Privacy;

