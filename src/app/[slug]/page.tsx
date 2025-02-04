import BlogPost from '@/components/blog-post';
import { contentfulQueries } from '@/lib/contentful/queries';

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
    return <div>Artikkelia ei löytynyt</div>;
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
