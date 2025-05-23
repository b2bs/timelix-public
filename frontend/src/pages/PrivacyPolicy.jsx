import React, { useState } from 'react';
import { FaInfoCircle, FaLock, FaUserShield, FaEnvelope, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const PrivacyPolicy = () => {
  // Estat per controlar quines seccions estan obertes o tancades
  const [openSections, setOpenSections] = useState({});

  // Funció per alternar l'estat obert/tancat d'una secció concreta
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Definició de les seccions amb contingut, icones i estil de fons
  const sections = [
    {
      id: 'introduccio',
      title: 'Introducció',
      icon: <FaInfoCircle className="mr-2" />,
      content: (
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Aquesta Política de Privacitat explica com Timelix S.L. recull, utilitza, emmagatzema i protegeix les teves dades personals. Ens comprometem a garantir la teva privacitat i a complir amb la legislació europea, especialment el RGPD, així com altres normatives aplicables.
        </p>
      ),
      bgClass: 'bg-white border border-blue-200',
    },
    {
      id: 'recollida-dades',
      title: 'Recollida de Dades Personals',
      icon: <FaUserShield className="mr-2" />,
      content: (
        <>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
            Recollim les següents dades personals quan interactues amb la nostra plataforma:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Correu electrònic i contrasenya (per a l’autenticació).</li>
            <li>Informació del perfil (nom, cognoms, si es proporciona).</li>
            <li>Dades d’ús (horaris, entrades i sortides registrades).</li>
            <li>Dades tècniques (adreça IP, tipus de dispositiu i navegador).</li>
          </ul>
        </>
      ),
      bgClass: 'bg-blue-50',
    },
    {
      id: 'finalitat-dades',
      title: 'Finalitat de la Recollida de Dades',
      icon: <FaLock className="mr-2" />,
      content: (
        <>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
            Les dades personals es processen per a:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Gestionar el teu accés i ús de Timelix (registre, horaris).</li>
            <li>Protegir la seguretat dels teus comptes.</li>
            <li>Millorar els nostres serveis basant-nos en l’ús.</li>
            <li>Enviar notificacions administratives (si cal).</li>
          </ul>
        </>
      ),
      bgClass: 'bg-white border border-blue-200',
    },
    {
      id: 'us-dades',
      title: 'Ús de les Dades',
      icon: <FaLock className="mr-2" />,
      content: (
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Les teves dades només s’utilitzen per als propòsits especificats. No les compartim per a màrqueting ni finalitats comercials sense el teu consentiment explícit.
        </p>
      ),
      bgClass: 'bg-blue-50',
    },
    {
      id: 'comparticio-dades',
      title: 'Compartició de Dades',
      icon: <FaUserShield className="mr-2" />,
      content: (
        <>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
            No compartim les teves dades amb tercers excepte:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Proveïdors de serveis (ex.: hosting, autenticació) sota acords de confidencialitat.</li>
            <li>Quan ho exigeixi la llei o una autoritat competent.</li>
          </ul>
        </>
      ),
      bgClass: 'bg-white border border-blue-200',
    },
    {
      id: 'emmagatzematge-seguretat',
      title: 'Emmagatzematge i Seguretat',
      icon: <FaLock className="mr-2" />,
      content: (
        <>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
            Les teves dades es guarden en servidors segurs amb:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Xifratge SSL/TLS per a dades en trànsit.</li>
            <li>Encriptació AES-256 per a dades emmagatzemades.</li>
            <li>Controls d’accés i audits periòdics.</li>
          </ul>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Les dades es conserven només el temps necessari o segons la legislació aplicable.
          </p>
        </>
      ),
      bgClass: 'bg-blue-50',
    },
    {
      id: 'drets-usuaris',
      title: 'Els teus Drets',
      icon: <FaUserShield className="mr-2" />,
      content: (
        <>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
            Sota el RGPD, tens els següents drets:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Accedir a les teves dades personals.</li>
            <li>Rectificar dades incorrectes.</li>
            <li>Demanar la supressió de les teves dades.</li>
            <li>Oposar-te a certs processaments.</li>
            <li>Sol·licitar la portabilitat de les teves dades.</li>
          </ul>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Per exercir aquests drets, contacta-nos a{' '}
            <a href="mailto:support@timelix.com" className="text-blue-600 hover:underline">support@timelix.com</a>.
          </p>
        </>
      ),
      bgClass: 'bg-white border border-blue-200',
    },
    {
      id: 'galetes-seguiment',
      title: 'Galetes i Seguiment',
      icon: <FaLock className="mr-2" />,
      content: (
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Utilitzem una cookie essencial <strong>'token'</strong> per a l’autenticació segura. No utilitzem cookies de màrqueting ni anàlisi actualment, però si n’afegim, t’ho notificarem i podràs gestionar-les.
        </p>
      ),
      bgClass: 'bg-blue-50',
    },
    {
      id: 'contacte',
      title: 'Contacte',
      icon: <FaEnvelope className="mr-2" />,
      content: (
        <>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
            Si tens dubtes sobre la nostra política o les teves dades:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>
              Email:{' '}
              <a href="mailto:support@timelix.com" className="text-blue-600 hover:underline">support@timelix.com</a>
            </li>
            <li>Adreça: Carrer Fictici 123, 08001 Barcelona, Espanya</li>
          </ul>
        </>
      ),
      bgClass: 'bg-white border border-blue-200',
    },
    {
      id: 'actualitzacions',
      title: 'Actualitzacions',
      icon: <FaClock className="mr-2" />,
      content: (
        <>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Podem actualitzar aquesta política segons sigui necessari. Els canvis es publicaran aquí i et notificarà per correu si són significatius.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4">
            Última actualització: 15 de maig de 2025, 18:45 CEST
          </p>
        </>
      ),
      bgClass: 'bg-blue-50',
    },
  ];

  return (
    // Contenidor principal amb fons i espaiats, amb overflow ocult per evitar scroll inesperat durant animacions
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Fons decoratiu amb animació de rotació lenta */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'80\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'2\' opacity=\'0.1\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
      {/* Contingut central amb amplada màxima i espai entre seccions */}
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Secció principal amb títol i subtítol */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center mb-4">
            <FaInfoCircle className="mr-3 text-3xl" /> Política de Privacitat de Timelix
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-blue-100 leading-relaxed">
            Descobreix com protegim les teves dades personals i complim amb el Reglament General de Protecció de Dades (RGPD).
          </p>
        </div>

        {/* Llista de seccions desplegables */}
        {sections.map((section) => (
          <div
            key={section.id}
            className={`p-4 sm:p-6 rounded-2xl shadow-md ${section.bgClass} animate-slide-up`}
          >
            {/* Botó per obrir/tancar la secció, accessible amb teclat */}
            <button
              onClick={() => toggleSection(section.id)}
              onKeyDown={(e) => ['Enter', ' '].includes(e.key) && toggleSection(section.id)}
              className="w-full flex items-center justify-between text-left text-2xl font-bold text-blue-700 focus:outline-none"
              aria-expanded={!!openSections[section.id]}
              aria-controls={`section-${section.id}`}
            >
              {/* Icona i títol de la secció */}
              <span className="flex items-center">
                {section.icon}
                {section.title}
              </span>
              {/* Icona que indica l'estat de la secció (oberta o tancada) */}
              {openSections[section.id] ? (
                <FaChevronUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              ) : (
                <FaChevronDown className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              )}
            </button>
            {/* Contingut visible només si la secció està oberta */}
            {openSections[section.id] && (
              <div
                id={`section-${section.id}`}
                className="mt-4 animate-slide-down"
              >
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Animacions CSS definides com a text i injectades al document
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideDown {
    from { max-height: 0; opacity: 0; overflow: hidden; }
    to { max-height: 1000px; opacity: 1; overflow: visible; }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-fade-in { animation: fadeIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 1s ease-out; }
  .animate-slide-right { animation: slideRight 1s ease-out; }
  .animate-slide-down { animation: slideDown 0.4s ease-out; }
  .animate-spin-slow { animation: spinSlow 20s linear infinite; }
`;

// Creació i inserció de l'estil en el capçalera del document per a les animacions
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default PrivacyPolicy;
