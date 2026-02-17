import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import WelcomePopup from "./components/WelcomePopup";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import FacilitiesBenefits from "./pages/FacilitiesBenefits";
import PropertyDetail from "./pages/PropertyDetail";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPropertyDetail = location.pathname.startsWith("/properties/") && location.pathname !== "/properties";
  const isProperties = location.pathname === "/properties" || location.pathname.startsWith("/properties/");
  const isFacilities = location.pathname === "/facilities-benefits" || location.pathname === "/facilities";

  return (
    <>
      {!isHome && !isFacilities && !isPropertyDetail && <Header />}
      {!isHome && !isProperties && !isFacilities && <WelcomePopup />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:slug" element={<PropertyDetail />} />
        <Route path="/facilities-benefits" element={<FacilitiesBenefits />} />
        <Route path="/facilities" element={<FacilitiesBenefits />} />
      </Routes>

      {!isHome && !isProperties && !isFacilities && <Footer />}
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
