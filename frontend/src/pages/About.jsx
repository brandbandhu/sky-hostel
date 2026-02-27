import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bath, BedDouble, FileText, Instagram, Lightbulb, PlugZap, ShieldCheck, Shirt, Sparkles, Wifi } from "lucide-react";
import { contactInfo } from "../data/mock";
import { setSeoMeta, getSeoKeywords } from "../lib/seo";
import directorsMsgImage from "../assets/images/directors msg .png";
import logoImage from "../assets/images/logo.png";
import bedroomImage from "../assets/images/bedroom.jpeg";
import diningImage from "../assets/images/dining.jpeg";
import water24HoursImage from "../assets/images/SHARED & COMMON FACILITIES/24 Hours Water Supply.png";
import cctvAndGeyserSolarImage from "../assets/images/SHARED & COMMON FACILITIES/CCTV Camera and Geyser_Solar.png";
import diningHallImage from "../assets/images/SHARED & COMMON FACILITIES/Dining Hall.png";
import inductionCommonUseImage from "../assets/images/SHARED & COMMON FACILITIES/Induction for Common Use.png";
import ironCommonUseImage from "../assets/images/SHARED & COMMON FACILITIES/Iron for Common Use.png";
import laundryServicesImage from "../assets/images/SHARED & COMMON FACILITIES/Laundry Services.png";
import liftServiceImage from "../assets/images/SHARED & COMMON FACILITIES/Lift Service.png";
import professionalStaffImage from "../assets/images/SHARED & COMMON FACILITIES/Professional Staff (Warden, Attendant, Security, Housekeeping).png";
import recreationAreasImage from "../assets/images/SHARED & COMMON FACILITIES/Recreation Areas (TV, Reading, Indoor Games).png";
import roWaterFacilityImage from "../assets/images/SHARED & COMMON FACILITIES/RO Water Facility (Water Cooler).png";
import tvCommonUseImage from "../assets/images/SHARED & COMMON FACILITIES/TV for Common Use.png";
import "./Home.css";
import "./FacilitiesBenefits.css";

