import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

// Hero component displaying the featured post with full-width image
export default async function Hero() {
  const latestHeroPost = await contentfulQueries.getHeroPost();

  // Don't render anything if no hero post is found
  if (!latestHeroPost) return null;

  return (
    <section className="relative h-[60vh] w-full mb-12">
      {/* Full-width background image */}
      <Image
        src={latestHeroPost.image || '/placeholder.svg'}
        alt={latestHeroPost.title}
        fill
        className="object-cover"
        priority // Prioritize loading as this is above the fold
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero content centered over the image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 max-w-3xl">
          {latestHeroPost.title}
        </h2>
        <p className="text-lg mb-6 max-w-2xl">{latestHeroPost.excerpt}</p>
        <Link
          href={`/${latestHeroPost.slug}`}
          className="inline-block bg-burgundy-700 text-white px-6 py-2 rounded hover:bg-burgundy-800 transition-colors"
        >
          Lue lisää
        </Link>
      </div>
    </section>
  );
}
