// Component React per a la pàgina "Sobre Timelix"
import React from 'react';
import { FaInfoCircle, FaBullseye, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaLock } from 'react-icons/fa'; // Icones utilitzades

// Component About, mostra informació sobre la plataforma
const About = () => (
  <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"> // Contenidor principal amb fons blau clar i padding responsiu
    <div className="max-w-7xl mx-auto space-y-16"> // Centra contingut amb amplada màxima i espaiat vertical
      {/* Secció Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden animate-fade-in"> // Capçalera amb gradient, text blanc i animació
        <div className="relative z-10"> // Contingut amb z-index per sobre del fons decoratiu
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center mb-4"> // Títol principal responsiu
            <FaInfoCircle className="mr-3 text-3xl" /> Sobre Timelix
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-blue-100 leading-relaxed"> // Descripció breu de la plataforma
            Descobreix l’essència de Timelix, una plataforma innovadora creada per revolucionar la gestió del temps en empreses de totes mides.
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20 animate-spin-slow"></div> // Fons decoratiu amb cercle animat
      </div>

      {/* Secció Qui Som */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-blue-100 p-8 rounded-3xl shadow-lg border border-blue-200 animate-slide-up"> // Graella responsiva amb fons blau clar i animació
        <div> // Columna de text
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center"> // Subtítol
            <FaUsers className="mr-2" /> Qui Som
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed"> // Descripció de l'equip
            Som un equip apassionat per la tecnologia i l’optimització de recursos humans. Amb anys d’experiència en solucions digitals, hem desenvolupat Timelix per abordar les necessitats reals de les empreses, oferint una eina segura, adaptable i fàcil d’utilitzar. Des del nostre inici, el nostre objectiu ha estat empoderar organitzacions amb eines que millorin la productivitat i simplifiquin la gestió del temps.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Citació amb efecte hover
          <p className="text-gray-700 italic text-base"> // Cita de la visió
            “La nostra visió és crear un entorn laboral més organitzat i eficient per a tothom.”
          </p>
        </div>
      </div>

      {/* Secció Missió */}
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-blue-100 relative overflow-hidden animate-scale-up"> // Secció amb fons blanc i animació d'escala
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center"> // Subtítol
          <FaBullseye className="mr-2" /> La Nostra Missió
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6"> // Descripció de la missió
          A Timelix, la nostra missió és simplificar la gestió de recursos humans amb una plataforma integral que organitzi horaris, registri presència i faciliti la presa de decisions. Volem ser el teu aliat per reduir càrregues administratives i fomentar un entorn col·laboratiu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> // Llista d'objectius
          <div className="flex items-center text-blue-700"> // Objectiu 1
            <FaChartLine className="mr-3 text-2xl" />
            <span className="text-lg">Optimització de recursos</span>
          </div>
          <div className="flex items-center text-blue-700"> // Objectiu 2
            <FaLock className="mr-3 text-2xl" />
            <span className="text-lg">Privadesa garantida</span>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 bg-blue-200 w-32 h-32 rounded-full opacity-10 animate-pulse-slow"></div> // Decoració amb cercle animat
      </div>

      {/* Secció Funcions Clau */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-10 rounded-3xl shadow-lg animate-slide-right"> // Secció amb gradient i animació
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center"> // Subtítol
          <FaClock className="mr-2" /> Les Nostres Funcions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> // Graella de funcions
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Funció 1
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Gestió d’Usuaris</h3>
            <p className="text-gray-600 text-base">Rols diferenciats per Administradors i Treballadors amb accés controlat.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Funció 2
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Horaris Personalitzats</h3>
            <p className="text-gray-600 text-base">Assigna i edita torns diaris, setmanals o mensuals amb facilitat.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Funció 3
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Registre de Presència</h3>
            <p className="text-gray-600 text-base">Entrades i sortides en temps real amb precisió garantida.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Funció 4
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Informes Avançats</h3>
            <p className="text-gray-600 text-base">Exporta dades a PDF o Excel per a anàlisis detallades.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Funció 5
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Accés Multiplataforma</h3>
            <p className="text-gray-600 text-base">Funciona perfectament en qualsevol dispositiu.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Funció 6
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Notificacions</h3>
            <p className="text-gray-600 text-base">Recordatoris automàtics i alertes per a administradors.</p>
          </div>
        </div>
        <p className="text-gray-600 text-lg mt-6 leading-relaxed"> // Futurs desenvolupaments
          Amb futures integracions com calendaris externs i anàlisi predictiva, Timelix continuarà evolucionant per adaptar-se als teus necessitats.
        </p>
      </div>

      {/* Secció Per què Timelix */}
      <div className="bg-blue-200 p-10 rounded-3xl shadow-xl animate-fade-in"> // Secció amb fons blau i animació
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center"> // Subtítol
          <FaCheckCircle className="mr-2" /> Per què Timelix?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> // Graella de raons
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Raó 1
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Facilitat d’Ús</h3>
            <p className="text-gray-600 text-base">Interfície intuïtiva per a tots els nivells tècnics.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Raó 2
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Seguretat</h3>
            <p className="text-gray-600 text-base">Encriptació i protecció avançada de dades.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Raó 3
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Personalització</h3>
            <p className="text-gray-600 text-base">Adapta la plataforma a les teves necessitats.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Raó 4
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Suport</h3>
            <p className="text-gray-600 text-base">Assistència personalitzada 24/7.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> // Raó 5
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Escalabilitat</h3>
            <p className="text-gray-600 text-base">Crec amb el teu negoci sense límits.</p>
          </div>
        </div>
        <p className="text-gray-700 text-lg mt-6 leading-relaxed"> // Crida a l'acció
          Uneix-te a empreses que confien en nosaltres per transformar la gestió del temps. Contacta’ns per descobrir com!
        </p>
      </div>
    </div>
  </div>
);

// Animacions CSS personalitzades
const styles = `
  @keyframes fadeIn { // Animació d'esvaïment
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp { // Animació de desplaçament cap amunt
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes scaleUp { // Animació d'escala
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes slideRight { // Animació de desplaçament cap a la dreta
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes pulseSlow { // Animació de pols lent
    0%, 100% { transform: scale(1); }
    to { transform: scale(1.05); }
  }
  @keyframes spinSlow { // Animació de rotació lenta
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-fade-in { animation: fadeIn 1s ease-out; } // Classe per animació d'esvaïment
  .animate-slide-up { animation: slideUp 1s ease-out; } // Classe per animació de desplaçament cap amunt
  .animate-scale-up { animation: scaleUp 1s ease-out; } // Classe per animació d'escala
  .animate-slide-right { animation: slideRight 1s ease-out; } // Classe per animació de desplaçament cap a la dreta
  .animate-pulse-slow { animation: pulseSlow 3s infinite; } // Classe per animació de pols lent
  .animate-spin-slow { animation: spinSlow 20s linear infinite; } // Classe per animació de rotació lenta
`;

// Afegeix els estils al document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Exporta el component
export default About;