// components/Footer.jsx
"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Footer = ({ settings }) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    setShowScrollToTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-blue-500 text-white py-6 relative">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <div className="mb-4 md:mb-0">
          <span className="ml-2">&copy; {settings.name || 'Evelocore'} | 2024</span>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <Image src="/copyright.png" alt="Copyright" width={30} height={30} />
          <span className="ml-2">Powered by Evelocore</span>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex space-x-4 mb-4 md:mb-0 px-2">
          <a href={
            "https://wa.me/"+(
                String(settings.hotline).replace(/ /gi,'').startsWith('7') ? 
                '94'+(String(settings.hotline).replace(/ /gi,'')) : 
                '94'+(String(settings.hotline).replace(/ /gi,'').replace("0",'').replace("94",''))
                )
          } target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-transform transform hover:scale-110">
            <i className="fa-brands fa-whatsapp fa-lg"></i>
          </a>
          <a href="https://t.me/kumuthu" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-transform transform hover:scale-110">
            <i className="fa-brands fa-telegram fa-lg"></i>
          </a>
          <a href="https://web.facebook.com/sagarika.uduwavidana" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-transform transform hover:scale-110">
            <i className="fa-brands fa-facebook fa-lg"></i>
          </a>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <a 
            href={settings.location_map}
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:underline transition-transform transform hover:scale-105 border border-white px-3 py-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fa-solid fa-map-marker-alt"></i>
            <span>Location</span>
          </a>
        </div>
        <div className="text-center">
          <a 
            href={
                "https://wa.me/"+(
                    String(settings.hotline).replace(/ /gi,'').startsWith('7') ? 
                    '94'+(String(settings.hotline).replace(/ /gi,'')) : 
                    '94'+(String(settings.hotline).replace(/ /gi,'').replace("0",'').replace("94",''))
                    )
              } 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:underline transition-transform transform hover:scale-105"
          >
            Hotline
          </a>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <form className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Customer feedback" 
              className="p-2 mb-4 text-black md:mb-0 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button 
              type="submit" 
              className="mx-3 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      )}
    </footer>
  );
};

export default Footer;
