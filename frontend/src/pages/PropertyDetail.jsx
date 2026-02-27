import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { contactInfo } from "../data/mock";
import { getSeoKeywords, setSeoMeta } from "../lib/seo";
import logoImage from "../assets/images/logo.png";
import skyOasisImage from "../assets/images/sky Oasis.jpeg";

import "./Home.css";
import "./PropertyDetail.css";
const INSTAGRAM_LINK = "https://www.instagram.com/skyhostels4u/";
const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=61588214504098";
const REGISTRATION_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdu8fzkKVPr2MXzm_d7p04J7WF9z6CQbDbJV9V1QKr1iP9F6g/viewform?usp=header";

const propertyDetails = {
  "sky-1": {
    title: "Sky 1",
    subtitle: "Boys Hostel",
    distance: "300 metre from MIT ADT University, Rajbaug Campus",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80",
    description:
      "Sky 1 is a premium boys hostel wing designed for students who want comfort, discipline, and convenience near MIT ADT University, Rajbaug Campus. The property is planned for daily student life with clean rooms, practical storage, study-friendly common areas, and dependable core services.",
    highlights: [
      "Well-maintained boys hostel rooms with comfortable layouts",
      "High-speed Wi-Fi support for lectures, assignments, and online classes",
      "Daily housekeeping with consistent hygiene standards",
      "24 Hrs electricity and water availability for uninterrupted routine",
      "Food facility support with student-friendly meal timings",
      "Laundry facility with washing machine access",
      "24 Hrs CCTV and security monitoring for resident safety",
      "Wing distance: 300 metre from MIT ADT University, Rajbaug Campus"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80"
    ]
  },
  "sky-2": {
    title: "Sky 2 - Chintamani Park",
    subtitle: "Boys Hostel",
    distance: "10 metre from MIT ADT University, Rajbaug Campus",
    image: skyOasisImage,
    description:
      "Sky 2 - Chintamani Park is a boys hostel wing located very close to MIT ADT University, Rajbaug Campus. It is designed for convenient access, safe living, and a focused routine with essential daily amenities.",
    highlights: [
      "Wing distance: 10 metre from MIT ADT University, Rajbaug Campus",
      "Modern student-focused amenities",
      "Safe and secure managed environment",
      "Clean and practical room setup"
    ],
    gallery: [
      skyOasisImage,
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80"
    ]
  }
};

const PropertyDetail = () => {
  const { slug } = useParams();
  const property = propertyDetails[slug];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const directionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`;
  const hasGallery = Boolean(property?.gallery?.length);

  useEffect(() => {
    setGalleryIndex(0);
  }, [slug]);

  useEffect(() => {
    if (!property) return;
    setSeoMeta({
      title: `${property.title} | ${property.subtitle} | Hostel Near MIT ADT University College`,
      description: `${property.title} - ${property.subtitle}. ${property.distance}. ${property.description}`,
      keywords: getSeoKeywords([
        `${property.title} ${property.subtitle}`,
        `Hostel near MIT ADT University College ${property.title}`,
        "Premium Boys Hostel Near MIT ADT University College, Loni Kalbhor",
        "MIT ADT University College hostel"
      ]),
      path: `/properties/${slug}`
    });
  }, [property, slug]);

  if (!property) {
    return <Navigate to="/properties" replace />;
  }

  const showPrev = () => {
    setGalleryIndex((prev) => (prev === 0 ? property.gallery.length - 1 : prev - 1));
  };

  const showNext = () => {
    setGalleryIndex((prev) => (prev + 1) % property.gallery.length);
  };

  return (
    <main className="property-detail-page">
      <section className="property-detail-section">
        <header className="property-local-header">
          <div className="property-local-header-inner">
            <Link to="/" className="property-local-logo">
              <img src={logoImage} alt="Sky Hostels" className="brand-logo-img" />
            </Link>
            <nav className="property-local-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/properties">Our Properties</Link>
              <Link to="/facilities-benefits">Facilities &amp; Benefits</Link>
            </nav>
            <div className="property-local-actions">
              <a href={REGISTRATION_FORM_LINK} target="_blank" rel="noopener noreferrer" className="property-local-btn property-local-btn-solid">Google Registration Form</a>
              <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="property-local-btn property-local-btn-outline">
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </header>

        <div className="property-detail-shell">
          <div className="property-detail-media">
            <img src={property.image} alt={property.title} />
          </div>

          <div className="property-detail-panel">
            <p className="property-detail-kicker">{property.subtitle}</p>
            <h1>{property.title}</h1>
            <p className="property-detail-distance">{property.distance}</p>
            <p className="property-detail-description">{property.description}</p>
            <ul>
              {property.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="property-detail-actions">
              <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="property-detail-btn property-detail-btn-solid">
                Call Now
              </a>
              <a href={directionsLink} target="_blank" rel="noopener noreferrer" className="property-detail-btn property-detail-btn-outline">
                Get Direction
              </a>
              <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="property-detail-btn property-detail-btn-whatsapp">
                WhatsApp
              </a>
            </div>

            <Link to="/properties" className="property-detail-back">
              Back to Our Properties
            </Link>
          </div>
        </div>

        {(
          <section className="property-liked-section" aria-label="Most liked features">
            <div className="property-liked-head">
              <span className="property-liked-star" aria-hidden="true">✶</span>
              <h2>MOST LIKED FEATURES</h2>
            </div>

            <div className="property-liked-body">
              <div className="property-liked-copy">
                <p>
                  Welcome to {property.title} Hostel, where comfort meets convenience! Our hostel is designed to make your stay
                  enjoyable and hassle-free. We ensure a comfortable, enjoyable, and secure living experience. Come join us
                  and feel right at home! 🌴 🏡 ✨
                </p>
              </div>

              <div className="property-liked-chips">
                <span className="property-liked-chip">🏨 Fully Furnished</span>
                <span className="property-liked-chip">🍽️ Pantry</span>
                <span className="property-liked-chip">💧 Purified Water Supply</span>
                <span className="property-liked-chip">🧹 Housekeeping</span>
                <span className="property-liked-chip">🌐 Wi-Fi</span>
                <span className="property-liked-chip">🧺 Washing Machine</span>
                <span className="property-liked-chip">♨️ Hot Water</span>
                <span className="property-liked-chip">⚡ Fair Usage of Electricity</span>
                <span className="property-liked-chip">🛵 2 Wheeler Parking</span>
                <span className="property-liked-chip">🛡️ 2 Level Security</span>
              </div>
            </div>
          </section>
        )}

        {hasGallery && (
          <section className="property-gallery-section" aria-label="Property gallery">
            <div className="property-gallery-wrap">
              <img src={property.gallery[galleryIndex]} alt={`${property.title} gallery ${galleryIndex + 1}`} />
              <button type="button" className="property-gallery-nav prev" onClick={showPrev} aria-label="Previous image">
                &#8249;
              </button>
              <button type="button" className="property-gallery-nav next" onClick={showNext} aria-label="Next image">
                &#8250;
              </button>
            </div>

            <div className="property-gallery-thumbs" aria-label="Gallery thumbnails">
              {property.gallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={`property-gallery-thumb ${galleryIndex === index ? "active" : ""}`}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Open image ${index + 1}`}
                >
                  <img src={image} alt={`${property.title} thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </section>
        )}
      </section>

      <div className="sky-home">
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
                    <Facebook size={28} />
                  </a>
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
    </main>
  );
};

export default PropertyDetail;



