import Hero from '../components/hero';
import ArticleList from '../components/article-list';
import Sidebar from '../components/sidebar';

// Main front page component for Korkkikierre wine blog
export default function KorkkikierreFrontPage() {
  return (
    <main className="flex-grow">
      {/* Hero section with featured post */}
      <Hero />

      {/* Main content area with article grid and sidebar */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main content area with article grid */}
          <ArticleList />

          {/* Sidebar with additional content */}
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

// Revalidate the page content every hour to ensure fresh content
export const revalidate = 3600;
