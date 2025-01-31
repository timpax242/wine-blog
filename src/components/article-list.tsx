import Image from 'next/image';
import Link from 'next/link';
import { contentfulQueries } from '@/lib/contentful/queries';

export default async function ArticleList() {
  const { posts } = await contentfulQueries.getAllPosts(1, 11);
  const articlesToShow = posts.slice(1);

  return (
    <section className="lg:w-3/4">
      <h2 className="text-2xl font-bold mb-8">Viimeisimmät artikkelit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articlesToShow.map((article) => (
          <article
            key={article.id}
            className="bg-white overflow-hidden rounded shadow-sm transition-shadow hover:shadow-md"
          >
            <Link href={`/blog/${article.id}`}>
              <div className="relative h-64 w-full">
                <Image
                  src={article.image || '/placeholder.svg'}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
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
