import Header from '../components/header';
import Hero from '../components/hero';
import ArticleList from '../components/article-list';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

export default function KorkkikierreFrontPage() {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <ArticleList />
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
