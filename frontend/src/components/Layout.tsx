import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useWalletStore } from "../stores/walletStore";
import { navItems } from "../config/navigation";
import ThemeToggle from "./ThemeToggle";
import { useThemeStore } from "../stores/themeStore";
import { AccountStatus } from "../types/enums";
import { LuCreditCard, LuUser } from "react-icons/lu";
import Toast from "./common/Toast"; // Import Toast component
import { useToastStore } from "../stores/toastStore"; // Import useToastStore

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, activateAccount } = useAuthStore();
  const { balance, fetchBalance } = useWalletStore();
  const { theme } = useThemeStore();
  const { message: toastMessage, type: toastType, hideToast } = useToastStore(); // Get toast state

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchBalance();
    }
  }, [isAuthenticated, fetchBalance]);

  const handleLogout = () => {
    logout();
    navigate("/login");
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
  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const getNavItemName = (name: string) => {
    switch (name) {
      case "Dashboard":
        return "Tableau de bord";
      case "Members":
        return "Membres";
      case "Dues":
        return "Cotisations";
      case "Events":
        return "Événements";
      case "Transactions":
        return "Transactions";
      case "Reports":
        return "Rapports";
      default:
        return name;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <header
        className="navbar bg-base-100 shadow-md sticky top-0 z-30"
        data-theme={theme}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 text-lg"
              onClick={() => (document.activeElement as HTMLElement)?.blur()}
            >
              <li>
                <Link to="/">Accueil</Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/profile">Profil</Link>
                  </li>
                  {isAccountActive &&
                    filteredNavItems.map((item) => (
                      <li key={item.name}>
                        <Link to={item.path}>{getNavItemName(item.name)}</Link>
                      </li>
                    ))}
                  <li>
                    <button onClick={handleLogout}>Se déconnecter</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Se connecter</Link>
                  </li>
                  <li>
                    <Link to="/register">S'inscrire</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-serif">
            CotisApp
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            {isAuthenticated &&
              isAccountActive &&
              filteredNavItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path}>{getNavItemName(item.name)}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {isAuthenticated ? (
            <>
              {!isAccountActive && (
                <button
                  className="btn btn-warning btn-sm animate-pulse"
                  onClick={handleActivation}
                >
                  <LuCreditCard />
                  Activer le compte
                </button>
              )}
              {isAccountActive && (
                <div className="kbd kbd-sm">
                  <span>
                    {new Intl.NumberFormat("fr-FR").format(balance)} XOF
                  </span>
                </div>
              )}
              <Link to="/profile" className="btn btn-ghost">
                <div className="avatar mr-2">
                  <div className="w-6 rounded-full">
                    <img
                      src={`https://i.pravatar.cc/40?u=${user?._id}`}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <span className="hidden md:inline">{user?.fullName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-ghost hidden lg:flex"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm">
                Se connecter
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                S'inscrire
              </Link>
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
      {/* Toast Notification */}
      {toastMessage && toastType && (
        <div className="toast toast-end toast-bottom">
          <Toast
            message={toastMessage}
            type={toastType}
            onDismiss={hideToast}
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
