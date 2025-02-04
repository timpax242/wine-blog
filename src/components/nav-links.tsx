import Link from 'next/link';

// Interface for navigation items with label and URL
interface NavLinksProps {
  items: {
    title: string;
    url: string;
  }[];
  className?: string; // Optional className for styling flexibility
}

// Component for rendering navigation links in both desktop and mobile menus
export default function NavLinks({ items, className }: NavLinksProps) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={`${item.url}-${index}`}>
          {/* Navigation link with hover effect */}
          <Link
            href={item.url}
            className="text-white hover:text-burgundy-200 transition-colors"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
