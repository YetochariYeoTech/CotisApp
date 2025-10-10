import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 text-base-content">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-serif mb-4 text-center text-base-content">Connectez-vous à votre compte</h2>
          <LoginForm />
          <div className="mt-4 text-center font-sans text-base-content">
            Vous n'avez pas de compte ? <Link to="/register" className="link link-primary">S'inscrire</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
