import Image from 'next/image';
import { AuthorProfile } from './author-profile';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BlogPostProps {
  title: string;
  content: Document; // Using Contentful's Document type
  coverImage: string;
  date: string;
  excerpt: string;
  author?: {
    name: string;
    bio: string;
    image: string;
  };
}

export default function BlogPost({
  title,
  content,
  image,
  date,
  excerpt,
  author,
}: BlogPostProps) {
  // Format the date to Finnish locale with full month name
  const formattedDate = new Date(date).toLocaleDateString('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Hero image */}
        <div className="relative h-64 sm:h-96 w-full mb-8">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
            priority // Load with high priority as it's above the fold
          />
        </div>

        <div className="max-w-[700px]">
          {/* Article header */}
          <h1 className="text-4xl font-bold mb-4">{title}</h1>

          {/* Publication date */}
          <div className="flex flex-col text-gray-600 mb-6">
            {date && (
              <time dateTime={date} className="text-gray-500">
                {formattedDate}
              </time>
            )}
          </div>

          {/* Article excerpt/summary */}
          {excerpt && (
            <div className="text-xl text-gray-600 mb-8 font-medium border-l-4 border-burgundy-700 pl-4">
              {excerpt}
            </div>
          )}

          {/* Main content rendered from Contentful Rich Text */}
          <div className="prose prose-lg prose-headings:text-burgundy-900 prose-a:text-burgundy-700">
            {documentToReactComponents(content)}
          </div>

          {/* Author bio card */}
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
