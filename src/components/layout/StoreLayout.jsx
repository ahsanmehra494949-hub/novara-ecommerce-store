import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import AnnouncementBar from './AnnouncementBar';
import ScrollToTopButton from '../common/ScrollToTopButton';
import WhatsAppButton from '../common/WhatsAppButton';

export default function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  );
}
