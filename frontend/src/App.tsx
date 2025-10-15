import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import MembersPage from './pages/Members/MembersPage';
import MemberDetailsPage from './pages/Members/MemberDetailsPage';
import DuesPage from './pages/Dues/DuesPage';

import EventsPage from './pages/Events/EventsPage';
import TransactionsPage from './pages/Transactions/TransactionsPage';
import FinancialSummaryPage from './pages/Reports/FinancialSummaryPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './stores/authStore';

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        {/* Routes with AuthLayout (navbar visible) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/landing" element={<LandingPage />} />
        </Route>

        <Route path="/unauthorized" element={<div>Accès non autorisé</div>} />

        {/* Redirect to landing if not authenticated, else to dashboard */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/landing" />}
        />

        {/* Protected routes with full Layout (navbar + authenticated content) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}> {/* This Layout will be used for all nested routes */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="members" element={<ProtectedRoute allowedRoles={['ADMIN', 'TREASURER', 'AUDITOR']} />}>
              <Route index element={<MembersPage />} />
              <Route path=":id" element={<MemberDetailsPage />} />
            </Route>
            <Route path="events" element={<ProtectedRoute allowedRoles={['ADMIN', 'MEMBER']} />}>
              <Route index element={<EventsPage />} />
            </Route>
            <Route path="transactions" element={<ProtectedRoute allowedRoles={['ADMIN', 'TREASURER']} />}>
              <Route index element={<TransactionsPage />} />
            </Route>
            <Route path="reports" element={<ProtectedRoute allowedRoles={['ADMIN', 'AUDITOR']} />}>
              <Route index element={<FinancialSummaryPage />} />
            </Route>
            {/* Route for /dues */}
            <Route path="dues" element={<DuesPage />} />
            
          </Route>
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}

export default App;
