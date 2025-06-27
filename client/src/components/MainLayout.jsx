import Navbar from './Navbar';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 py-6 bg-gray-50 dark:bg-gray-400 transition-colors">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
