import { Mail, Github, Linkedin } from 'lucide-react';

export default function FooterContact() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Us</h3>
      <p className="text-sm text-gray-400 mb-4 flex items-center justify-center md:justify-start gap-2">
        <Mail className="w-4 h-4 text-brand-orange" />
        <span>support@certifynow.com</span>
      </p>
      <div className="flex justify-center md:justify-start space-x-3">
        {[
          { href: "https://github.com/khalil-deve", icon: <Github className="w-5 h-5" />, label: "GitHub" },
          { href: "https://linkedin.com/in/khalil-dev", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" }
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-gray-400 hover:text-brand-orange hover:bg-brand-navy-card p-2 rounded-lg transition-all duration-200"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
