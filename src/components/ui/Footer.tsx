import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-sky-800 text-white py-8 mt-12 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo et description */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold">Equita-planner</h3>
          <p className="text-gray-300 mt-2">
            Simplifiez la gestion de vos leçons et activités équestres.
          </p>
        </div>
        {/* Liens */}
        <div className="flex flex-col md:flex-row gap-6">
          <a href="/about" className="hover:text-sky-300">
            À propos
          </a>
          <a href="/contact" className="hover:text-sky-300">
            Contact
          </a>
          <a href="/terms" className="hover:text-sky-300">
            Conditions d&apos;utilisation
          </a>
          <a href="/privacy" className="hover:text-sky-300">
            Politique de confidentialité
          </a>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Equita-planner. Tous droits réservés.
      </div>
    </footer>
  );
};
