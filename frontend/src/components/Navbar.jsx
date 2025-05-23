import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Funció per tancar sessió: elimina la cookie del token, crida el callback d'onLogout, redirigeix a login i tanca el menú
  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    onLogout();
    navigate('/login');
    setIsOpen(false);
  };

  // Funció per alternar l'estat obert/tancat del menú per a pantalles petites
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo i text de la marca */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/timelix.png" alt="Timelix Logo" className="h-10 w-auto" />
              <span className="text-white text-2xl font-semibold tracking-tight">Timelix</span>
            </Link>
          </div>

          {/* Menú visible només en pantalles grans (md cap amunt) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Enllaços comuns a tots els usuaris */}
            <Link to="/" className="text-white hover:text-blue-200 transition duration-300">
              Inici
            </Link>
            <Link to="/about" className="text-white hover:text-blue-200 transition duration-300">
              Sobre Nosaltres
            </Link>
            <Link to="/contacte" className="text-white hover:text-blue-200 transition duration-300">
              Contacte
            </Link>

            {/* Enllaços només per a usuaris autenticats */}
            {user && (
              <>
                <Link to="/entrades-sortides" className="text-white hover:text-blue-200 transition duration-300">
                  Entrades i Sortides
                </Link>
                <Link to="/horaris" className="text-white hover:text-blue-200 transition duration-300">
                  Horaris
                </Link>
              </>
            )}

            {/* Enllaços només per a administradors (rol_id === 1) */}
            {user && user.rol_id === 1 && (
              <Link to="/usuaris" className="text-white hover:text-blue-200 transition duration-300">
                Gestió d'Usuaris
              </Link>
            )}

            {/* Enllaços d'autenticació depenent de si l'usuari està autenticat */}
            {user ? (
              <>
                <Link to="/profile" className="text-white hover:text-blue-200 transition duration-300">
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200 transition duration-300"
                >
                  Tancar Sessió
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 transition duration-300">
                  Iniciar Sessió
                </Link>
                <Link to="/register" className="text-white hover:text-blue-200 transition duration-300">
                  Registrar-se
                </Link>
              </>
            )}
          </div>

          {/* Botó per obrir/tancar el menú en pantalles petites */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Icona canviant segons l'estat del menú (hamburguesa o creu) */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable per a pantalles petites quan isOpen és true */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Enllaços comuns */}
            <Link
              to="/"
              onClick={toggleMenu}
              className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Inici
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Sobre Nosaltres
            </Link>
            <Link
              to="/contacte"
              onClick={toggleMenu}
              className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Contacte
            </Link>

            {/* Enllaços només per a usuaris autenticats */}
            {user && (
              <>
                <Link
                  to="/entrades-sortides"
                  onClick={toggleMenu}
                  className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Entrades i Sortides
                </Link>
                <Link
                  to="/horaris"
                  onClick={toggleMenu}
                  className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Horaris
                </Link>
              </>
            )}

            {/* Enllaços només per a administradors */}
            {user && user.rol_id === 1 && (
              <Link
                to="/usuaris"
                onClick={toggleMenu}
                className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
              >
                Gestió d'Usuaris
              </Link>
            )}

            {/* Enllaços d'autenticació en menú mòbil */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Tancar Sessió
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Iniciar Sessió
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="block text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Registrar-se
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
