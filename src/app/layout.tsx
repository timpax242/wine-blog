import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/header';
import Footer from '../components/footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Korkkikierre',
  description: 'Suomen johtava viiniblogi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-stone-100 flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
