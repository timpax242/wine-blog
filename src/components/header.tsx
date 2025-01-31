import { Wine } from 'lucide-react';
import Link from 'next/link';
import NavLinks from './nav-links';
import MobileMenu from './mobile-menu';
import { contentfulQueries } from '@/lib/contentful/queries';

// Main header component with responsive navigation
export default async function Header() {
  // Fetch navigation items from Contentful
  const navItems = await contentfulQueries.getMainNavigation();

  return (
    <header className="bg-burgundy-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and site title */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <Wine size={32} className="text-burgundy-200" />
            {/* Animated dot indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-200 rounded-full animate-pulse"></div>
          </div>
          <span className="text-3xl font-cursive tracking-wide">
            Korkkikierre
          </span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:block">
          <NavLinks items={navItems} className="flex space-x-6" />
        </nav>

        {/* Mobile Navigation - visible only on mobile */}
        <div className="md:hidden">
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
