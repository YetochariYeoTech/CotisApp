import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Hero Section */}
      <section className="hero min-h-[70vh] bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold font-serif mb-4">Gérez vos cotisations sans effort</h1>
            <p className="mb-5 text-lg font-sans">Simplifiez la gestion des membres, des cotisations et des événements avec CotisApp.</p>
            <Link to="/register" className="btn btn-accent btn-lg font-sans">Commencer</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif mb-12">Fonctionnalités clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title font-serif text-2xl">Gestion des membres</h3>
                <p className="font-sans">Ajoutez, modifiez et suivez facilement les informations de vos membres.</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title font-serif text-2xl">Suivi des cotisations</h3>
                <p className="font-sans">Générez, suivez et gérez les paiements de cotisations.</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title font-serif text-2xl">Gestion des événements</h3>
                <p className="font-sans">Créez et gérez des événements, et suivez les contributions.</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title font-serif text-2xl">Rapports financiers</h3>
                <p className="font-sans">Obtenez des aperçus financiers clairs avec des rapports détaillés.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-base-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif mb-12">Ce que nos utilisateurs disent</h2>
          <div className="carousel w-full">
            <div id="item1" className="carousel-item w-full justify-center">
              <div className="max-w-md">
                <p className="text-lg italic mb-4 font-sans">"CotisApp a transformé la façon dont nous gérons notre association. C'est intuitif et puissant !"</p>
                <p className="font-bold font-sans">- Jean Dupont, Président d'association</p>
              </div>
            </div>
            {/* Add more testimonial items as needed */}
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">1</a>
            {/* Add more carousel navigation buttons */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif mb-4">Prêt à simplifier votre gestion ?</h2>
          <p className="text-lg mb-8 font-sans">Rejoignez des centaines d'organisations qui font confiance à CotisApp.</p>
          <Link to="/register" className="btn btn-accent btn-lg font-sans">Commencer</Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