const INSTAGRAM_LINK = "https://www.instagram.com/skyhostels4u/";
const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=61588214504098";
const REGISTRATION_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdu8fzkKVPr2MXzm_d7p04J7WF9z6CQbDbJV9V1QKr1iP9F6g/viewform?usp=header";
const keyAmenitiesHighlights = [
  {
    icon: Wifi,
    title: "High-Speed Internet",
    text: "High-speed Wi-Fi is widely available for online lectures and other activities."
  },
  {
    icon: Bath,
    title: "Bathroom Setup",
    text: "Western toilet and whole bathroom setup for comfort, convenience, and hygiene."
  },
  {
    icon: BedDouble,
    title: "Furnished Rooms",
    text: "Beds, mattresses, study tables, chairs, book shelf, shoe rack, door mat, and wardrobes are provided."
  },
  {
    icon: Sparkles,
    title: "Daily Housekeeping",
    text: "Daily housekeeping support for regular room cleaning."
  },
  {
    icon: Shirt,
    title: "Balcony Cloth Hanger",
    text: "Cloth hanger support is available for balcony use."
  },
  {
    icon: Lightbulb,
    title: "Fan & Tube Lights",
    text: "Every room includes fan and tube lights for daily comfort."
  },
  {
    icon: PlugZap,
    title: "Charging Points",
    text: "Convenient charging points are available in rooms."
  }
];
const sharedCommonFacilities = [
  { title: "Laundry Services", image: laundryServicesImage },
  { title: "Induction for Common Use", image: inductionCommonUseImage },
  { title: "Iron for Common Use", image: ironCommonUseImage },
  { title: "Dining Hall", image: diningHallImage },
  { title: "Recreation Areas (TV, Reading, Indoor Games)", image: recreationAreasImage },
  { title: "Lift Service", image: liftServiceImage },
  { title: "RO Water Facility (Water Cooler)", image: roWaterFacilityImage },
  { title: "TV for Common Use", image: tvCommonUseImage },
  { title: "24 Hours Water Supply", image: water24HoursImage },
  { title: "Professional Staff (Warden, Attendant, Security, Housekeeping)", image: professionalStaffImage },
  { title: "CCTV Camera and Geyser/Solar", image: cctvAndGeyserSolarImage }
];
const healthSafetyHighlights = [
  {
    title: "Medical Support",
    text: "Our hostel is very close to a medical store and hospital, which is very helpful in case of medical emergencies."
  },
  {
    title: "Emergency Assistance",
    text: "Student safety is our highest priority. At SKY Hostels, we ensure quick and reliable support during any emergency situation."
  },
  {
    title: "Parking",
    text: "Parking areas for two-wheelers and other vehicles are provided for residents."
  }
];
const admissionProcedureSteps = [
  {
    step: "01",
    title: "Application Form",
    points: [
      "Collect and fill out the prescribed admission form with accurate personal, academic, and contact details.",
      "Submit required documents: ID proof, address proof, passport-size photographs, and admission/office letter (if applicable)."
    ]
  },
  {
    step: "02",
    title: "Verification",
    points: [
      "Hostel management will verify documents and eligibility.",
      "Police verification may be required for safety and compliance."
    ]
  },
  {
    step: "03",
    title: "Admission Confirmation",
    points: [
      "Admission is confirmed only after payment of admission fees/security deposit and advance rent.",
      "An admission receipt and hostel ID card will be issued."
    ]
  },
  {
    step: "04",
    title: "Room Allotment",
    points: [
      "Rooms are allotted based on availability and hostel rules (shared/single occupancy).",
      "No student/guest is allowed to change rooms without prior approval."
    ]
  }
];
const documentsRequired = [
  "Aadhaar Card (Resident)",
  "Passport Size Photographs (2 Copies)",
  "Parent/Guardian Aadhaar Copy",
  "College ID",
  "Permanent Address Proof"
];
const rulesDiscipline = [
  "Appropriate discipline must be maintained.",
  "Timely entry regulations.",
  "No unauthorized visitors allowed.",
  "Maintain cleanliness and hygiene.",
  "Respect other residents and property."
];
const hostelPolicies = [
  {
    code: "A",
    title: "Fees & Payment",
    points: [
      "Rent and charges must be paid in advance (monthly/quarterly as per rules).",
      "Security deposit is refundable only at the time of leaving, after deducting dues/damages.",
      "Late fee will be charged if payment is delayed."
    ]
  },
  {
    code: "B",
    title: "Visitors & Guests",
    points: [
      "Visitors are allowed only during specified hours in common areas.",
      "Overnight stay of outsiders is strictly prohibited."
    ]
  },
  {
    code: "C",
    title: "Facilities Usage",
    points: [
      "Residents must take care of hostel property (furniture, electrical fittings, appliances).",
      "Damages caused will be charged to the responsible individual.",
      "Common facilities (mess, kitchen, laundry) must be used responsibly."
    ]
  },
  {
    code: "D",
    title: "Vacating the Hostel",
    points: [
      "Residents must give at least 1-month written notice before vacating.",
      "Final settlement will be done only after room inspection and clearance of dues."
    ]
  }
];

