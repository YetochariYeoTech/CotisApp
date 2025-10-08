import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { navItems } from '../config/navigation';
import ThemeToggle from './ThemeToggle';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

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
    <div className="flex flex-col min-h-screen">
      <header className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost text-xl">CotisApp</Link>
        </div>
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            {filteredNavItems.map(item => (
              <li key={item.name}>
                <Link to={item.path}>{getNavItemName(item.name)}</Link>
              </li>
            ))}
            {user && (
              <li>
                <button onClick={handleLogout} className="btn btn-ghost">Se déconnecter</button>
              </li>
            )}
          </ul>
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

export default Layout;
