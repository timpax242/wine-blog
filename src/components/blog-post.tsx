import Image from 'next/image';
import Header from './header';
import Footer from './footer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BlogPostProps {
  title: string;
  content: any;
  image: string;
  date: string;
  excerpt: string;
  author?: string;
  slug: string;
}

export default function BlogPost({
  title,
  content,
  image,
  date,
  excerpt,
  author,
  slug,
}: BlogPostProps) {
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="relative h-64 sm:h-96 w-full mb-8">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-sm"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{title}</h1>

            <div className="flex items-center gap-4 text-gray-600 mb-6">
              {author && (
                <span className="font-medium">Kirjoittanut: {author}</span>
              )}
              {date && (
                <time dateTime={date} className="text-gray-500">
                  {formattedDate}
                </time>
              )}
            </div>

            {excerpt && (
              <div className="text-xl text-gray-600 mb-8 font-medium border-l-4 border-burgundy-700 pl-4">
                {excerpt}
              </div>
            )}

            <div className="prose prose-lg max-w-[700px] prose-headings:text-burgundy-900 prose-a:text-burgundy-700">
              {documentToReactComponents(content)}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
