import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-700 shadow-md px-6 py-4 flex flex-col md:flex-row items-center justify-between">
      {/* Top section: Brand + Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">
        CertifyNow
        </Link>
        {/* Hamburger icon (hidden on desktop) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu links: vertical on mobile, horizontal on desktop */}
      <div
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row md:items-center md:justify-end md:space-x-6 mt-4 md:mt-0`}
      >
        {[
          { path: '/', label: 'Home' },
           { path: '/about', label: 'About Us' },
          { path: '/create', label: 'Create' },
          { path: '/verify', label: 'Verify' },
          { path: '/view', label: 'View' }
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)} // close on mobile click
            className={`block py-2 md:py-0 text-sm font-medium ${
              isActive(link.path)
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700 dark:text-white'
            } hover:text-blue-600`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
