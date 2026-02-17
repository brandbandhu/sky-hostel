import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { contactInfo } from '../data/mock';

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
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">SH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Sky Hostels</span>
                <span className="text-xs text-sky-400">Premium PG Living</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Comfort • Safety • Quality Living
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Policies</h3>
            <ul className="space-y-2">
              {policies.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-1" />
                <span className="text-slate-400 text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm">
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 Sky Hostels. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">
              Made with care for your comfort
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
