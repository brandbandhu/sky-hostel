import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { contactInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isPropertiesPage = location.pathname === '/properties' || location.pathname.startsWith('/properties/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Our Properties' },
    { path: '/facilities-benefits', label: 'Facilities & Benefits' }
  ];

  const isActive = (path) => (path === '/properties' ? location.pathname.startsWith('/properties') : location.pathname === path);

  return (
    <header 
      className={`${isPropertiesPage ? 'relative' : 'fixed top-0 left-0 right-0'} z-50 transition-all duration-300 ${
        isPropertiesPage
          ? 'bg-[#eaf5ff] backdrop-blur-md shadow-[0_8px_24px_rgba(2,132,199,0.14)]'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-[1.35rem] sm:text-[1.6rem] lg:text-[1.9rem] tracking-[0.1em] font-semibold text-slate-900 leading-none uppercase">
              SKY <span className="font-normal text-slate-700">HOSTELS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-[0.98rem] font-normal transition-all duration-300 ${
                  isActive(link.path)
                    ? (isPropertiesPage ? 'text-sky-800 bg-transparent' : 'text-sky-600 bg-sky-50')
                    : (isPropertiesPage ? 'text-slate-700 hover:text-sky-700 bg-transparent hover:bg-transparent' : 'text-slate-700 hover:text-sky-600 hover:bg-sky-50/50')
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href={contactInfo.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-sky-500/50"
          >
            <Phone className="w-4 h-4" />
            <span>Book on WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-sky-50 transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t animate-in slide-in-from-top duration-300 ${
            isPropertiesPage ? 'border-sky-200 bg-[#eaf5ff]' : 'border-slate-200'
          }`}>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-[0.98rem] font-normal transition-all duration-300 ${
                    isActive(link.path)
                      ? (isPropertiesPage ? 'text-sky-800 bg-transparent' : 'text-sky-600 bg-sky-50')
                      : (isPropertiesPage ? 'text-slate-700 hover:text-sky-700 bg-transparent hover:bg-transparent' : 'text-slate-700 hover:text-sky-600 hover:bg-sky-50/50')
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-all duration-300 mt-4"
              >
                <Phone className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
