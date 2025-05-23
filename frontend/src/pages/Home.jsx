// Component React per a la pàgina principal de Timelix
import React from 'react';
import { FaSignInAlt, FaUserPlus, FaCalendarAlt, FaClock, FaFileAlt, FaChartBar, FaShieldAlt, FaUsers, FaStar, FaQuestionCircle, FaRocket, FaChartLine, FaLink, FaMoneyCheckAlt, FaInfoCircle } from 'react-icons/fa'; // Icones utilitzades

// Component Home, rep l'usuari com a prop
const Home = ({ user }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden"> // Contenidor principal amb gradient de fons i sense desbordament
    {/* Secció Hero */}
    <section className="min-h-[80vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 relative overflow-hidden"> // Secció inicial amb gradient, text blanc i alçada mínima
      <div className="px-6 md:px-12 relative z-10"> // Contingut centrat amb padding responsiu i z-index
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in"> // Títol principal amb benvinguda personalitzada
          Benvingut{user ? `, ${user.nom}` : ''} a Timelix
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-blue-100 mb-10 animate-slide-up"> // Descripció de Timelix
          Timelix és la teva eina definitiva per optimitzar la gestió del temps. Gestiona horaris, controla presència en temps real, genera informes en PDF i assegura la privadesa amb un sistema avançat de consentiment de cookies. Desplegada en Kubernetes per a màxima fiabilitat.
        </p>
        {!user && ( // Botons de registre i login per a usuaris no autenticats
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/register"
              className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse-slow"
            > // Enllaç per registrar-se
              <FaUserPlus className="mr-2" /> Registrar-se
            </a>
            <a
              href="/login"
              className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse-slow"
            > // Enllaç per iniciar sessió
              <FaSignInAlt className="mr-2" /> Iniciar Sessió
            </a>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20 animate-spin-slow"></div> // Fons decoratiu amb cercle animat
    </section>

    {/* Secció Introducció */}
    <section className="py-20 bg-blue-100/60"> // Secció amb fons blau clar
      <div className="px-6 md:px-12"> // Contingut amb padding responsiu
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 tracking-tight text-center mb-12 animate-fade-in"> // Títol de la secció
          Descobreix el Poder de Timelix
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"> // Graella responsiva
          <div className="text-gray-700 text-lg leading-relaxed space-y-6"> // Columna de text
            <p className="animate-slide-right"> // Descripció general
              Timelix transforma la manera com gestiones el temps al teu lloc de treball. Amb una interfície intuïtiva, et permet planificar horaris amb flexibilitat, registrar entrades i sortides en temps real i generar informes detallats en PDF amb un sol clic. El nostre sistema, desplegat en Kubernetes, assegura escalabilitat i rendiment òptim, mentre que el consentiment de cookies garanteix la privadesa dels teus usuaris.
            </p>
            <p className="animate-slide-right delay-200"> // Beneficis addicionals
              Perfecte per a empreses de qualsevol mida, Timelix s’integra amb les teves necessitats operatives i ofereix eines d’anàlisi per prendre decisions informades. Descobreix com pots millorar l’eficiència del teu equip avui mateix!
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 animate-scale-up"> // Llista de característiques
            <ul className="space-y-5 text-blue-800 text-lg">
              <li className="flex items-center"><FaCalendarAlt className="mr-4 text-2xl" /> Planificació avançada d’horaris</li>
              <li className="flex items-center"><FaClock className="mr-4 text-2xl" /> Seguiment precís de presència</li>
              <li className="flex items-center"><FaFileAlt className="mr-4 text-2xl" /> Informes personalitzats en PDF</li>
              <li className="flex items-center"><FaShieldAlt className="mr-4 text-2xl" /> Privadesa amb cookies</li>
              <li className="flex items-center"><FaChartBar className="mr-4 text-2xl" /> Anàlisi d’eficiència</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Secció Com Timelix Millora la Productivitat */}
    <section className="py-20 bg-white"> // Secció amb fons blanc
      <div className="px-6 md:px-12"> // Contingut amb padding responsiu
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 tracking-tight text-center mb-12 animate-fade-in"> // Títol de la secció
          Com Timelix Millora la Productivitat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"> // Graella de beneficis
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"> // Benefici 1
            <div className="flex items-center mb-4">
              <FaRocket className="text-3xl text-blue-600 mr-4" />
              <h3 className="text-xl font-semibold text-blue-700">Automatització Intel·ligent</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              Redueix el temps dedicat a tasques manuals amb eines que automatitzen la gestió d’horaris i el seguiment de presència.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-slide-up delay-200"> // Benefici 2
            <div className="flex items-center mb-4">
              <FaChartLine className="text-3xl text-blue-600 mr-4" />
              <h3 className="text-xl font-semibold text-blue-700">Informació en Temps Real</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              Obtingues dades actualitzades al moment per prendre decisions ràpides i efectives sobre el teu equip.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-slide-up delay-400"> // Benefici 3
            <div className="flex items-center mb-4">
              <FaUsers className="text-3xl text-blue-600 mr-4" />
              <h3 className="text-xl font-semibold text-blue-700">Col·laboració Simplificada</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              Facilita la comunicació i coordinació entre membres de l’equip amb eines integrades.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Secció Integracions i Compatibilitat */}
    <section className="py-20 bg-blue-100/60"> // Secció amb fons blau clar
      <div className="px-6 md:px-12"> // Contingut amb padding responsiu
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 tracking-tight text-center mb-12 animate-fade-in"> // Títol de la secció
          Integracions i Compatibilitat
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"> // Graella responsiva
          <div className="text-gray-700 text-lg leading-relaxed space-y-6"> // Columna de text
            <p className="animate-slide-right"> // Descripció d'integracions
              Timelix s’integra fàcilment amb les eines que ja utilitzes. Connecta els teus calendaris externs, com Google Calendar o Outlook, per sincronitzar horaris i esdeveniments sense esforç.
            </p>
            <p className="animate-slide-right delay-200"> // Compatibilitat amb eines de col·laboració
              També és compatible amb eines d’anàlisi i col·laboració com Slack o Microsoft Teams, permetent-te centralitzar la gestió del temps i millorar la comunicació del teu equip.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 animate-scale-up"> // Llista d'integracions
            <ul className="space-y-5 text-blue-800 text-lg">
              <li className="flex items-center"><FaLink className="mr-4 text-2xl" /> Sincronització amb Google Calendar</li>
              <li className="flex items-center"><FaLink className="mr-4 text-2xl" /> Integració amb Microsoft Outlook</li>
              <li className="flex items-center"><FaLink className="mr-4 text-2xl" /> Compatible amb Slack</li>
              <li className="flex items-center"><FaLink className="mr-4 text-2xl" /> Suport per a Microsoft Teams</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Secció Estadístiques d'Impacte */}
    <section className="py-20 bg-white"> // Secció amb fons blanc
      <div className="px-6 md:px-12"> // Contingut amb padding responsiu
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 tracking-tight text-center mb-12 animate-fade-in"> // Títol de la secció
          El nostre impacte
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"> // Graella d'estadístiques
          <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-scale-up text-center"> // Estadística 1
            <FaUsers className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-blue-700 mb-2">10.000+</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Usuaris confien en Timelix per gestionar el seu temps.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-scale-up delay-200 text-center"> // Estadística 2
            <FaChartLine className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-blue-700 mb-2">90%</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Dels usuaris milloren la seva eficiència laboral.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-scale-up delay-400 text-center"> // Estadística 3
            <FaRocket className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-blue-700 mb-2">100%</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Compromís amb la privadesa i seguretat de les dades.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Secció Plans i Preus */}
    <section className="py-20 bg-blue-100/60"> // Secció amb fons blau clar
      <div className="px-6 md:px-12"> // Contingut amb padding responsiu
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 tracking-tight text-center mb-12 animate-fade-in"> // Títol de la secció
          Plans i Preus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"> // Graella de plans
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"> // Pla Gratuït
            <div className="flex items-center mb-6">
              <FaMoneyCheckAlt className="text-4xl text-blue-600 mr-5" />
              <h3 className="text-2xl font-semibold text-blue-700">Pla Gratuït</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Accedeix a totes les funcionalitats bàsiques de Timelix sense cap cost. Ideal per a equips petits i autònoms.
            </p>
            <ul className="space-y-3 text-blue-800 text-lg">
              <li className="flex items-center"><FaCalendarAlt className="mr-4 text-2xl" /> Gestió d’horaris</li>
              <li className="flex items-center"><FaClock className="mr-4 text-2xl" /> Control de presència</li>
              <li className="flex items-center"><FaFileAlt className="mr-4 text-2xl" /> Informes en PDF</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up delay-200"> // Pla Premium
            <div className="flex items-center mb-6">
              <FaMoneyCheckAlt className="text-4xl text-blue-600 mr-5" />
              <h3 className="text-2xl font-semibold text-blue-700">Pla Premium (Proximament)</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Desbloqueja funcionalitats avançades com anàlisi detallada, integracions addicionals i suport prioritari.
            </p>
            <ul className="space-y-3 text-blue-800 text-lg">
              <li className="flex items-center"><FaChartBar className="mr-4 text-2xl" /> Anàlisi avançada</li>
              <li className="flex items-center"><FaLink className="mr-4 text-2xl" /> Integracions premium</li>
              <li className="flex items-center"><FaUsers className="mr-4 text-2xl" /> Suport dedicat</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Secció Preguntes Freqüents */}
    <section className="py-20 bg-blue-100/60"> // Secció amb fons blau clar
      <div className="px-6 md:px-12"> // Contingut amb padding responsiu
        <div className="text-center mb-12"> // Títol i subtítol
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 tracking-tight animate-fade-in"> // Títol de la secció
            Preguntes Freqüents
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"> // Descripció
            Troba respostes a les preguntes més habituals sobre l’ús de Timelix.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4"> // Llista de preguntes
          <details className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"> // Pregunta 1
            <summary className="flex items-center justify-between px-6 py-4 text-xl font-semibold text-blue-700 cursor-pointer">
              <span className="flex items-center">
                <FaQuestionCircle className="mr-2 text-blue-600" /> Timelix és gratuït per utilitzar?
              </span>
              <svg className="w-5 h-5 text-blue-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div className="px-6 pb-4 text-gray-600">
              Sí, Timelix és completament gratuït per utilitzar. No cobrem cap tarifa per crear un compte, registrar entrades/sortides ni generar informes.
            </div>
          </details>
          <details className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"> // Pregunta 2
            <summary className="flex items-center justify-between px-6 py-4 text-xl font-semibold text-blue-700 cursor-pointer">
              <span className="flex items-center">
                <FaQuestionCircle className="mr-2 text-blue-600" /> Com puc assegurar-me que les meves dades són segures?
              </span>
              <svg className="w-5 h-5 text-blue-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div className="px-6 pb-4 text-gray-600">
              Recomanem utilitzar credencials fortes i canviar-les periòdicament. Timelix utilitza xifratge HTTPS i un sistema de consentiment de cookies per protegir les teves dades. També pots habilitar l’autenticació en dos factors si està disponible.
            </div>
          </details>
          <details className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"> // Pregunta 3
            <summary className="flex items-center justify-between px-6 py-4 text-xl font-semibold text-blue-700 cursor-pointer">
              <span className="flex items-center">
                <FaQuestionCircle className="mr-2 text-blue-600" /> Què passa si tinc problemes amb els informes?
              </span>
              <svg className="w-5 h-5 text-blue-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div className="px-6 pb-4 text-gray-600">
              Si tens problemes amb els informes PDF, assegura’t que tens permisos d’administrador i que hi ha registres disponibles. Si el problema persisteix, contacta el suport tècnic a través del teu administrador.
            </div>
          </details>
        </div>
      </div>
    </section>

    {/* Secció Testimonis */}
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800"> // Secció amb gradient de fons
      <div className="px-6 md:px-12 text-center"> // Contingut centrat
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-12 animate-fade-in"> // Títol de la secció
          Què diuen els nostres usuaris
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"> // Graella de testimonis
          <div className="bg-white p-8 rounded-2xl shadow-lg text-blue-700 hover:shadow-2xl transition-all duration-300 animate-slide-up"> // Testimoni 1
            <FaStar className="text-3xl text-yellow-400 mb-4" />
            <p className="text-lg italic mb-4">"Timelix ha revolucionat la gestió dels nostres horaris. Increïblement intuïtiu!"</p>
            <p className="font-semibold">— Joan Pérez, Gerent</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-blue-700 hover:shadow-2xl transition-all duration-300 animate-slide-up delay-200"> // Testimoni 2
            <FaStar className="text-3xl text-yellow-400 mb-4" />
            <p className="text-lg italic mb-4">"Els informes en PDF són precisos i es generen en segons. Altament recomanable!"</p>
            <p className="font-semibold">— Maria López, HR Manager</p>
          </div>
        </div>
      </div>
    </section>

    {/* Secció Crida a l'Acció */}
    <section className="py-24 bg-gradient-to-r from-blue-600/20 to-blue-800/20 text-center"> // Secció amb gradient suau
      <div className="px-6 md:px-12"> // Contingut centrat
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 animate-fade-in"> // Títol de la secció
          Preparat per optimitzar el teu temps?
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10"> // Descripció
          Uneix-te a milers d’usuaris que ja gestionen el seu temps de manera eficient amb Timelix.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"> // Botons de crida a l'acció
          <a
            href="/register"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 animate-pulse-slow"
          > // Enllaç per crear compte
            <FaUserPlus className="mr-3" /> Crear Compte Gratuït
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
          <a
            href="/about"
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 animate-pulse-slow"
          > // Enllaç a la pàgina Sobre Nosaltres
            <FaInfoCircle className="mr-3" /> Sobre Nosaltres
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
);

// Exporta el component
export default Home;