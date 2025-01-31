import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/header';
import Footer from '../components/footer';

// Load Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

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
      <head>
        {/* Load Lobster font for decorative headings */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {/* Main layout structure */}
        <div className="min-h-screen bg-stone-100 flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
