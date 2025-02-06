import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

// Sidebar component containing categories and popular posts
export default async function Sidebar() {
  // Fetch categories and random posts from Contentful CMS
  const [categories, popularPosts] = await Promise.all([
    contentfulQueries.getCategories(),
    contentfulQueries.getRandomPosts(3),
  ]);

  return (
    <aside className="lg:w-1/4">
      {/* Categories section */}
      <div className="bg-white p-6 mb-8 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Kategoriat</h3>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/category/${category.slug}`} className="block">
                <span className="text-burgundy-700 hover:text-burgundy-900 font-medium">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular posts section */}
      <div className="bg-white p-6 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Suosituimmat artikkelit</h3>
        <ul className="space-y-4">
          {popularPosts.map((post) => (
            <li key={post.slug} className="flex items-center space-x-4">
              <div className="relative w-1/4 h-16 overflow-hidden rounded">
                <Image
                  src={post.imageUrl}
                  alt={post.imageTitle || post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-3/4">
                <Link
                  href={`/${post.slug}`}
                  className="text-burgundy-700 hover:text-burgundy-900 font-medium"
                >
                  {post.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
