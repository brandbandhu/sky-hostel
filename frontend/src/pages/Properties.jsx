import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/mock";
import { getFriendlySupabaseError, submitContactForm } from "../lib/formSubmissions";
import { getSeoKeywords, setSeoMeta } from "../lib/seo";
import "./Home.css";
import "./Properties.css";

const properties = [
  {
    slug: "sky-oasis",
    distance: "500 meters from MIT ADT, Loni Kalbhor",
    title: "Sky Oasis",
    subtitle: "Boys Hostel",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "sky-aura",
    distance: "400 meters from MIT ADT, Loni Kalbhor",
    title: "Sky Aura",
    subtitle: "Girls Hostel",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "sky-shivneri",
    distance: "600 meters from MIT ADT, Loni Kalbhor",
    title: "Sky Shivneri",
    subtitle: "Girls Hostel",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "sky-den",
    distance: "Yet To Decide",
    title: "Sky Den",
    subtitle: "Coming Soon",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
  }
];

const Properties = () => {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    setSeoMeta({
      title: "Our Properties | MIT ADT University College Hostel Options | Sky Hostels",
      description:
        "Explore Sky Hostels properties near MIT ADT University College, Loni Kalbhor including Sky Oasis, Sky Aura, and Sky Shivneri for boys and girls.",
      keywords: getSeoKeywords([
        "Our Properties Sky Hostels",
        "Sky Oasis Boys Hostel",
        "Sky Aura Girls Hostel",
        "Sky Shivneri Girls Hostel",
        "MIT ADT University College hostel options"
      ]),
      path: "/properties"
    });
  }, []);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const mobile = String(formData.get("mobile") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const fullName = `${firstName} ${lastName}`.trim();

    const { error } = await submitContactForm({
      name: fullName,
      email,
      phone: mobile,
      subject: "Properties Enquiry",
      message
    });

    if (error) {
      setStatus({ type: "error", message: getFriendlySupabaseError(error) });
      setSubmitting(false);
      return;
    }

    setStatus({ type: "success", message: "Thanks. Your enquiry has been submitted successfully." });
    formElement.reset();
    setSubmitting(false);
  };

  return (
    <div className="properties-page">
      <section className="properties-strip">
        <div className="properties-strip-inner">
          {properties.map((property, index) => (
            <article
              key={property.title}
              className="properties-strip-card fade-up"
              style={{ "--delay": `${index * 80}ms` }}
            >
              <img src={property.image} alt={property.title} />
              <div className="properties-strip-top">
                <span>{property.distance}</span>
              </div>
              <div className="properties-strip-bottom">
                {property.subtitle === "Coming Soon" ? (
                  <div className="properties-strip-info-link">
                    <h3>{property.title}</h3>
                    <p>{property.subtitle}</p>
                  </div>
                ) : (
                  <>
                    <Link to={`/properties/${property.slug}`} aria-label={`View ${property.title}`} className="properties-strip-info-link">
                      <h3>{property.title}</h3>
                      <p>{property.subtitle}</p>
                    </Link>
                    <Link
                      to={`/properties/${property.slug}`}
                      aria-label={`View ${property.title}`}
                      className="properties-strip-cta"
                    >
                      &#8599;
                    </Link>
                  </>
                )}
              </div>
              {property.subtitle === "Coming Soon" && (
                <div className="properties-strip-badge">Coming Soon</div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="properties-contact-section">
        <div className="properties-contact-wrap">
          <h2>Get in Touch</h2>
          <form className="properties-contact-form" onSubmit={handleContactSubmit}>
            <div className="properties-contact-grid">
              <div className="properties-field">
                <label htmlFor="propertyFirstName">First Name</label>
                <input id="propertyFirstName" name="firstName" type="text" placeholder="Enter first name" required />
              </div>
              <div className="properties-field">
                <label htmlFor="propertyLastName">Last Name</label>
                <input id="propertyLastName" name="lastName" type="text" placeholder="Enter last name" required />
              </div>
              <div className="properties-field">
                <label htmlFor="propertyEmail">Email</label>
                <input id="propertyEmail" name="email" type="email" placeholder="Enter email address" required />
              </div>
              <div className="properties-field">
                <label htmlFor="propertyMobile">Mobile Number</label>
                <input
                  id="propertyMobile"
                  name="mobile"
                  type="tel"
                  pattern="[0-9+\\-\\s]{8,15}"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div className="properties-field properties-field-full">
                <label htmlFor="propertyMessage">Message</label>
                <textarea
                  id="propertyMessage"
                  name="message"
                  rows="5"
                  placeholder="Tell us what you are looking for"
                  required
                />
              </div>
            </div>
            <button type="submit" className="properties-contact-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Send Message"}
            </button>
            <p className={`properties-contact-status ${status.type}`}>{status.message}</p>
          </form>
        </div>
      </section>

      <div className="sky-home properties-bottom-unified">
        <section className="hostel-cartoon-section">
          <div className="container">
            <div className="hostel-cartoon-copy">
              <h3>
                Need More Information?
                <br />
                Check out Facilities &amp; Benefits
              </h3>
              <p>
                We have a variety of facilities that you can use to help you get the most out of your time at
                our stay.
              </p>
              <a href="/#quoteForm" className="properties-bottom-cta">Check Out</a>
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
                    <Link to="/facilities-benefits">Facilities & Benefits</Link>
                  </nav>
                  <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="sky-home-footer-phone">
                    {contactInfo.phone}
                  </a>
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
                    <input type="email" name="footer_email" placeholder="Email" className="sky-home-footer-input" required />
                    <button type="submit" className="sky-home-footer-submit">Subscribe</button>
                  </form>
                </div>
              </div>
              <div className="sky-home-footer-bottom">
                <p>Copyright ©{new Date().getFullYear()} All Rights Reserved By Sky Hostel &nbsp; Designed By Webakoof</p>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Properties;
