import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

const popularPosts = [
  {
    title: 'Top 10 viiniä alle 20€',
    image: 'https://images.pexels.com/photos/1479706/pexels-photo-1479706.jpeg',
  },
  {
    title: 'Kuinka säilyttää viiniä oikein',
    image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg',
  },
  {
    title: 'Viininmaistelu 101: Aloittelijan opas',
    image: 'https://images.pexels.com/photos/66636/pexels-photo-66636.jpeg',
  },
];

export default async function Sidebar() {
  const categories = await contentfulQueries.getCategories();

  return (
    <aside className="lg:w-1/4">
      <div className="bg-white p-6 mb-8 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Kategoriat</h3>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/category/${category.slug}`} className="block">
                <span className="text-burgundy-700 hover:text-burgundy-900 font-medium">
                  {category.name}
                </span>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {category.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Suosituimmat artikkelit</h3>
        <ul className="space-y-4">
          {popularPosts.map((post, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="relative w-16 h-16 overflow-hidden rounded">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <a
                href="#"
                className="text-burgundy-700 hover:text-burgundy-900 font-medium"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
