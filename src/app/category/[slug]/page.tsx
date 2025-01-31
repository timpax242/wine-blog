import Header from '@/components/header';
import Footer from '@/components/footer';
import CategoryPosts from '@/components/category-posts';
import { contentfulQueries } from '@/lib/contentful/queries';
import { notFound } from 'next/navigation';

// Dynamic route handler for category pages
export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const categories = await contentfulQueries.getCategories();
  const category = categories.find((cat) => cat.slug === slug);

  // Handle 404 for unknown categories
  if (!category) {
    notFound();
  }

  return (
    <main className="flex-grow">
      {/* Category header with title and description */}
      <div className="bg-burgundy-700 text-white py-12 mb-8">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-xl opacity-90">{category.description}</p>
          )}
        </div>
      </div>

      {/* Container for category posts with max width constraint */}
      <div className="container mx-auto px-4 max-w-[1100px]">
        <CategoryPosts categorySlug={slug} />
      </div>
    </main>
  );
}

// Revalidate content every hour
export const revalidate = 3600;

// Pre-render all category pages at build time
export async function generateStaticParams() {
  const categories = await contentfulQueries.getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
