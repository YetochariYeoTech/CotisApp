import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { LuUser, LuMail, LuPhone, LuCalendar, LuShield, LuWallet, LuPencil, LuArrowDownToLine, LuArrowUpFromLine } from 'react-icons/lu';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div className="p-6"><span className="loading loading-lg"></span></div>;
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={`https://i.pravatar.cc/150?u=${user._id}`} alt={`Avatar of ${user.fullName}`} />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold font-serif">Mon Profil</h1>
          <p className="text-base-content/70">Gérez vos informations personnelles et votre compte.</p>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title">Informations Personnelles</h2>
            <button className="btn btn-ghost btn-sm">
              <LuPencil className="h-4 w-4" /> Modifier
            </button>
          </div>
          <div className="divider my-2"></div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <LuUser className="h-5 w-5 text-primary" />
              <div className="font-sans"><strong>Nom complet :</strong> {user.fullName}</div>
            </div>
            <div className="flex items-center gap-4">
              <LuMail className="h-5 w-5 text-primary" />
              <div className="font-sans"><strong>Email :</strong> {user.email}</div>
            </div>
            <div className="flex items-center gap-4">
              <LuShield className="h-5 w-5 text-primary" />
              <div className="font-sans"><strong>Rôle :</strong> {user.role}</div>
            </div>
            <div className="flex items-center gap-4">
              <LuCalendar className="h-5 w-5 text-primary" />
              <div className="font-sans"><strong>Membre depuis :</strong> {new Date(user.joinDate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Mon Portefeuille</h2>
          <div className="divider my-2"></div>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <LuWallet className="h-16 w-16 text-primary/50 mb-4" />
            <p className="text-4xl font-bold">0 XAF</p>
            <p className="text-base-content/60 mt-2">Solde disponible</p>
          </div>
          <div className="card-actions justify-center gap-2 border-t border-base-200 pt-4">
            <button className="btn btn-primary" disabled>
                <LuArrowDownToLine className="h-4 w-4" />
                Faire un dépôt
            </button>
            <button className="btn btn-outline" disabled>
                <LuArrowUpFromLine className="h-4 w-4" />
                Faire un retrait
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;