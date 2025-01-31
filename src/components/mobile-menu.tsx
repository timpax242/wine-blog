'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLinks from './nav-links';

interface MobileMenuProps {
  items: {
    label: string;
    url: string;
  }[];
  className?: string;
}
export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <nav className="fixed left-0 right-0 top-[60px] bg-burgundy-900 p-6 shadow-lg z-50">
          <div className="container mx-auto">
            <NavLinks
              items={items}
              className="flex flex-col space-y-4 text-left"
            />
          </div>
        </nav>
      )}
    </div>
  );
}
