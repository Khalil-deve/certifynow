import { Link } from 'react-router-dom';

export default function FooterLinks() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About Us" },
          { to: "/create", label: "Create Certificate" },
          { to: "/verify", label: "Verify Certificate" },
          { to: "/view", label: "View Records" }
        ].map((link, idx) => (
          <li key={idx}>
            <Link to={link.to} className="text-gray-400 hover:text-brand-orange transition-colors duration-200">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
