import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

interface CategoryPostsProps {
  categorySlug: string;
}

// Component to display all posts within a specific category
export default async function CategoryPosts({
  categorySlug,
}: CategoryPostsProps) {
  const posts = await contentfulQueries.getPostsByCategory(categorySlug);

  // Handle empty category case
  if (!posts.length) {
    return <p>Ei artikkeleita tässä kategoriassa.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post, index) => (
        <article
          key={'article-' + index}
          className="bg-white overflow-hidden rounded shadow-sm transition-shadow hover:shadow-md"
        >
          {/* Post preview card with image and excerpt */}
          <Link href={`/${post.slug}`}>
            <div className="relative h-64 w-full">
              <Image
                src={post.imageUrl}
                alt={post.imageTitle || post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <span className="text-burgundy-700 hover:text-burgundy-900 font-semibold">
                Lue lisää →
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
