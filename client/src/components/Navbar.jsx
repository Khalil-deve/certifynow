import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Award } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm px-6 py-4 flex flex-col md:flex-row items-center justify-between">
      {/* Top section: Brand + Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900">
          <div className="bg-brand-orange text-white p-2 rounded-xl shadow-md shadow-brand-orange/20">
            <Award size={24} />
          </div>
          <span>
            Certify<span className="text-brand-orange">Now</span>
          </span>
        </Link>
        {/* Hamburger icon (hidden on desktop) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-brand-orange focus:outline-none p-1.5 rounded-lg border border-gray-100"
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
        } flex-col w-full md:w-auto md:flex md:flex-row md:items-center md:justify-end md:space-x-8 mt-4 md:mt-0`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-3 md:space-y-0 py-2 md:py-0">
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About Us' },
            { path: '/verify', label: 'Verify' },
            { path: '/view', label: 'View Records' }
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)} // close on mobile click
              className={`relative py-1 text-sm font-medium tracking-wide transition-all duration-200 hover:text-brand-orange ${
                isActive(link.path)
                  ? 'text-brand-orange font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange rounded-full hidden md:block" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button in Navbar */}
        <div className="pt-2 md:pt-0">
          <Link
            to="/create"
            onClick={() => setMenuOpen(false)}
            className="inline-flex w-full md:w-auto items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-xl shadow-lg shadow-brand-orange/20 transition-all duration-200 active:scale-95 text-center"
          >
            Create Certificate
          </Link>
        </div>
      </div>
    </nav>
  );
}
