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

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await contentfulQueries.getAllPosts();
  return posts.posts.map((post) => ({
    slug: post.slug,
  }));
}
