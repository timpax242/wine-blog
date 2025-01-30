import Header from '@/components/header';
import Footer from '@/components/footer';
import CategoryPosts from '@/components/category-posts';
import { contentfulQueries } from '@/lib/contentful/queries';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const categories = await contentfulQueries.getCategories();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-burgundy-700 text-white py-12 mb-8">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-xl opacity-90">{category.description}</p>
            )}
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-[1100px]">
          <CategoryPosts categorySlug={slug} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await contentfulQueries.getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export const revalidate = 3600; // Revalidate every hour
