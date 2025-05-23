import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => (
  // Contenidor principal centrat verticalment i horitzontalment amb fons blau clar
  <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Contenidor amb amplada màxima i espai vertical entre elements */}
    <div className="max-w-md w-full space-y-8">
      {/* Contenidor relativament posicionat per assegurar que el formulari estigui per sobre dels altres elements */}
      <div className="relative z-10">
        {/* Formulari de registre importat des de components */}
        <RegisterForm />
      </div>
    </div>
    {/* Fons decoratiu amb SVG i animació de gir lent, posicionat absolutament darrere del formulari */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'80\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'2\' opacity=\'0.1\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
  </div>
);

// Animació CSS personalitzada per a gir lent
const styles = `
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  // Classe per aplicar animació de gir lent infinit
  .animate-spin-slow { animation: spinSlow 20s linear infinite; }
`;

// Afegim l'estil definit dinàmicament al document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Register;
