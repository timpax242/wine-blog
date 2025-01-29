'use client';

import { useState } from 'react';
import { Wine, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-burgundy-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Wine size={32} className="text-burgundy-200" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-200 rounded-full animate-pulse"></div>
          </div>
          <span className="text-3xl font-cursive tracking-wide">
            Korkkikierre
          </span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-burgundy-200 transition-colors">
                Etusivu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-burgundy-200 transition-colors">
                Arvostelut
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-burgundy-200 transition-colors">
                Alueet
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-burgundy-200 transition-colors">
                Tietoa
              </a>
            </li>
          </ul>
        </nav>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                href="#"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Etusivu
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Arvostelut
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Alueet
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Tietoa
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
