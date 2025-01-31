import Link from 'next/link';

interface NavLinksProps {
  items: {
    label: string;
    url: string;
  }[];
  className?: string;
}

export default function NavLinks({ items, className }: NavLinksProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.url}>
          <Link
            href={item.url}
            className="text-white hover:text-burgundy-200 transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
