'use client';

import { useState } from 'react';
import { Wine, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-burgundy-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <Wine size={32} className="text-burgundy-200" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-200 rounded-full animate-pulse"></div>
          </div>
          <span className="text-3xl font-cursive tracking-wide">
            Korkkikierre
          </span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="hover:text-burgundy-200 transition-colors"
              >
                Etusivu
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="hover:text-burgundy-200 transition-colors"
              >
                Arvostelut
              </Link>
            </li>
            <li>
              <Link
                href="/regions"
                className="hover:text-burgundy-200 transition-colors"
              >
                Alueet
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-burgundy-200 transition-colors"
              >
                Tietoa
              </Link>
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
              <Link
                href="/"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Etusivu
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Arvostelut
              </Link>
            </li>
            <li>
              <Link
                href="/regions"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Alueet
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block hover:text-burgundy-200 transition-colors"
              >
                Tietoa
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
