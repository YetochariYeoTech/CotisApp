import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { AccountStatus } from '../../types/enums';
import { LuCreditCard } from 'react-icons/lu';
import { IoIosAlert } from "react-icons/io";

const ActivateAccountBanner: React.FC = () => {
  const { activateAccount, loading } = useAuthStore();
  const activationFee = 5000; // This should ideally be fetched from the backend

  const handleActivation = async () => {
    try {
      await activateAccount(activationFee);
      // The store will update the user, and this component will unmount
    } catch (error) {
      // TODO: Show a proper error toast/notification to the user
      console.error("Activation failed:", error);
      alert("L'activation du compte a échoué. Veuillez réessayer.");
    }
  };

  return (
    <div className="card bg-warning text-warning-content shadow-xl mb-6">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <IoIosAlert className="w-10 h-10" />
          <div>
            <h2 className="card-title">Votre compte est inactif !</h2>
            <p>Pour accéder à toutes les fonctionnalités, veuillez activer votre compte en réglant les frais d'activation.</p>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary" onClick={handleActivation} disabled={loading}>
            <LuCreditCard />
            {loading ? 'Activation en cours...' : `Activer mon compte (${activationFee.toLocaleString()} XAF)`}
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const isAccountActive = user?.accountStatus === AccountStatus.ACTIVE;

  return (
    <div className="p-4 md:p-6 text-base-content">
      {!isAccountActive && <ActivateAccountBanner />}
      
      <h1 className="text-2xl font-bold font-serif mb-4">Tableau de bord</h1>
      <p className="font-sans">Bienvenue sur le tableau de bord !</p>
      
      {/* The rest of the dashboard content can be conditionally disabled if needed */}
      {/* For example, disable access to dues if account is not active */}
      {!isAccountActive && (
        <div className="text-center p-8 bg-base-200 rounded-box mt-6">
            <p className="text-lg font-semibold">Veuillez activer votre compte pour continuer.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;