const About = () => {
  const [sharedCarouselIndex, setSharedCarouselIndex] = useState(0);
  const [sharedVisibleCards, setSharedVisibleCards] = useState(3);

  useEffect(() => {
    setSeoMeta({
      title: "About Us | Sky Hostels",
      description:
        "Learn about Sky Hostels - trusted boys hostel near Vishwaraj Hospital focused on safe accommodation, cleanliness, discipline, and a study-friendly environment.",
      keywords: getSeoKeywords([
        "About Sky Hostels",
        "Boys hostel near Vishwaraj Hospital",
        "Safe and secure boys hostel",
        "Study friendly hostel Pune"
      ]),
      path: "/about"
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSharedCarouselIndex((prev) => {
        const maxStart = Math.max(0, sharedCommonFacilities.length - sharedVisibleCards);
        return prev >= maxStart ? 0 : prev + 1;
      });
    }, 2800);

    return () => window.clearInterval(timer);
  }, [sharedVisibleCards]);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 640) {
        setSharedVisibleCards(1);
      } else if (window.innerWidth <= 1024) {
        setSharedVisibleCards(2);
      } else {
        setSharedVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handleSharedPrev = () => {
    setSharedCarouselIndex((prev) => {
      const maxStart = Math.max(0, sharedCommonFacilities.length - sharedVisibleCards);
      return prev === 0 ? maxStart : prev - 1;
    });
  };

  const handleSharedNext = () => {
    setSharedCarouselIndex((prev) => {
      const maxStart = Math.max(0, sharedCommonFacilities.length - sharedVisibleCards);
      return prev >= maxStart ? 0 : prev + 1;
    });
  };

  return (
    <div className="facilities-page">
      <section className="facilities-one-section">
        <div className="facilities-shell">
          <header className="facilities-local-header">
            <Link to="/" className="facilities-local-logo">
              <img src={logoImage} alt="Sky Hostels" className="brand-logo-img" />
            </Link>
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
          </header>

          <div className="facilities-copy">
            <p className="facilities-eyebrow">About Us</p>
            <h1>DIRECTORS MESSAGE</h1>
          </div>

          <section className="director-message-section">
            <div className="director-message-grid">
              <div className="director-message-media">
                <img src={directorsMsgImage} alt="Director message" />
              </div>
              <div className="director-message-content">
                <p>
                  At SKY Hostels, our goal is to provide more than just accommodation - we provide
                  a safe, disciplined, and homely environment where students and working professionals
                  can focus on their goals without worries.
                </p>
                <p>
                  We are committed to maintaining high standards of hygiene, quality food, security,
                  and professional management. Your comfort and safety are our responsibility.
                </p>
                <p className="director-signoff">
                  Warm Regards,
                  <br />
                  Director
                  <br />
                  Sky Group
                </p>
              </div>
            </div>
          </section>

          <section className="director-message-section">
            <div className="director-message-content">
              <h2 className="director-message-heading about-sky-hostels-heading">ABOUT SKY HOSTELS</h2>
              <p>
                Sky Hostels PG is a premium boy&apos;s hostel located on Loni Kalbhor, Pune Solapur
                Highway, offering easy connectivity and a peaceful environment. We ensure luxury
                living with modern facilities, nutritious meals, and appropriate discipline.
              </p>
              <p>
                Our highly experienced management team is committed to assisting students with both
                their studies and accommodation needs.
              </p>
            </div>
          </section>

          <section className="vision-mission-section">
            <div className="vision-mission-grid">
              <div className="vision-mission-copy">
                <h2>Our Vision</h2>
                <ul>
                  <li>
                    To become the most trusted and student-friendly hostel brand in Pune, providing a
                    safe, comfortable, and inspiring living environment where students can focus on
                    their dreams, growth, and success.
                  </li>
                  <li>
                    We envision Sky Hostels as more than just accommodation - a home away from home
                    where students feel secure, supported, and motivated every single day.
                  </li>
                </ul>

                <h2>Our Mission</h2>
                <ul>
                  <li>Provide Safe &amp; Secure Living</li>
                  <li>Ensure Clean &amp; Comfortable Facilities</li>
                  <li>Serve Nutritious &amp; Homely Food</li>
                  <li>Create a Positive Student Community</li>
                  <li>Deliver Professional &amp; Transparent Management</li>
                </ul>
              </div>

              <div className="vision-mission-media">
                <img src={bedroomImage} alt="Sky Hostel room" className="vision-mission-main-image" />
                <img src={diningImage} alt="Sky Hostel dining area" className="vision-mission-overlay-image" />
              </div>
            </div>
          </section>

          <section className="key-amenities-section">
            <div className="key-amenities-shell">
              <h2 className="director-message-heading">KEY AMENITIES</h2>
              <div className="key-amenities-feature-grid">
                {keyAmenitiesHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article className="key-amenity-feature" key={item.title}>
                      <span className="key-amenity-feature-icon" aria-hidden="true">
                        <Icon size={36} />
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="shared-common-section">
            <div className="shared-common-shell">
              <h2 className="director-message-heading">SHARED &amp; COMMON FACILITIES</h2>
              <div className="shared-common-carousel">
                <div
                  className="shared-common-track"
                  style={{
                    transform: `translateX(-${sharedCarouselIndex * (100 / sharedVisibleCards)}%)`,
                    "--visible-cards": sharedVisibleCards
                  }}
                >
                  {sharedCommonFacilities.map((item) => (
                    <article className="shared-common-slide" key={item.title}>
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <div className="shared-common-overlay">
                        <h3>{item.title}</h3>
                      </div>
                    </article>
                  ))}
                </div>

                <button type="button" className="shared-common-nav prev" onClick={handleSharedPrev} aria-label="Previous facility">
                  &#8249;
                </button>
                <button type="button" className="shared-common-nav next" onClick={handleSharedNext} aria-label="Next facility">
                  &#8250;
                </button>
              </div>

              <div className="shared-common-dots" aria-hidden="true">
                {sharedCommonFacilities
                  .slice(0, Math.max(1, sharedCommonFacilities.length - sharedVisibleCards + 1))
                  .map((item, index) => (
                  <span
                    className={`shared-common-dot ${index === sharedCarouselIndex ? "active" : ""}`}
                    key={`${item.title}-dot`}
                  />
                  ))}
              </div>
            </div>
          </section>

          <section className="health-safety-section">
            <div className="health-safety-shell">
              <div className="health-safety-intro">
                <p className="health-safety-kicker">Resident Protection</p>
                <h2 className="health-safety-title">HEALTH &amp; SAFETY</h2>
                <p className="health-safety-lead">
                  Built for fast support, trusted supervision, and safer daily living.
                </p>
              </div>
              <div className="health-safety-grid">
                {healthSafetyHighlights.map((item, index) => (
                  <article className="health-safety-card" key={item.title}>
                    <span className="health-safety-count">{`0${index + 1}`}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="admission-procedure-section">
            <div className="admission-procedure-shell">
              <h2 className="director-message-heading">ADMISSION PROCEDURE</h2>
              <div className="admission-procedure-grid">
                {admissionProcedureSteps.map((item) => (
                  <article className="admission-step-card" key={item.step}>
                    <span className="admission-step-badge">Step {item.step}</span>
                    <h3>{item.title}</h3>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="docs-rules-section">
            <div className="docs-rules-shell">
              <article className="docs-rules-card docs-card">
                <div className="docs-rules-head">
                  <span className="docs-rules-icon" aria-hidden="true">
                    <FileText size={18} />
                  </span>
                  <h2>DOCUMENTS REQUIRED</h2>
                </div>
                <ul>
                  {documentsRequired.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="docs-rules-card rules-card">
                <div className="docs-rules-head">
                  <span className="docs-rules-icon" aria-hidden="true">
                    <ShieldCheck size={18} />
                  </span>
                  <h2>RULES &amp; DISCIPLINE</h2>
                </div>
                <ul>
                  {rulesDiscipline.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="hostel-policies-section">
            <div className="hostel-policies-shell">
              <h2 className="director-message-heading">HOSTEL POLICIES</h2>
              <div className="hostel-policies-grid">
                {hostelPolicies.map((policy) => (
                  <article className="hostel-policy-card" key={policy.code}>
                    <div className="hostel-policy-head">
                      <span className="hostel-policy-code">{policy.code}</span>
                      <h3>{policy.title}</h3>
                    </div>
                    <ul>
                      {policy.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

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
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>
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

export default About;
