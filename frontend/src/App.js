import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/Home";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const WhatsAppFloat = lazy(() => import("./components/WhatsAppFloat"));
const WelcomePopup = lazy(() => import("./components/WelcomePopup"));
const Properties = lazy(() => import("./pages/Properties"));
const FacilitiesBenefits = lazy(() => import("./pages/FacilitiesBenefits"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const About = lazy(() => import("./pages/About"));

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
      <Suspense fallback={<div style={{ minHeight: "20vh" }} />}>
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
      </Suspense>
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
