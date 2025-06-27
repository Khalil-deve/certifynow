import { Link } from 'react-router-dom';

export default function FooterLinks() {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Quick Links</h3>
      <ul className="space-y-1 text-sm">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
        <li><Link to="/create" className="hover:text-blue-600">Create Certificate</Link></li>
        <li><Link to="/verify" className="hover:text-blue-600">Verify Certificate</Link></li>
        <li><Link to="/view" className="hover:text-blue-600">View Records</Link></li>
      </ul>
    </div>
  );
}
