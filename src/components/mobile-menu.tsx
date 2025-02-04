'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLinks from './nav-links';

// Props interface for mobile menu component
interface MobileMenuProps {
  items: {
    title: string;
    url: string;
  }[];
}

// Client-side mobile menu component with toggle functionality
export default function MobileMenu({ items }: MobileMenuProps) {
  // State to track menu open/closed status
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle button with dynamic icon based on menu state */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown menu - only rendered when isOpen is true */}
      {isOpen && (
        <nav className="fixed left-0 right-0 top-[60px] bg-burgundy-900 p-6 shadow-lg z-50">
          <div className="container mx-auto">
            {/* Reuse NavLinks component with mobile-specific styling */}
            <NavLinks
              items={items}
              handleClick={() => setIsOpen(false)}
              className="flex flex-col space-y-4 text-left"
            />
          </div>
        </nav>
      )}
    </div>
  );
}
