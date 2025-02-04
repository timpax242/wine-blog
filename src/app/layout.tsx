import './globals.css';
import { Inter, Lobster } from 'next/font/google';
import Header from '../components/header';
import Footer from '../components/footer';

// Load Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });
// Load Lobster font with Latin subset
const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
});

// Define metadata for SEO
export const metadata = {
  title: 'Korkkikierre',
  description: 'Suomen johtava viiniblogi',
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <head>{/* Load Lobster font for decorative headings */}</head>
      <body className={`${inter.className} ${lobster.variable}`}>
        <div className="min-h-screen bg-stone-100 flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
