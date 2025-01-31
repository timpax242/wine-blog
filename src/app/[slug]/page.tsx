import BlogPost from '@/components/blog-post';
import { contentfulQueries } from '@/lib/contentful/queries';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await contentfulQueries.getPostBySlug(slug);

  if (!post) {
    return <div>Artikkelia ei löytynyt</div>;
  }

  return <BlogPost {...post} />;
}

// Optional: Add static generation with revalidation
export const revalidate = 3600; // Revalidate every hour
