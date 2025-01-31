import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

// Component to display a grid of latest articles, excluding the hero post
export default async function ArticleList() {
  // Fetch 11 posts and exclude the first one (hero post)
  const { posts } = await contentfulQueries.getAllPosts(1, 11);
  const articlesToShow = posts.slice(1);

  return (
    <section className="lg:w-3/4">
      <h2 className="text-2xl font-bold mb-8">Viimeisimmät artikkelit</h2>
      {/* Responsive grid layout: 1 column on mobile, 2 columns on medium screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articlesToShow.map((article) => (
          <article
            key={article.id}
            className="bg-white overflow-hidden rounded shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Article card with image and preview content */}
            <Link href={`/${article.slug}`}>
              {/* Article featured image */}
              <div className="relative h-64 w-full">
                <Image
                  src={article.image || '/placeholder.svg'}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Article preview content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                {/* Read more link with hover effect */}
                <span className="text-burgundy-700 hover:text-burgundy-900 font-semibold">
                  Lue lisää →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
