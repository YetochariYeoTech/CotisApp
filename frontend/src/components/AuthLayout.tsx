import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { navItems } from '../config/navigation';
import ThemeToggle from './ThemeToggle';
import { useThemeStore } from '../stores/themeStore';

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-md" data-theme={theme}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/landing">Accueil</Link></li>
              {isAuthenticated && filteredNavItems.map(item => (
                <li key={item.name}>
                  <Link to={item.path}>{getNavItemName(item.name)}</Link>
                </li>
              ))}
              {isAuthenticated && user && (
                <li>
                  <button onClick={handleLogout} className="btn btn-ghost">Se déconnecter</button>
                </li>
              )}
              {!isAuthenticated && (
                <>
                  <li><Link to="/login">Se connecter</Link></li>
                  <li><Link to="/register">S'inscrire</Link></li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-serif">CotisApp</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/landing">Accueil</Link></li>
            {isAuthenticated && filteredNavItems.map(item => (
              <li key={item.name}>
                <Link to={item.path}>{getNavItemName(item.name)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {isAuthenticated && user && (
            <button onClick={handleLogout} className="btn btn-ghost hidden lg:flex">Se déconnecter</button>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="btn btn-ghost hidden lg:flex">Se connecter</Link>
              <Link to="/register" className="btn btn-primary hidden lg:flex">S'inscrire</Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
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

export default AuthLayout;
