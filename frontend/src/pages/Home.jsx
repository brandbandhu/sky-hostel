import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { getFriendlySupabaseError, submitLeadForm } from "../lib/formSubmissions";
import { contactInfo } from "../data/mock";
import { getSeoKeywords, setSeoMeta } from "../lib/seo";
import cloudVideo from "../cloud video.mp4";
import bedroomAreaImage from "../assets/images/carousel img/bedroom area.png";
import diningAreaImage from "../assets/images/carousel img/Dining.png";
import hostelBuildingImage from "../assets/images/hostel building.jpeg";
import secureEntryImage from "../assets/images/facilities/Secure Entry.png";
import skyOasisImage from "../assets/images/sky Oasis.jpeg";
import studyAreaImage from "../assets/images/carousel img/study area.png";
import studyAreaTwoImage from "../assets/images/carousel img/study area2.png";
import roomImage from "../assets/images/carousel img/room.png";
import washroomImage from "../assets/images/carousel img/washroom.png";
import logoImage from "../assets/images/logo.png";
import "./Home.css";

const { useRef } = React;
const WHATSAPP_LINK = contactInfo.whatsappLink;
const PHONE_NUMBER_LINK = contactInfo.phone.replace(/[^\d+]/g, "");
const INSTAGRAM_LINK = "https://www.instagram.com/skyhostels4u/";
const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=61588214504098";
const REGISTRATION_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdu8fzkKVPr2MXzm_d7p04J7WF9z6CQbDbJV9V1QKr1iP9F6g/viewform?usp=header";

const properties = [
  {
    slug: "sky-1",
    distance: "300 metre from MIT ADT University, Rajbaug Campus",
    title: "Sky 1",
    subtitle: "Boys Hostel",
    image: hostelBuildingImage
  },
  {
    slug: "sky-2",
    distance: "10 metre from MIT ADT University, Rajbaug Campus",
    title: "Sky 2 - Chintamani Park",
    subtitle: "Boys Hostel",
    image: skyOasisImage
  }
];

const creativeRooms = [
  bedroomAreaImage,
  diningAreaImage,
  studyAreaImage,
  studyAreaTwoImage,
  roomImage,
  washroomImage
];

const locationFeature = {
  title: "500 meters from MIT ADT, Loni Kalbhor",
  text: "Are you looking for a boys hostel near MIT ADT Loni Kalbhor? Sky Hostel offers a safe and comfortable environment with modern amenities. Enjoy facilities like high-speed Wi-Fi, hygienic food service, and professionally managed living spaces designed for study and daily comfort.",
  image: diningAreaImage
};

