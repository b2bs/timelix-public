import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  // Estat per controlar si el banner és visible o no
  const [isVisible, setIsVisible] = useState(false);
  // Estat per mostrar o ocultar la configuració avançada de preferències
  const [showSettings, setShowSettings] = useState(false);
  // Estat per guardar les preferències de cookies de l'usuari
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,      // Cookies essencials sempre activades
    analytics: false,     // Cookies d'anàlisi desactivades per defecte
    marketing: false,     // Cookies de màrqueting desactivades per defecte
    functionality: false, // Cookies de funcionalitat desactivades per defecte
  });

  // Efecte que es dispara un cop el component es munta
  // Comprova si ja hi ha un consentiment guardat, si no, mostra el banner
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  // Funció per guardar les preferències seleccionades a localStorage i ocultar el banner
  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
    setIsVisible(false);
  };

  // Funció per acceptar totes les cookies i desar-ho
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

  // Funció per rebutjar totes menys les essencials i desar-ho
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

  // Gestor de canvi de les preferències quan l'usuari marca o desmarca una checkbox
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setCookiePreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Si el banner no ha de ser visible, no renderitzem res
  if (!isVisible) return null;

  return (
    // Contenidor principal fixat a la part inferior de la pantalla
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 text-white p-4 sm:p-6 z-50 w-full max-h-[80vh] overflow-y-auto">
      {!showSettings ? (
        // Vista principal amb missatge i botons Acceptar, Rebutjar i Personalitzar
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
            {/* Botó per acceptar totes les cookies */}
            <button
              onClick={acceptAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Acceptar
            </button>
            {/* Botó per rebutjar totes menys les essencials */}
            <button
              onClick={rejectAll}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Rebutjar
            </button>
            {/* Botó per mostrar la configuració avançada */}
            <button
              onClick={() => setShowSettings(true)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Personalitzar
            </button>
          </div>
        </div>
      ) : (
        // Vista de configuració de preferències amb checkboxes i botons per desar o tornar enrere
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold">Configura les teves preferències de cookies</h3>
          <div className="space-y-3">
            {/* Checkbox per a cookies essencials, sempre activada i deshabilitada */}
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
            {/* Checkbox per a cookies d’anàlisi */}
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
            {/* Checkbox per a cookies de màrqueting */}
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
            {/* Checkbox per a cookies de funcionalitat */}
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
          {/* Botons per desar preferències o tornar a la vista principal */}
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
