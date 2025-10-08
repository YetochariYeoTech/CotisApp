import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-serif mb-4 text-center">
            Créez votre compte
          </h2>
          <RegisterForm />
          <div className="mt-4 text-center font-sans">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="link link-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
