import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { contactInfo } from "../data/mock";
import { getFriendlySupabaseError, submitContactForm } from "../lib/formSubmissions";
import { getSeoKeywords, setSeoMeta } from "../lib/seo";
import logoImage from "../assets/images/logo.png";
import roomImage from "../assets/images/carousel img/room.png";
import hostelBuildingImage from "../assets/images/hostel building.jpeg";
import skyOasisImage from "../assets/images/sky Oasis.jpeg";
import skyThreeImage from "../assets/images/Sky 3.jpeg";

import "./Home.css";
import "./Properties.css";
const INSTAGRAM_LINK = "https://www.instagram.com/skyhostels4u/";
const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=61588214504098";

const properties = [
  {
    slug: "sky-1",
    distance: "100 metre distance from MIT ADT University, Rajbaug Campus",
    title: "Sky 1 - Opposite Vishwaraj Hospital",
    subtitle: "Boys/Girls Hostel",
    image: skyOasisImage
  },
  {
    slug: "sky-2",
    distance: "10 metre distance from MIT ADT University, Rajbaug Campus",
    title: "Sky 2 - Chintamani Park",
    subtitle: "Boys/Girls Hostel",
    image: hostelBuildingImage
  },
  {
    slug: "sky-3",
    distance: "300 metre distance from MIT ADT University, Rajbaug Campus",
    title: "Sky 3 - Opposite Joynest, Pune Solapur Highway",
    subtitle: "Boys/Girls Hostel",
    image: skyThreeImage
  }
];

const Properties = () => {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    setSeoMeta({
      title: "Our Properties | MIT ADT University College Hostel Options | SKY HOSTEL",
      description:
        "Explore Sky Hostels wing-wise properties near MIT ADT University, Rajbaug Campus: Sky 1 (boys), Sky 2 - Chintamani Park (girls), and Sky 3 opposite Joynest (boys).",
      keywords: getSeoKeywords([
        "Our Properties Sky Hostels",
        "Sky 1 boys/girls hostel",
        "Sky 2 Chintamani Park boys/girls hostel",
        "Sky 3 boys/girls hostel",
        "Boys hostel near MIT ADT University Rajbaug Campus"
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
    const studentName = String(formData.get("studentName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phoneNumber = String(formData.get("phoneNumber") || "").trim();
    const collegeCourse = String(formData.get("collegeCourse") || "").trim();
    const lookingFor = String(formData.get("lookingFor") || "").trim();
    const message = `Looking for: ${lookingFor}\nCollege/Course: ${collegeCourse}`;

    const { error } = await submitContactForm({
      name: studentName,
      email,
      phone: phoneNumber,
      subject: "Properties Enquiry",
      message,
      lookingFor,
      source: "properties_contact_form"
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
                <label htmlFor="propertyStudentName">Name of the Students</label>
                <input id="propertyStudentName" name="studentName" type="text" placeholder="Enter student name" required />
              </div>
              <div className="properties-field">
                <label htmlFor="propertyPhoneNumber">Phone Number</label>
                <input
                  id="propertyPhoneNumber"
                  name="phoneNumber"
                  type="tel"
                  pattern="[0-9+\\-\\s]{8,15}"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="properties-field">
                <label htmlFor="propertyEmail">Email ID</label>
                <input id="propertyEmail" name="email" type="email" placeholder="Enter email address" required />
              </div>
              <div className="properties-field">
                <label htmlFor="propertyCollegeCourse">College/ Course</label>
                <input id="propertyCollegeCourse" name="collegeCourse" type="text" placeholder="Enter college/course" required />
              </div>
              <div className="properties-field properties-field-full">
                <label htmlFor="propertyLookingFor">Looking for</label>
                <textarea
                  id="propertyLookingFor"
                  name="lookingFor"
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
  );
};

export default Properties;





