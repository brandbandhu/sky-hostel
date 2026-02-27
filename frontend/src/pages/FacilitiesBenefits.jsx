import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { contactInfo } from "../data/mock";
import { getSeoKeywords, setSeoMeta } from "../lib/seo";
import logoImage from "../assets/images/logo.png";
import electricityWaterImage from "../assets/images/facilities/Electricity  Water.png";
import foodFacilityImage from "../assets/images/facilities/Food Facility Available.png";
import fridgeImage from "../assets/images/facilities/fridge.png";
import geyserImage from "../assets/images/facilities/geyser.png";
import housekeepingImage from "../assets/images/facilities/Housekeeping.png";
import laundryImage from "../assets/images/facilities/Laundry.png";
import secureEntryImage from "../assets/images/facilities/Secure Entry.png";
import twoWheelerParkingImage from "../assets/images/facilities/Two-wheeler Parking Available.png";
import washingMachineImage from "../assets/images/facilities/washing machine.png";
import westernToiletsImage from "../assets/images/facilities/Western toilets.png";
import wifiImage from "../assets/images/facilities/Wi-Fi.png";
import "./Home.css";
import "./FacilitiesBenefits.css";
const INSTAGRAM_LINK = "https://www.instagram.com/skyhostels4u/";
const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=61588214504098";
const REGISTRATION_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdu8fzkKVPr2MXzm_d7p04J7WF9z6CQbDbJV9V1QKr1iP9F6g/viewform?usp=header";

const facilityCards = [
  {
    title: "Food Facility Available",
    description:
      "Nutritious meals are served daily for convenience. Menus are planned for students and working residents, with hygienic preparation standards. Regular meal timings help maintain routine and comfort throughout the week.",
    image: foodFacilityImage
  },
  {
    title: "Wi-Fi",
    description:
      "High-speed Wi-Fi is available across key hostel areas for study, classes, and streaming. The network is designed to support daily academic and professional usage. Residents can stay connected smoothly throughout the day.",
    image: wifiImage
  },
  {
    title: "Electricity / Water",
    description:
      "24-hour electricity and water supply is available to ensure uninterrupted daily living. Residents can study, rest, and manage routines without utility disruptions. Reliable basic services help maintain a comfortable and stress-free stay.",
    image: electricityWaterImage
  },
  {
    title: "Housekeeping",
    description:
      "Daily cleaning is handled by trained HK staff to keep rooms and shared areas neat. Regular upkeep supports hygiene and a healthier environment for all residents. Clean spaces also improve comfort, focus, and overall hostel experience.",
    image: housekeepingImage
  },
  {
    title: "Laundry",
    description:
      "Washing machine facilities are available for convenient in-house laundry management. Residents can wash clothes on schedule without depending on outside services. This saves time and makes day-to-day living easier.",
    image: laundryImage
  },
  {
    title: "Fridge",
    description:
      "Common fridge facility is available for safe storage of water bottles, milk products, and essentials. Residents can keep daily-use food items fresh and organized.",
    image: fridgeImage
  },
  {
    title: "Western Toilets",
    description:
      "Modern western toilet setup is provided for hygienic and comfortable use. Bathrooms are designed for convenience and maintained regularly.",
    image: westernToiletsImage
  },
  {
    title: "Geyser",
    description:
      "Hot water is available through geyser support for daily bathing comfort, especially during colder weather and early morning routines.",
    image: geyserImage
  },
  {
    title: "Washing Machine",
    description:
      "Dedicated washing machine facility helps residents manage laundry efficiently within the hostel premises, saving time and effort.",
    image: washingMachineImage
  },
  {
    title: "Secure Entry",
    description:
      "24-hour security support with CCTV monitoring helps maintain a safe hostel environment. Entry and movement are monitored to improve resident safety. Continuous surveillance adds confidence for both residents and families.",
    image: secureEntryImage
  },
  {
    title: "Two-wheeler Parking Available",
    description:
      "Designated two-wheeler parking is available for residents with vehicles. It helps reduce daily commute hassle and adds convenience for routine travel.",
    image: twoWheelerParkingImage
  }
];

