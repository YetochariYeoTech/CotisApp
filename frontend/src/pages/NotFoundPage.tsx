import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-4">
      <div className="text-neon text-neon-title">
        404
      </div>
      <div className="text-neon text-neon-subtitle mt-4">
        Page Non Trouvée
      </div>
      <p className="text-white/80 mt-6 max-w-md">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn btn-primary mt-8 shadow-lg hover:shadow-primary/50 transition-shadow">
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