const facilitiesTiles = [
  {
    title: "Comfort Rooms",
    image: bedroomAreaImage
  },
  {
    title: "Study Space",
    image: studyAreaImage
  },
  {
    title: "Dining Zone",
    image: diningAreaImage
  },
  {
    title: "Secure Entry",
    image: secureEntryImage
  }
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [popupFirstName, setPopupFirstName] = useState("");
  const [popupPhone, setPopupPhone] = useState("");
  const [popupLookingFor, setPopupLookingFor] = useState("");
  const [popupStatus, setPopupStatus] = useState({ type: "", message: "" });
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [creativeIndex, setCreativeIndex] = useState(0);
  const heroParallaxRef = useRef(null);
  const floatingShapeRef = useRef(null);
  const parallaxFrameRef = useRef(null);

  useEffect(() => {
    setSeoMeta({
      title: "Premium Boys Hostel Near MIT ADT University College, Loni Kalbhor | Sky Hostels",
      description:
        "Sky Hostels offers premium boys hostel accommodation near MIT ADT University College, Loni Kalbhor with Wi-Fi, food, security, and modern amenities.",
      keywords: getSeoKeywords([
        "Premium Boys Hostel Near MIT ADT University College, Loni Kalbhor",
        "MIT ADT University College hostel",
        "Hostel near MIT ADT University College",
        "Sky 1 boys hostel",
        "Sky 2 boys hostel",
        "hostel facilities near MIT ADT"
      ]),
      path: "/"
    });
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCreativeIndex((prev) => (prev + 1) % creativeRooms.length);
    }, 2600);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const heroElement = heroParallaxRef.current;
    const shapeElement = floatingShapeRef.current;

    if (!heroElement || !shapeElement || !window.matchMedia("(pointer:fine)").matches) {
      return undefined;
    }

    const state = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0
    };

    const animate = () => {
      state.x += (state.tx - state.x) * 0.11;
      state.y += (state.ty - state.y) * 0.11;

      shapeElement.style.setProperty("--shape-x", `${state.x.toFixed(2)}px`);
      shapeElement.style.setProperty("--shape-y", `${state.y.toFixed(2)}px`);

      parallaxFrameRef.current = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      const rect = heroElement.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

      state.tx = normalizedX * 20;
      state.ty = normalizedY * 20;
    };

    const handlePointerLeave = () => {
      state.tx = 0;
      state.ty = 0;
    };

    heroElement.addEventListener("mousemove", handlePointerMove);
    heroElement.addEventListener("mouseleave", handlePointerLeave);
    parallaxFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      heroElement.removeEventListener("mousemove", handlePointerMove);
      heroElement.removeEventListener("mouseleave", handlePointerLeave);
      if (parallaxFrameRef.current) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
      }
    };
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  const handleCreativePrev = () => {
    setCreativeIndex((prev) => (prev === 0 ? creativeRooms.length - 1 : prev - 1));
  };

  const handleCreativeNext = () => {
    setCreativeIndex((prev) => (prev + 1) % creativeRooms.length);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName.trim() || !phone.trim() || !lookingFor) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const { error } = await submitLeadForm({
      name: firstName.trim(),
      phone: phone.trim(),
      lookingFor,
      source: "home_inline_form"
    });

    if (error) {
      setStatus({ type: "error", message: getFriendlySupabaseError(error) });
      setSubmitting(false);
      return;
    }

    setStatus({ type: "success", message: "Thank you. Your request has been submitted successfully." });
    setFirstName("");
    setPhone("");
    setLookingFor("");
    setSubmitting(false);
  };

  const handlePopupSubmit = async (event) => {
    event.preventDefault();

    if (!popupFirstName.trim() || !popupPhone.trim() || !popupLookingFor) {
      setPopupStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    setPopupSubmitting(true);
    setPopupStatus({ type: "", message: "" });

    const { error } = await submitLeadForm({
      name: popupFirstName.trim(),
      phone: popupPhone.trim(),
      lookingFor: popupLookingFor,
      source: "home_visit_popup"
    });

    if (error) {
      setPopupStatus({ type: "error", message: getFriendlySupabaseError(error) });
      setPopupSubmitting(false);
      return;
    }

    setPopupStatus({ type: "success", message: "Thank you. Your request has been submitted successfully." });
    setPopupFirstName("");
    setPopupPhone("");
    setPopupLookingFor("");
    setPopupSubmitting(false);
    setTimeout(() => setShowPopup(false), 700);
  };

  return (
    <div className="sky-home">
      {showPopup && (
        <div className="visit-popup-overlay">
          <div className="visit-popup">
            <button
              type="button"
              className="visit-popup-close"
              aria-label="Close popup"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>

            <div className="visit-popup-media">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Sky Hostels"
              />
            </div>

            <div className="visit-popup-form-wrap">
              <h2>Want a quote? Just fill in the form and we&apos;ll take it from there.</h2>

              <form className="visit-popup-form" onSubmit={handlePopupSubmit}>
                <div className="field">
                  <label htmlFor="popupFirstName">Full Name *</label>
                  <input
                    id="popupFirstName"
                    type="text"
                    placeholder="For Ex. John Doe"
                    value={popupFirstName}
                    onChange={(event) => setPopupFirstName(event.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="popupPhone">Phone *</label>
                  <input
                    id="popupPhone"
                    type="tel"
                    placeholder="0000 0000 00"
                    pattern="[0-9+\\-\\s]{8,15}"
                    value={popupPhone}
                    onChange={(event) => setPopupPhone(event.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="popupLookingFor">Looking For</label>
                  <select
                    id="popupLookingFor"
                    value={popupLookingFor}
                    onChange={(event) => setPopupLookingFor(event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Boys Hostel">Boys Hostel</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-solid visit-popup-submit" disabled={popupSubmitting}>
                  {popupSubmitting ? "Submitting..." : "Submit"}
                </button>
                <p className={`form-status ${popupStatus.type}`}>{popupStatus.message}</p>
              </form>
            </div>
          </div>
        </div>
      )}

      <header className="hero-shell" id="home">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src={cloudVideo} type="video/mp4" />
        </video>
        <nav className="navbar">
          <div className="container nav-wrap">
            <a href="#home" className="logo" aria-label="Sky Hostels Home">
              <img src={logoImage} alt="Sky Hostels" className="brand-logo-img" />
            </a>

            <button
              className="hamburger"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>

            <ul className="nav-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/properties">Our Properties</Link>
              </li>
              <li>
                <Link to="/facilities-benefits">Facilities & Benefits</Link>
              </li>
            </ul>

            <div className="nav-actions">
              <a href={REGISTRATION_FORM_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-solid small">
                Google Registration Form
              </a>
              <a href={`tel:${PHONE_NUMBER_LINK}`} className="btn btn-outline small">
                {contactInfo.phone}
              </a>
            </div>
          </div>

          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <Link to="/about" onClick={closeMobileMenu}>
              About Us
            </Link>
            <Link to="/properties" onClick={closeMobileMenu}>
              Our Properties
            </Link>
            <Link to="/facilities-benefits" onClick={closeMobileMenu}>
              Facilities & Benefits
            </Link>
            <a href={REGISTRATION_FORM_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-solid" onClick={closeMobileMenu}>
              Google Registration Form
            </a>
            <a href={`tel:${PHONE_NUMBER_LINK}`} className="btn btn-outline" onClick={closeMobileMenu}>
              {contactInfo.phone}
            </a>
          </div>
        </nav>

        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy fade-up">
              <p className="eyebrow">Premium student living in Pune</p>
              <h1>
                Affordable. Premium.
                <br />
                Accommodation.
              </h1>
              <p className="subtext">
                Trusted Boys Hostel Near MIT ADT University, Rajbaug Campus with Safe &amp; Secure Stay
              </p>
              <div className="cta-row">
                <a href={`tel:${PHONE_NUMBER_LINK}`} className="btn btn-solid">
                  Call Now
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  WhatsApp
                </a>
              </div>
              <p className="subtext">Only Few Seats Available – Hurry Up!</p>

              <div className="quote-card fade-up" id="quoteForm">
                <h2>Want a quote? Just fill in the form and we'll take it from there.</h2>

                <form id="leadForm" onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="firstName">Full Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your full name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      pattern="[0-9+\\-\\s]{8,15}"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="lookingFor">Looking For</label>
                    <select
                      id="lookingFor"
                      name="lookingFor"
                      value={lookingFor}
                      onChange={(event) => setLookingFor(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Boys Hostel">Boys Hostel</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-solid submit-btn" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                  <p className={`form-status ${status.type}`}>{status.message}</p>
                </form>
              </div>
            </div>

            <div className="hero-media fade-up" ref={heroParallaxRef}>
              <div className="hero-blur-shape" aria-hidden="true" />
              <div className="floating-shape" aria-hidden="true" ref={floatingShapeRef}>
                <div className="floating-shape-core" />
              </div>
              <div className="hero-image-stack">
                <img
                  src={skyOasisImage}
                  alt="Sky Hostel room view"
                />
                <div className="hero-image-glass" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="properties-showcase fade-up" id="properties">
          <div className="container">
            <h3 className="properties-heading">Our Properties</h3>
            <div className="properties-grid">
              {properties.map((property) => (
                <article className="property-card" key={property.title}>
                  <img src={property.image} alt={property.title} />
                  <div className="property-top">{property.distance}</div>
                  <div className="property-bottom">
                    {property.subtitle === "Coming Soon" ? (
                      <div className="property-info-link">
                        <h4>{property.title}</h4>
                        <p>{property.subtitle}</p>
                      </div>
                    ) : (
                      <>
                        <Link to={`/properties/${property.slug}`} aria-label={`View ${property.title}`} className="property-info-link">
                          <h4>{property.title}</h4>
                          <p>{property.subtitle}</p>
                        </Link>
                        <Link to={`/properties/${property.slug}`} aria-label={`View ${property.title}`} className="property-arrow">
                          &#8599;
                        </Link>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="creative-carousel fade-up" aria-label="Creative living spaces">
          <div className="container">
            <h3>By Creatives, for Creatives</h3>
            <p>
              Sky Hostel is designed to support students and young professionals with spaces that
              feel calm, practical, and motivating. Relax, study, and grow in a thoughtfully managed
              environment.
            </p>

            <div className="creative-stage">
              <button
                type="button"
                className="creative-nav prev"
                onClick={handleCreativePrev}
                aria-label="Previous slides"
              >
                &#8249;
              </button>

              <div className="creative-grid">
                <article className="creative-card">
                  <img
                    key={`creative-left-${creativeIndex}`}
                    src={creativeRooms[creativeIndex]}
                    alt="Sky hostel room view one"
                  />
                </article>
                <article className="creative-card">
                  <img
                    key={`creative-right-${creativeIndex}`}
                    src={creativeRooms[(creativeIndex + 1) % creativeRooms.length]}
                    alt="Sky hostel room view two"
                  />
                </article>
              </div>

              <button
                type="button"
                className="creative-nav next"
                onClick={handleCreativeNext}
                aria-label="Next slides"
              >
                &#8250;
              </button>
            </div>
          </div>
        </section>

        <section className="location-and-facilities fade-up" aria-label="Location and facilities">
          <div className="container">
            <div className="location-feature-grid">
              <div className="location-feature-media">
                <img src={locationFeature.image} alt="Sky Hostel common dining area" />
              </div>
              <div className="location-feature-copy">
                <h3>{locationFeature.title}</h3>
                <p>{locationFeature.text}</p>
              </div>
            </div>

            <div className="facilities-head">
              <h3>Facilities & Benefits</h3>
            </div>

            <div className="facilities-grid">
              <article className="facilities-large-media fade-up" style={{ "--delay": "40ms" }}>
                <img
                  src={studyAreaImage}
                  alt="Sky Hostel study area"
                />
              </article>

              <article className="facilities-copy fade-up" style={{ "--delay": "120ms" }}>
                <h4>Facilities & Amenities</h4>
                <ul className="facilities-list">
                  <li><strong>Food Facility Available:</strong> Yes</li>
                  <li><strong>Wi-Fi:</strong> High Speed Wi-Fi network available</li>
                  <li><strong>Electricity / Water:</strong> 24 Hrs Available</li>
                  <li><strong>Housekeeping:</strong> Daily Cleaning available with HK Staff</li>
                  <li><strong>Laundry:</strong> Washing Machine Facilities Available</li>
                  <li><strong>Secure Entry:</strong> 24 Hrs Available</li>
                  <li><strong>Two-wheeler parking available:</strong> Yes</li>
                </ul>
                <a href="#quoteForm" className="facilities-feature-btn">
                  Explore Features
                </a>
                <p className="subtext">Only Few Seats Available – Hurry Up!</p>
              </article>

              <div className="facilities-tiles">
                {facilitiesTiles.map((tile, index) => (
                  <article className="facilities-tile fade-up" style={{ "--delay": `${180 + index * 80}ms` }} key={tile.title}>
                    <img src={tile.image} alt={tile.title} />
                    <span>{tile.title}</span>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="hostel-cartoon-section">
          <div className="container">
            <div className="hostel-cartoon-copy fade-up">
              <h3>A Better Way to Stay and Study.</h3>
              <p>
                We believe hostel life should feel comfortable, creative, and balanced. That&apos;s why we built
                spaces to study, unwind, and connect with friends. From calm rooms to managed amenities, every
                detail is designed to help you stay focused, healthy, and happy throughout the year.
              </p>
            </div>

            {/* Real 3D objects scene - scattered left, center, right */}
            <div className="scene-3d-wrapper fade-up">
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

            {/* Footer merged into same section - same colour theme */}
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
                  <Link to="/facilities-benefits">Facilities & Benefits</Link>
                </nav>
              </div>
              <div className="sky-home-footer-col">
                <h4 className="sky-home-footer-heading">Contact</h4>
                <p className="sky-home-footer-line">Email - <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                <p className="sky-home-footer-line">Mobile - {contactInfo.phone}</p>
                <p className="sky-home-footer-line">
                  Address -{" "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sky-home-footer-address-link"
                  >
                    {contactInfo.address}
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
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>
                </a>
              </div>
            </div>
              <div className="sky-home-footer-bottom">
                <p>Copyright Â©{new Date().getFullYear()} All Rights Reserved By Sky Hostel &nbsp; Designed By Webakoof</p>
              </div>
          <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="sky-home-float-phone" aria-label="Call">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span className="sky-home-float-badge" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="sky-home-float-whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span className="sky-home-float-badge">1</span>
          </a>
            </footer>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;


