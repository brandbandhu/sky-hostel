import React from 'react';
import { MessageCircle } from 'lucide-react';
import { contactInfo } from '../data/mock';

const WhatsAppFloat = () => {
  return (
    <a
      href={contactInfo.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
    </a>
  );
};

export default WhatsAppFloat;
