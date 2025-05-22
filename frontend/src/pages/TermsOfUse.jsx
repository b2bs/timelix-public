import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaGavel, FaUserShield, FaLock, FaFileAlt, FaExclamationTriangle, FaBan, FaBalanceScale, FaEnvelope } from 'react-icons/fa';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden animate-fade-in">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center mb-4">
              <FaInfoCircle className="mr-3 text-3xl" /> Termes d'Ús de Timelix
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-blue-100 leading-relaxed">
              Aquests Termes regulen l’ús de la nostra plataforma. Llegiu-los atentament per entendre els vostres drets i obligacions.
            </p>
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'70\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'1\' opacity=\'0.05\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
        </div>

        {/* Introducció i Acceptació */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-blue-100 p-8 rounded-3xl shadow-lg border border-blue-200 animate-slide-up">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaInfoCircle className="mr-2" /> Introducció
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Aquests Termes d’Ús (d’ara endavant, “Termes”) regulen l’accés i l’ús de Timelix, una plataforma per gestionar horaris, presència i informes. En utilitzar els nostres serveis, accepteu complir aquests Termes i les nostres polítiques associades, incloent la <Link to="/privacy" className="text-blue-600 hover:underline">Política de Privacitat</Link>. Si teniu dubtes, contacteu-nos abans de fer ús de la plataforma.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaUserShield className="mr-2" /> Acceptació dels Termes
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              En registrar-vos o utilitzar Timelix, confirmeu que heu llegit i accepteu aquests Termes. Si no esteu d’acord amb alguna part, us demanem que us abstingueu d’utilitzar la plataforma. L’ús continuat implica l’acceptació de qualsevol modificació futura d’aquests Termes.
            </p>
          </div>
        </div>

        {/* Ús Permesos i Prohibits */}
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-blue-100 relative overflow-hidden animate-scale-up">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaGavel className="mr-2" /> Ús Permesos i Prohibits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                <strong>Ús Permesos:</strong> Podeu utilitzar Timelix per gestionar horaris, registrar entrades i sortides, i generar informes dins de les funcionalitats proporcionades. Aquest ús està subjecte a complir amb la legislació vigent i aquests Termes.
              </p>
            </div>
            <div>
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
          <div className="absolute -top-10 -right-10 bg-blue-200 w-32 h-32 rounded-full opacity-10 animate-pulse-slow"></div>
        </div>

        {/* Propietat Intel·lectual i Responsabilitats */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-10 rounded-3xl shadow-lg animate-slide-right">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaLock className="mr-2" /> Propietat Intel·lectual
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Tots els continguts de Timelix, incloent codi, disseny, logotips, marques i documentació, són propietat exclusiva de Timelix S.L. o dels seus llicenciants. No es permet la reproducció, distribució, modificació o ús comercial sense autorització escrita prèvia. Els usuaris conserven la propietat de les dades que pugen a la plataforma, però atorguen a Timelix una llicència no exclusiva per utilitzar-les dins del servei.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaUserShield className="mr-2" /> Responsabilitats dels Usuaris
          </h2>
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

        {/* Limitació de Responsabilitat i Modificacions */}
        <div className="bg-blue-200 p-10 rounded-3xl shadow-xl animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaExclamationTriangle className="mr-2" /> Limitació de Responsabilitat
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Timelix no es farà responsable de danys indirectes, especials o conseqüents derivats de l’ús del servei, com pèrdues de dades, interrupcions del servei o errors tècnics, excepte quan sigui requerit per la llei. L’ús de Timelix és sota el vostre propi risc, i no garantim un servei lliure d’errors o ininterromput.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaFileAlt className="mr-2" /> Modificacions del Servei
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Ens reservem el dret de modificar, suspendre o interrompre qualsevol aspecte del servei en qualsevol moment, sense avís previ, per raons tècniques, legals o comercials. Notificarem els usuaris de canvis significatius quan sigui possible.
          </p>
        </div>

        {/* Rescissió i Llei Aplicable */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white p-8 rounded-3xl shadow-lg border border-blue-200 animate-slide-up">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaBan className="mr-2" /> Rescissió del Servei
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Podem suspendre o tancar el vostre compte si infringeix aquests Termes, si detectem un ús inadequat o per raons legals. En cas de rescissió, perdreu accés a les dades emmagatzemades, llevat que la llei disposi el contrari. Els usuaris poden tancar el seu compte en qualsevol moment contactant amb el suport.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
              <FaBalanceScale className="mr-2" /> Llei Aplicable
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Aquests Termes es regeixen per la legislació espanyola. Qualsevol disputa derivada d’aquests Termes serà resolta als tribunals de Barcelona, renunciant les parts a qualsevol altre fur.
            </p>
          </div>
        </div>

        {/* Contacte i Actualitzacions */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-10 rounded-3xl shadow-xl text-white animate-scale-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <FaEnvelope className="mr-2" /> Contacte i Actualitzacions
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-4">
            Per a dubtes sobre aquests Termes, podeu contactar-nos a <a href="mailto:support@timelix.com" className="text-blue-300 hover:underline">support@timelix.com</a>. Revisem i actualitzem periòdicament aquests Termes per adaptar-nos a noves regulacions o millores del servei.
          </p>
          <p className="text-blue-100 text-lg leading-relaxed">
            Última actualització: 15 de maig de 2025
          </p>
        </div>
      </div>
    </div>
  );
};

// Animacions CSS personalitzades
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
  .animate-fade-in { animation: fadeIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 1s ease-out; }
  .animate-scale-up { animation: scaleUp 1s ease-out; }
  .animate-slide-right { animation: slideRight 1s ease-out; }
  .animate-pulse-slow { animation: pulseSlow 3s infinite; }
  .animate-spin-slow { animation: spinSlow 20s linear infinite; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default TermsOfUse;