const FacilitiesBenefits = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setSeoMeta({
      title: "Facilities & Benefits | Hostel Near MIT ADT University College | Sky Hostels",
      description:
        "Discover facilities and benefits at Sky Hostels near MIT ADT University College, including food facility, Wi-Fi, housekeeping, laundry, secure entry, and more.",
      keywords: getSeoKeywords([
        "Facilities and Benefits hostel",
        "Food facility hostel",
        "Wi-Fi hostel MIT ADT",
        "24 Hrs CCTV hostel",
        "Laundry and housekeeping hostel"
      ]),
      path: "/facilities-benefits"
    });
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <div className="facilities-page">
      <section className="facilities-one-section">
        <div className="facilities-shell">
          <header className="facilities-local-header">
            <Link to="/" className="facilities-local-logo">
              <img src={logoImage} alt="Sky Hostels" className="brand-logo-img" />
            </Link>
            <button
              type="button"
              className="facilities-local-toggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav className="facilities-local-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/properties">Our Properties</Link>
              <Link to="/facilities-benefits">Facilities &amp; Benefits</Link>
            </nav>
            <div className="facilities-local-actions">
              <a href={REGISTRATION_FORM_LINK} target="_blank" rel="noopener noreferrer" className="facilities-local-btn facilities-local-btn-solid">Google Registration Form</a>
              <a
                href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`}
                className="facilities-local-btn facilities-local-btn-outline"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div className={`facilities-local-mobile-menu ${menuOpen ? "open" : ""}`}>
              <Link to="/about" onClick={closeMobileMenu}>About Us</Link>
              <Link to="/properties" onClick={closeMobileMenu}>Our Properties</Link>
              <Link to="/facilities-benefits" onClick={closeMobileMenu}>Facilities &amp; Benefits</Link>
              <a href={REGISTRATION_FORM_LINK} target="_blank" rel="noopener noreferrer" className="facilities-local-btn facilities-local-btn-solid" onClick={closeMobileMenu}>
                Google Registration Form
              </a>
              <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="facilities-local-btn facilities-local-btn-outline" onClick={closeMobileMenu}>
                {contactInfo.phone}
              </a>
            </div>
          </header>

          <div className="facilities-copy">
            <p className="facilities-eyebrow">Features &amp; Benefits</p>
            <h1>
              Need More Information?
              <br />
              Check out Facilities &amp; Benefits
            </h1>
          </div>

          <div className="facilities-cards">
            {facilityCards.map((item) => (
              <article className="facilities-feature-card" key={item.title}>
                <div className="facilities-feature-media">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="facilities-feature-content">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="sky-home facilities-bottom-unified">
            <section className="hostel-cartoon-section">
              <div className="container">
                <div className="hostel-cartoon-copy">
                  <h3>A Better Way to Stay and Study.</h3>
                  <p>
                    We believe hostel life should feel comfortable, creative, and balanced. That&apos;s why we built
                    spaces to study, unwind, and connect with friends. From calm rooms to managed amenities, every
                    detail is designed to help you stay focused, healthy, and happy throughout the year.
                  </p>
                </div>

                <div className="scene-3d-wrapper">
                  <div className="scene-3d-stage">
                    <div className="obj3d obj3d-cube" aria-hidden="true">
                      <div className="cube-inner">
                        <div className="cube-face face-front" />
                        <div className="cube-face face-back" />
                        <div className="cube-face face-right" />
                        <div className="cube-face face-left" />
                        <div className="cube-face face-top" />
                        <div className="cube-face face-bottom" />
                      </div>
                    </div>
                    <div className="obj3d obj3d-pyramid" aria-hidden="true">
                      <div className="pyramid-inner">
                        <div className="pyramid-face face-1" />
                        <div className="pyramid-face face-2" />
                        <div className="pyramid-face face-3" />
                      </div>
                    </div>
                    <div className="obj3d obj3d-sphere" aria-hidden="true" />
                    <div className="obj3d obj3d-sphere obj3d-sphere-2" aria-hidden="true" />
                    <div className="obj3d obj3d-cylinder" aria-hidden="true" />
                    <div className="obj3d obj3d-prism" aria-hidden="true" />
                    <div className="obj3d obj3d-cone" aria-hidden="true" />
                    <div className="obj3d obj3d-sphere obj3d-sphere-3" aria-hidden="true" />
                    <div className="obj3d obj3d-sphere obj3d-sphere-4" aria-hidden="true" />
                    <div className="obj3d obj3d-cylinder obj3d-cylinder-2" aria-hidden="true" />
                    <div className="obj3d obj3d-small-cube" aria-hidden="true">
                      <div className="cube-inner">
                        <div className="cube-face face-front" />
                        <div className="cube-face face-back" />
                        <div className="cube-face face-right" />
                        <div className="cube-face face-left" />
                        <div className="cube-face face-top" />
                        <div className="cube-face face-bottom" />
                      </div>
                    </div>
                  </div>
                </div>

                <footer className="sky-home-footer">
                  <div className="sky-home-footer-grid">
                    <div className="sky-home-footer-col sky-home-footer-brand">
                      <div className="sky-home-footer-logo">
                        <img src={logoImage} alt="Sky Hostels" className="brand-logo-img" />
                      </div>
                      <nav className="sky-home-footer-nav">
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/properties">Our Properties</Link>
                        <Link to="/facilities-benefits">Facilities &amp; Benefits</Link>
                      </nav>
                    </div>
                    <div className="sky-home-footer-col">
                      <h4 className="sky-home-footer-heading">Contact</h4>
                      <p className="sky-home-footer-line">
                        Email - <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                      </p>
                      <p className="sky-home-footer-line">Mobile - {contactInfo.phone}</p>
                      <p className="sky-home-footer-line">
                        Address 1 -{" "}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sky-home-footer-address-link"
                        >
                          {contactInfo.address}
                        </a>
                      </p>
                      <p className="sky-home-footer-line">
                        Address 2 -{" "}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address2)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sky-home-footer-address-link"
                        >
                          {contactInfo.address2}
                        </a>
                      </p>
                    </div>
                    <div className="sky-home-footer-col">
                      <h4 className="sky-home-footer-heading">Socials</h4>
                      <a
                        href={INSTAGRAM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sky-home-footer-social"
                        aria-label="Instagram"
                      >
                        <Instagram size={28} />
                      </a>
                      <a
                        href={FACEBOOK_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sky-home-footer-social"
                        aria-label="Facebook"
                      >
                        <Facebook size={28} />
                      </a>
                    </div>
                  </div>
                  <div className="sky-home-footer-bottom">
                    <p>
                      Copyright 2026 All Rights Reserved By Sky Hostel &nbsp; Designed By{" "}
                      <a href="https://webakoof.com" target="_blank" rel="noopener noreferrer">
                        Webakoof
                      </a>
                    </p>
                  </div>
                </footer>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacilitiesBenefits;





