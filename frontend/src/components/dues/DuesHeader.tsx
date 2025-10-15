
import React from 'react';
import { LuBell, LuUser, LuSearch } from 'react-icons/lu'; // Assuming react-icons is installed
import { Link } from 'react-router-dom';

interface DuesHeaderProps {
  onAddDue: () => void;
}

const DuesHeader: React.FC<DuesHeaderProps> = ({ onAddDue }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-base-100 shadow-md rounded-box">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <h1 className="text-4xl font-serif font-bold text-primary animate-fade-in-down">Cotisations</h1>
        <span className="badge badge-lg badge-outline badge-primary">Gestion</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost btn-circle">
          <LuSearch className="h-5 w-5" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <span className="indicator-item badge badge-error">3</span>
            <LuBell className="h-5 w-5" />
          </div>
        </button>
        <button className="btn btn-ghost btn-circle">
          <LuUser className="h-5 w-5" />
        </button>
        <button
            className="btn btn-accent text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={onAddDue}
          >
            <span className="hidden sm:inline">+ Nouvelle Cotisation</span>
            <span className="sm:hidden">+</span>
          </button>
          
      </div>
    </div>
  );
};

export default DuesHeader;
