import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import SimplePage from "./components/common/SimplePage";
import ScrollToTop from "./components/common/ScrollToTop";

// Lazy load all pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Contact = lazy(() => import("./pages/Contact"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Insurance = lazy(() => import("./pages/Insurance"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Services = lazy(() => import("./pages/Services"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<SimplePage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
