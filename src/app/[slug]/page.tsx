import BlogPost from '@/components/blog-post';
import { contentfulQueries } from '@/lib/contentful/queries';
import Link from 'next/link';

// Dynamic route handler for individual blog posts
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await contentfulQueries.getPostBySlug(slug);

  // Handle 404 case
  if (!post) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Artikkelia ei löytynyt</h1>
          <p className="text-gray-600">
            Klikkaa tästä palataksesi palvelun{' '}
            <Link
              className="text-burgundy-700 hover:text-burgundy-900 font-semibold"
              href="/"
            >
              etusivulle
            </Link>
            .
          </p>
        </article>
      </main>
    );
  }

  return <BlogPost {...post} />;
}

// Revalidate content every hour to ensure fresh content while maintaining performance
export const revalidate = 3600;

// Pre-render all known blog posts at build time for better performance
export async function generateStaticParams() {
  const posts = await contentfulQueries.getAllPosts();
  return posts.posts.map((post) => ({
    slug: post.slug,
  }));
}
