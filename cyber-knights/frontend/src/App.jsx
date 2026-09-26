import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Teams from "./pages/Teams.jsx";
import Partnership from "./pages/Partnership.jsx";
import UpcomingEvents from "./pages/UpcomingEvents.jsx";
import Socials from "./pages/Socials.jsx";
import Join from "./pages/Join.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="circuit-bg" />

      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/join" element={<Join />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
