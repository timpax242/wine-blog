import Header from '../components/header';
import Hero from '../components/hero';
import ArticleList from '../components/article-list';
import Sidebar from '../components/sidebar';

export default function KorkkikierreFrontPage() {
  return (
    <main className="flex-grow">
      <Hero />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <ArticleList />
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600; // Revalidate every hour
