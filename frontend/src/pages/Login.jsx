import React from 'react';
import LoginForm from '../components/LoginForm';

// Component Login: Contenidor principal per la pàgina de login
const Login = ({ setUser }) => (
  // Contenidor amb alçada mínima per pantalla completa, fons suau i centre de contingut
  <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Fons decoratiu SVG amb opacitat i animació de rotació lenta */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'80\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'2\' opacity=\'0.1\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
    
    {/* Contingut principal amb z-index per situar per sobre del fons */}
    <div className="relative z-10">
      {/* Formulari de login que rep la funció setUser per actualitzar l'usuari al fer login */}
      <LoginForm setUser={setUser} />
    </div>
  </div>
);

// Definició d'animacions CSS personalitzades per a la classe animate-spin-slow
const styles = `
  @keyframes spinSlow {
    from { transform: rotate(0deg); }  /* Inici rotació */
    to { transform: rotate(360deg); }  /* Fi rotació completa */
  }
  .animate-spin-slow { animation: spinSlow 20s linear infinite; } /* Animació de rotació contínua i lenta */
`;

// Inserció dinàmica del CSS d'animacions a la capçalera del document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Exportació del component Login per a ser utilitzat en altres parts de l'aplicació
export default Login;
