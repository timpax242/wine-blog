import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

interface CategoryPostsProps {
  categorySlug: string;
}

export default async function CategoryPosts({
  categorySlug,
}: CategoryPostsProps) {
  const posts = await contentfulQueries.getPostsByCategory(categorySlug);

  if (!posts.length) {
    return <p>Ei artikkeleita tässä kategoriassa.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white overflow-hidden rounded shadow-sm transition-shadow hover:shadow-md"
        >
          <Link href={`/blog/${post.id}`}>
            <div className="relative h-64 w-full">
              <Image
                src={post.image || '/placeholder.svg'}
                alt={post.title}
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
