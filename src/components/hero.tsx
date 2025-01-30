import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

export default async function Hero() {
  const { posts } = await contentfulQueries.getAllPosts(1, 1);
  const latestPost = posts[0];

  if (!latestPost) return null;

  return (
    <section className="relative h-[70vh] w-full mb-12">
      <Image
        src={latestPost.image}
        alt={latestPost.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 max-w-3xl">
          {latestPost.title}
        </h2>
        <p className="text-lg mb-6 max-w-2xl">{latestPost.excerpt}</p>
        <Link
          href={`/blog/${latestPost.id}`}
          className="inline-block bg-burgundy-700 text-white px-6 py-2 rounded hover:bg-burgundy-800 transition-colors"
        >
          Lue lisää
        </Link>
      </div>
    </section>
  );
}
