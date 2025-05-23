import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaGavel, FaUserShield, FaLock, FaFileAlt, FaExclamationTriangle, FaBan, FaBalanceScale, FaEnvelope } from 'react-icons/fa';

const TermsOfUse = () => {
  return (
    // Contenidor principal amb fons blau clar i espaiats verticals
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Secció hero amb degradat blau, text blanc i animació d’aparició */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden animate-fade-in">
          <div className="relative z-10">
            {/* Títol principal amb icona */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center mb-4">
              <FaInfoCircle className="mr-3 text-3xl" /> Termes d'Ús de Timelix
            </h1>
            {/* Descripció breu sota el títol */}
            <p className="text-lg md:text-xl max-w-2xl text-blue-100 leading-relaxed">
              Aquests Termes regulen l’ús de la nostra plataforma. Llegiu-los atentament per entendre els vostres drets i obligacions.
            </p>
          </div>
          {/* Fons decoratiu SVG amb animació de gir lent */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'70\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'1\' opacity=\'0.05\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
        </div>

        {/* Secció d’introducció i acceptació dividida en dues columnes en pantalles grans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-blue-100 p-8 rounded-3xl shadow-lg border border-blue-200 animate-slide-up">
          <div>
            {/* Títol de la introducció amb icona */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaInfoCircle className="mr-2" /> Introducció
            </h2>
            {/* Text explicatiu amb enllaç a política de privacitat */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Aquests Termes d’Ús (d’ara endavant, “Termes”) regulen l’accés i l’ús de Timelix, una plataforma per gestionar horaris, presència i informes. En utilitzar els nostres serveis, accepteu complir aquests Termes i les nostres polítiques associades, incloent la <Link to="/privacy" className="text-blue-600 hover:underline">Política de Privacitat</Link>. Si teniu dubtes, contacteu-nos abans de fer ús de la plataforma.
            </p>
          </div>
          <div>
            {/* Títol de l’acceptació dels termes amb icona */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaUserShield className="mr-2" /> Acceptació dels Termes
            </h2>
            {/* Text sobre acceptació i responsabilitat */}
            <p className="text-gray-600 text-lg leading-relaxed">
              En registrar-vos o utilitzar Timelix, confirmeu que heu llegit i accepteu aquests Termes. Si no esteu d’acord amb alguna part, us demanem que us abstingueu d’utilitzar la plataforma. L’ús continuat implica l’acceptació de qualsevol modificació futura d’aquests Termes.
            </p>
          </div>
        </div>

        {/* Secció d’ús permès i prohibit */}
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-blue-100 relative overflow-hidden animate-scale-up">
          {/* Títol amb icona */}
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaGavel className="mr-2" /> Ús Permesos i Prohibits
          </h2>
          {/* Contingut dividit en dues columnes en pantalles mitjanes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Ús permès */}
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                <strong>Ús Permesos:</strong> Podeu utilitzar Timelix per gestionar horaris, registrar entrades i sortides, i generar informes dins de les funcionalitats proporcionades. Aquest ús està subjecte a complir amb la legislació vigent i aquests Termes.
              </p>
            </div>
            <div>
              {/* Ús prohibit amb llista de punts */}
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                <strong>Ús Prohibits:</strong> Està estrictament prohibit:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Realitzar activitats il·legals o fraudulentes.</li>
                <li>Intentar accedir a dades o comptes no autoritzats.</li>
                <li>Sobrecarregar o danyar la plataforma (ex.: atacs DDoS).</li>
                <li>Utilitzar Timelix per enviar contingut maliciós o spam.</li>
              </ul>
            </div>
          </div>
          {/* Element decoratiu circular amb animació de pulsació */}
          <div className="absolute -top-10 -right-10 bg-blue-200 w-32 h-32 rounded-full opacity-10 animate-pulse-slow"></div>
        </div>

        {/* Secció de propietat intel·lectual i responsabilitats */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-10 rounded-3xl shadow-lg animate-slide-right">
          {/* Títol de propietat intel·lectual amb icona */}
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaLock className="mr-2" /> Propietat Intel·lectual
          </h2>
          {/* Text explicatiu de propietat */}
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Tots els continguts de Timelix, incloent codi, disseny, logotips, marques i documentació, són propietat exclusiva de Timelix S.L. o dels seus llicenciants. No es permet la reproducció, distribució, modificació o ús comercial sense autorització escrita prèvia. Els usuaris conserven la propietat de les dades que pugen a la plataforma, però atorguen a Timelix una llicència no exclusiva per utilitzar-les dins del servei.
          </p>
          {/* Títol de responsabilitats amb icona */}
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaUserShield className="mr-2" /> Responsabilitats dels Usuaris
          </h2>
          {/* Text i llista de responsabilitats */}
          <p className="text-gray-600 text-lg leading-relaxed">
            Els usuaris són responsables de:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
            <li>Mantenir la confidencialitat de les seves credencials d’accés.</li>
            <li>Garantir que l’ús de Timelix compleixi amb la legislació aplicable.</li>
            <li>Notificar immediatament qualsevol accés no autoritzat al seu compte.</li>
            <li>Proporcionar informació precisa i actualitzada durant el registre.</li>
          </ul>
        </div>

        {/* Secció de limitació de responsabilitat i modificacions */}
        <div className="bg-blue-200 p-10 rounded-3xl shadow-xl animate-fade-in">
          {/* Títol de limitació amb icona */}
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaExclamationTriangle className="mr-2" /> Limitació de Responsabilitat
          </h2>
          {/* Text explicatiu */}
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Timelix no es farà responsable de danys indirectes, especials o conseqüents derivats de l’ús del servei, com pèrdues de dades, interrupcions del servei o errors tècnics, excepte quan sigui requerit per la llei. L’ús de Timelix és sota el vostre propi risc, i no garantim un servei lliure d’errors o ininterromput.
          </p>
          {/* Títol de modificacions amb icona */}
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaFileAlt className="mr-2" /> Modificacions del Servei
          </h2>
          {/* Text explicatiu */}
          <p className="text-gray-600 text-lg leading-relaxed">
            Ens reservem el dret de modificar, suspendre o interrompre qualsevol aspecte del servei en qualsevol moment, sense avís previ, per raons tècniques, legals o comercials. Notificarem els usuaris de canvis significatius quan sigui possible.
          </p>
        </div>

        {/* Secció de rescissió i llei aplicable dividida en dues columnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white p-8 rounded-3xl shadow-lg border border-blue-200 animate-slide-up">
          <div>
            {/* Títol de rescissió amb icona */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaBan className="mr-2" /> Rescissió del Servei
            </h2>
            {/* Text explicatiu */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Podem suspendre o tancar el vostre compte si infringeix aquests Termes, si detectem un ús inadequat o per raons legals. En cas de rescissió, perdreu accés a les dades emmagatzemades, llevat que la llei disposi el contrari. Els usuaris poden tancar el seu compte en qualsevol moment contactant amb el suport.
            </p>
          </div>
          <div>
            {/* Títol de llei aplicable amb icona */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaBalanceScale className="mr-2" /> Llei Aplicable
            </h2>
            {/* Text explicatiu */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Aquests Termes es regeixen per la legislació espanyola. Qualsevol disputa derivada d’aquests Termes serà resolta als tribunals de Barcelona, renunciant les parts a qualsevol altre fur.
            </p>
          </div>
        </div>

        {/* Secció de contacte i actualitzacions amb fons degradat blau */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-10 rounded-3xl shadow-xl text-white animate-scale-up">
          {/* Títol de contacte amb icona */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <FaEnvelope className="mr-2" /> Contacte i Actualitzacions
          </h2>
          {/* Text amb correu electrònic de contacte */}
          <p className="text-blue-100 text-lg leading-relaxed mb-4">
            Per a dubtes sobre aquests Termes, podeu contactar-nos a <a href="mailto:support@timelix.com" className="text-blue-300 hover:underline">support@timelix.com</a>. Revisem i actualitzem periòdicament aquests Termes per adaptar-nos a noves regulacions o millores del servei.
          </p>
          {/* Data de l’última actualització */}
          <p className="text-blue-100 text-lg leading-relaxed">
            Última actualització: 15 de maig de 2025
          </p>
        </div>
      </div>
    </div>
  );
};

// Animacions CSS personalitzades per a diferents efectes visuals
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); }
    to { transform: scale(1.05); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  // Classes per aplicar les animacions amb durades i funcions d’animació definides
  .animate-fade-in { animation: fadeIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 1s ease-out; }
  .animate-scale-up { animation: scaleUp 1s ease-out; }
  .animate-slide-right { animation: slideRight 1s ease-out; }
  .animate-pulse-slow { animation: pulseSlow 3s infinite; }
  .animate-spin-slow { animation: spinSlow 20s linear infinite; }
`;

// Afegim les animacions al document dinàmicament
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default TermsOfUse;
