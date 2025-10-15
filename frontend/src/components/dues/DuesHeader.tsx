import React from 'react';
import { LuBell, LuUser, LuSearch, LuArrowLeft } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface DuesHeaderProps {
  onAddDue: () => void;
  showAddButton: boolean;
}

const DuesHeader: React.FC<DuesHeaderProps> = ({ onAddDue, showAddButton }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-base-100 shadow-md rounded-box">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <Link to="/dashboard" className="btn btn-ghost btn-circle">
          <LuArrowLeft className="h-6 w-6" />
        </Link>
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
        {showAddButton && (
          <button
              className="btn btn-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              onClick={onAddDue}
            >
              <span className="hidden sm:inline">+ Nouvelle Cotisation</span>
              <span className="sm:hidden">+</span>
            </button>
        )}
      </div>
    </div>
  );
};

export default DuesHeader;