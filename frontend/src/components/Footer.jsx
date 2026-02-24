import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { contactInfo } from '../data/mock';
import logoImage from '../assets/images/logo.png';

const INSTAGRAM_LINK = 'https://www.instagram.com/skyhostels4u/';
const FACEBOOK_LINK = 'https://www.facebook.com/profile.php?id=61588214504098';
const REGISTRATION_FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSdu8fzkKVPr2MXzm_d7p04J7WF9z6CQbDbJV9V1QKr1iP9F6g/viewform?usp=header';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/facilities-benefits', label: 'Facilities & Benefits' },
    { path: '/pricing', label: 'Pricing' }
  ];

  const policies = [
    { path: '/admission-policy', label: 'Admission Policy' },
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms & Conditions' },
    { path: '/refund-policy', label: 'Refund Policy' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="Sky Hostels" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Sky Hostels</span>
                <span className="text-xs text-sky-400">Premium PG Living</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">Comfort • Safety • Quality Living</p>
            <div className="flex space-x-3 items-center">
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors duration-300" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors duration-300" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={REGISTRATION_FORM_LINK} target="_blank" rel="noopener noreferrer" className="px-3 h-10 bg-sky-500 hover:bg-sky-600 rounded-lg inline-flex items-center justify-center text-xs font-semibold transition-colors duration-300">
                Google Form
              </a>
            </div>
            
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Policies</h3>
            <ul className="space-y-2">
              {policies.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-1" />
                <span className="text-slate-400 text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">© 2026 Sky Hostels. All rights reserved.</p>
            <p className="text-slate-400 text-sm">Made with care for your comfort</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


