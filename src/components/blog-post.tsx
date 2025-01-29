import Image from 'next/image';
import Header from './header';
import Footer from './footer';

interface BlogPostProps {
  title: string;
  content: string;
  image: string;
  date: string;
}

export default function BlogPost({
  title,
  content,
  image,
  date,
}: BlogPostProps) {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="relative h-64 sm:h-96 w-full mb-8">
            <Image
              src={image || '/placeholder.svg'}
              alt={title}
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">{date}</p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
