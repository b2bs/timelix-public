import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo i text del footer */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/timelix.png" alt="Timelix Logo" className="h-8 w-auto" />
              <span className="text-white text-xl font-semibold tracking-tight">Timelix</span>
            </Link>
          </div>

          {/* Enllaços de navegació del footer */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex space-x-6">
              <Link to="/about" className="text-white hover:text-blue-200 transition duration-300">
                Sobre Nosaltres
              </Link>
              <Link to="/contacte" className="text-white hover:text-blue-200 transition duration-300">
                Contacte
              </Link>
              <Link to="/privacy" className="text-white hover:text-blue-200 transition duration-300">
                Política de Privacitat
              </Link>
              <Link to="/terms" className="text-white hover:text-blue-200 transition duration-300">
                Termes d'Ús
              </Link>
            </div>
          </div>

          {/* Contacte i xarxes socials */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2 text-blue-200">
              {/* Icona i email de contacte */}
              <FaEnvelope className="h-5 w-5" />
              <a href="mailto:support@timelix.com" className="hover:text-blue-100 transition duration-300">
                support@timelix.com
              </a>
            </div>
            <div className="flex space-x-4">
              {/* Enllaços a xarxes socials amb icones */}
              <a href="https://twitter.com/timelix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/timelix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/timelix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright amb l'any actual */}
        <div className="text-center text-sm text-blue-200 mt-6">
          © {new Date().getFullYear()} Timelix. Tots els drets reservats.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
