import { useEffect, useState } from 'react';
import { QRGenerator } from '@/app/components/qr-generator';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 splash-screen">
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="splash-logo-wrap">
              <div className="splash-logo-ring" />
              <div className="splash-logo-glow" />
              <img
                src="/logo.svg"
                alt="KweekQR"
                className="h-24 w-24 splash-logo"
              />
            </div>
            <div className="text-2xl font-bold tracking-tight splash-title">
              <span className="text-white">Kweek</span>
              <span className="text-orange-300">QR</span>
            </div>
          </div>
          <div className="absolute bottom-8 text-white text-sm font-medium">
            Made with ❤️ in Tunisia
          </div>
        </div>
      )}
      {!showSplash && (
        <>
          <Header />
          <main className="flex-1">
            <QRGenerator />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
