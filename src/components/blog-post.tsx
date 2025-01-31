import Image from 'next/image';
import Header from './header';
import Footer from './footer';
import { AuthorProfile } from './author-profile';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BlogPostProps {
  title: string;
  content: any;
  image: string;
  date: string;
  excerpt: string;
  author?: {
    name: string;
    bio: string;
    image: string;
  };
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
    <main className="flex-grow container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="relative h-64 sm:h-96 w-full mb-8">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
        <div className="max-w-[700px]">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>

          <div className="flex flex-col text-gray-600 mb-6">
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

          <div className="prose prose-lg prose-headings:text-burgundy-900 prose-a:text-burgundy-700">
            {documentToReactComponents(content)}
          </div>

          {author && author.name && (
            <AuthorProfile
              name={author.name}
              bio={author.bio || ''}
              image={author.image || '/placeholder-author.jpg'}
            />
          )}
        </div>
      </article>
    </main>
  );
}
