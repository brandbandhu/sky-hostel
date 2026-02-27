import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import WelcomePopup from "./components/WelcomePopup";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import FacilitiesBenefits from "./pages/FacilitiesBenefits";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPropertyDetail = location.pathname.startsWith("/properties/") && location.pathname !== "/properties";
  const isProperties = location.pathname === "/properties" || location.pathname.startsWith("/properties/");
  const isFacilities = location.pathname === "/facilities-benefits" || location.pathname === "/facilities";
  const isAbout = location.pathname === "/about";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isHome && !isFacilities && !isPropertyDetail && !isAbout && <Header />}
      {!isHome && !isProperties && !isFacilities && !isAbout && <WelcomePopup />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/sky-oasis" element={<Navigate to="/properties/sky-1" replace />} />
        <Route path="/properties/sky-den" element={<Navigate to="/properties/sky-2" replace />} />
        <Route path="/properties/sky-aura" element={<Navigate to="/properties/sky-1" replace />} />
        <Route path="/properties/sky-shivneri" element={<Navigate to="/properties/sky-2" replace />} />
        <Route path="/properties/:slug" element={<PropertyDetail />} />
        <Route path="/facilities-benefits" element={<FacilitiesBenefits />} />
        <Route path="/facilities" element={<FacilitiesBenefits />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {!isHome && !isProperties && !isFacilities && !isAbout && <Footer />}
      {!isHome && <WhatsAppFloat />}
      <Toaster position="top-right" />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
