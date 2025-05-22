import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    functionality: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
    setIsVisible(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functionality: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setCookiePreferences(allAccepted);
    setIsVisible(false);
  };

  const rejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functionality: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setCookiePreferences(essentialOnly);
    setIsVisible(false);
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setCookiePreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 text-white p-4 sm:p-6 z-50 w-full max-h-[80vh] overflow-y-auto">
      {!showSettings ? (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="text-xs sm:text-sm md:text-base text-left w-full">
            <p>
              Utilitzem cookies essencials per autenticar sessions i garantir el funcionament de Timelix. Pots acceptar-les o personalitzar les teves preferències si afegeixes altres tipus de cookies en el futur. Consulta la nostra{' '}
              <Link to="/privacy" className="text-blue-300 hover:underline">
                Política de Privacitat
              </Link>{' '}
              per a més informació.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={acceptAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Acceptar
            </button>
            <button
              onClick={rejectAll}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Rebutjar
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Personalitzar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold">Configura les teves preferències de cookies</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="essential"
                checked={cookiePreferences.essential}
                disabled
                className="h-5 w-5 text-blue-600 mt-1"
              />
              <div>
                <p className="font-medium text-sm sm:text-base">Cookies essencials</p>
                <p className="text-xs sm:text-sm text-gray-300">
                  Necessàries per al funcionament del lloc (ex.: autenticació de sessions). No es poden desactivar.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="analytics"
                checked={cookiePreferences.analytics}
                onChange={handlePreferenceChange}
                className="h-5 w-5 text-blue-600 mt-1"
              />
              <div>
                <p className="font-medium text-sm sm:text-base">Cookies d’anàlisi</p>
                <p className="text-xs sm:text-sm text-gray-300">
                  Recullen dades d’ús per millorar el lloc (ex.: Google Analytics).
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="marketing"
                checked={cookiePreferences.marketing}
                onChange={handlePreferenceChange}
                className="h-5 w-5 text-blue-600 mt-1"
              />
              <div>
                <p className="font-medium text-sm sm:text-base">Cookies de màrqueting</p>
                <p className="text-xs sm:text-sm text-gray-300">
                  S’utilitzen per mostrar anuncis personalitzats.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="functionality"
                checked={cookiePreferences.functionality}
                onChange={handlePreferenceChange}
                className="h-5 w-5 text-blue-600 mt-1"
              />
              <div>
                <p className="font-medium text-sm sm:text-base">Cookies de funcionalitat</p>
                <p className="text-xs sm:text-sm text-gray-300">
                  Milloren l’experiència, com recordar preferències de llengua.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={savePreferences}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Desar preferències
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Tornar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
