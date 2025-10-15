import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { navItems } from '../config/navigation';
import ThemeToggle from './ThemeToggle';
import { useThemeStore } from '../stores/themeStore';
import { AccountStatus } from '../types/enums';
import { LuCreditCard } from 'react-icons/lu';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, activateAccount } = useAuthStore();
  const { theme } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleActivation = async () => {
    const activationFee = 5000; // This should ideally be fetched from a config endpoint
    try {
      await activateAccount(activationFee);
      alert("Votre compte a été activé avec succès !");
    } catch (error) {
      console.error("Activation failed:", error);
      alert("L'activation du compte a échoué. Veuillez réessayer.");
    }
  };

  const isAccountActive = user?.accountStatus === AccountStatus.ACTIVE;
  const filteredNavItems = navItems.filter(item => user && item.roles.includes(user.role));

  const getNavItemName = (name: string) => {
    switch (name) {
      case 'Dashboard': return 'Tableau de bord';
      case 'Members': return 'Membres';
      case 'Dues': return 'Cotisations';
      case 'Events': return 'Événements';
      case 'Transactions': return 'Transactions';
      case 'Reports': return 'Rapports';
      default: return name;
    }
  };

  const renderCenterNavLinks = () => {
    if (isAuthenticated && isAccountActive) {
      return filteredNavItems.map(item => (
        <li key={item.name}>
          <Link to={item.path}>{getNavItemName(item.name)}</Link>
        </li>
      ));
    }
    // For logged-out or inactive users, the center is empty
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-md sticky top-0 z-30" data-theme={theme}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 text-lg" onClick={() => (document.activeElement as HTMLElement)?.blur()}>
              <li><Link to="/">Accueil</Link></li>
              {isAuthenticated && isAccountActive && filteredNavItems.map(item => (
                <li key={item.name}><Link to={item.path}>{getNavItemName(item.name)}</Link></li>
              ))}
              {isAuthenticated && !isAccountActive && <li><Link to="/profile">Profil</Link></li>}
              {!isAuthenticated && (
                <>
                  <li><Link to="/login">Se connecter</Link></li>
                  <li><Link to="/register">S'inscrire</Link></li>
                </>
              )}
              {isAuthenticated && <li><button onClick={handleLogout}>Se déconnecter</button></li>}
            </ul>
          </div>
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="btn btn-ghost text-xl font-serif">CotisApp</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Accueil</Link></li>
            {renderCenterNavLinks()}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {/* Buttons for authenticated users */}
          {isAuthenticated && (
            <>
              {!isAccountActive && (
                <button className="btn btn-warning btn-sm animate-pulse" onClick={handleActivation}>
                  <LuCreditCard />
                  Activer le compte
                </button>
              )}
              <button onClick={handleLogout} className="btn btn-ghost hidden lg:flex">Se déconnecter</button>
            </>
          )}

          {/* Buttons for unauthenticated users */}
          {!isAuthenticated && (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm">Se connecter</Link>
              <Link to="/register" className="btn btn-primary btn-sm">S'inscrire</Link>
            </div>
          )}
          
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2025 - Tous droits réservés par CotisApp</p>
        </aside>
      </footer>
    </div>
  );
};

export default Layout;