import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { contactInfo } from "../data/mock";
import { getSeoKeywords, setSeoMeta } from "../lib/seo";
import "./Home.css";
import "./PropertyDetail.css";

const propertyDetails = {
  "sky-oasis": {
    title: "Sky Oasis",
    subtitle: "Boys Hostel",
    distance: "500 meters from MIT ADT, Loni Kalbhor",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80",
    description:
      "Sky Oasis is a premium boys hostel designed for students who want comfort, discipline, and convenience near MIT ADT, Loni Kalbhor. The property is planned for daily student life with clean rooms, practical storage, study-friendly common areas, and dependable core services. Its location helps reduce commute stress, while on-site support systems make day-to-day living smooth, safe, and organized.",
    highlights: [
      "Well-maintained boys hostel rooms with comfortable layouts",
      "High-speed Wi-Fi support for lectures, assignments, and online classes",
      "Daily housekeeping with consistent hygiene standards",
      "24 Hrs electricity and water availability for uninterrupted routine",
      "Food / mess support with student-friendly meal timings",
      "Laundry facility with washing machine access",
      "24 Hrs CCTV and security monitoring for resident safety",
      "Close campus connectivity: 500 meters from MIT ADT, Loni Kalbhor"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80"
    ]
  },
  "sky-aura": {
    title: "Sky Aura",
    subtitle: "Girls Hostel",
    distance: "400 meters from MIT ADT, Loni Kalbhor",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
    description:
      "Sky Aura is a girls hostel focused on safety, convenience, and a calm environment for academics. It provides a balanced setup with essential facilities and easy daily access near MIT ADT.",
    highlights: [
      "Safe and professionally managed girls accommodation",
      "Wi-Fi enabled spaces for study and productivity",
      "Daily cleaning with housekeeping staff",
      "Laundry and mess support available"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1617098474202-0d0d7f60aafa?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2200&q=80"
    ]
  },
  "sky-shivneri": {
    title: "Sky Shivneri",
    subtitle: "Girls Hostel",
    distance: "600 meters from MIT ADT, Loni Kalbhor",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1800&q=80",
    description:
      "Sky Shivneri is designed for students looking for a peaceful and secure girls hostel experience. The property combines comfort-focused infrastructure with dependable day-to-day facilities.",
    highlights: [
      "Spacious and comfortable stay options",
      "24 Hrs CCTV and security support",
      "Reliable electricity and water availability",
      "Convenient location for MIT ADT students"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=2200&q=80"
    ]
  },
  "sky-den": {
    title: "Sky Den",
    subtitle: "Coming Soon",
    distance: "Yet To Decide",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1800&q=80",
    description:
      "Sky Den is an upcoming property in the Sky Hostel portfolio. Detailed location and room information will be announced soon as planning and final setup are completed.",
    highlights: [
      "New accommodation option under development",
      "Planned with modern student-focused amenities",
      "Expected to follow the same quality standards",
      "Bookings and details will open soon"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=2200&q=80",
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
        "Premium Boys & Girls Hostel Near MIT ADT University College, Loni Kalbhor",
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
              SKY <span>HOSTELS</span>
            </Link>
            <nav className="property-local-nav">
              <Link to="/">Home</Link>
              <Link to="/properties">Our Properties</Link>
              <Link to="/facilities-benefits">Facilities &amp; Benefits</Link>
            </nav>
            <div className="property-local-actions">
              <a href="/#quoteForm" className="property-local-btn property-local-btn-solid">Get in touch</a>
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
    </main>
  );
};

export default PropertyDetail;
