import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsAppButton } from './FloatingWhatsAppButton';

export function Layout() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 80);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [hash, pathname]);

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="relative z-10 flex-1">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <FloatingWhatsAppButton />
    </div>
  );
}
