import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/mock";
import { getSeoKeywords, setSeoMeta } from "../lib/seo";
import "./Home.css";
import "./FacilitiesBenefits.css";

const facilityCards = [
  {
    title: "Food / Mess Facility",
    description:
      "Nutritious meals are served with both mess and food facility support for daily convenience. Menus are planned for students and working residents, with hygienic preparation standards. Regular meal timings help maintain routine and comfort throughout the week.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Wi-Fi",
    description:
      "High-speed Wi-Fi is available across key hostel areas for study, classes, and streaming. The network is designed to support daily academic and professional usage. Residents can stay connected smoothly throughout the day.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Electricity / Water",
    description:
      "24-hour electricity and water supply is available to ensure uninterrupted daily living. Residents can study, rest, and manage routines without utility disruptions. Reliable basic services help maintain a comfortable and stress-free stay.",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Housekeeping",
    description:
      "Daily cleaning is handled by trained HK staff to keep rooms and shared areas neat. Regular upkeep supports hygiene and a healthier environment for all residents. Clean spaces also improve comfort, focus, and overall hostel experience.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Laundry",
    description:
      "Washing machine facilities are available for convenient in-house laundry management. Residents can wash clothes on schedule without depending on outside services. This saves time and makes day-to-day living easier.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Security / CCTV",
    description:
      "24-hour security support with CCTV monitoring helps maintain a safe hostel environment. Entry and movement are monitored to improve resident safety. Continuous surveillance adds confidence for both residents and families.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Parking (if available)",
    description:
      "Parking space is available (subject to availability) for residents with vehicles. Designated parking support helps reduce daily commute hassle. It adds convenience and better accessibility for routine travel.",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=80"
  }
];

const FacilitiesBenefits = () => {
  useEffect(() => {
    setSeoMeta({
      title: "Facilities & Benefits | Hostel Near MIT ADT University College | Sky Hostels",
      description:
        "Discover facilities and benefits at Sky Hostels near MIT ADT University College, including food, Wi-Fi, housekeeping, laundry, CCTV security, and more.",
      keywords: getSeoKeywords([
        "Facilities and Benefits hostel",
        "Food mess facility hostel",
        "Wi-Fi hostel MIT ADT",
        "24 Hrs CCTV hostel",
        "Laundry and housekeeping hostel"
      ]),
      path: "/facilities-benefits"
    });
  }, []);
  return (
    <div className="facilities-page">
      <section className="facilities-one-section">
        <div className="facilities-shell">
          <header className="facilities-local-header">
            <Link to="/" className="facilities-local-logo">
              SKY <span>HOSTELS</span>
            </Link>
            <nav className="facilities-local-nav">
              <Link to="/">Home</Link>
              <Link to="/properties">Our Properties</Link>
              <Link to="/facilities-benefits">Facilities &amp; Benefits</Link>
            </nav>
            <div className="facilities-local-actions">
              <Link to="/#quoteForm" className="facilities-local-btn facilities-local-btn-solid">Get in touch</Link>
              <a
                href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`}
                className="facilities-local-btn facilities-local-btn-outline"
              >
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
                        <span className="sky-home-footer-logo-icon">S</span>
                        <span className="sky-home-footer-logo-text">SKY HOSTEL</span>
                      </div>
                      <nav className="sky-home-footer-nav">
                        <Link to="/">Home</Link>
                        <Link to="/properties">Our Properties</Link>
                        <Link to="/facilities-benefits">Facilities &amp; Benefits</Link>
                      </nav>
                      <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="sky-home-footer-phone">
                        {contactInfo.phone}
                      </a>
                    </div>
                    <div className="sky-home-footer-col">
                      <h4 className="sky-home-footer-heading">Contact</h4>
                      <p className="sky-home-footer-line">
                        Email - <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                      </p>
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
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sky-home-footer-social"
                        aria-label="Instagram"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                        </svg>
                      </a>
                    </div>
                    <div className="sky-home-footer-col sky-home-footer-newsletter">
                      <h4 className="sky-home-footer-heading">Stay Connected</h4>
                      <p className="sky-home-footer-subtext">Stay up-to-date with the latest news and updates.</p>
                      <form className="sky-home-footer-form" onSubmit={(event) => event.preventDefault()}>
                        <input
                          type="email"
                          name="footer_email"
                          placeholder="Email"
                          className="sky-home-footer-input"
                          required
                        />
                        <button type="submit" className="sky-home-footer-submit">
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="sky-home-footer-bottom">
                    <p>
                      Copyright {new Date().getFullYear()} All Rights Reserved By Sky Hostel &nbsp; Designed By
                      Webakoof
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


