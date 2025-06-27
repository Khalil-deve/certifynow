import { Mail, Github, Linkedin } from 'lucide-react';

export default function FooterContact() {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Contact Us</h3>
      <p className="text-sm mb-3 flex items-center justify-center md:justify-start">
        <Mail className="w-4 h-4 mr-2" />
        support@certifynow.com
      </p>
      <div className="flex justify-center md:justify-start space-x-4">
        <a href="https://github.com/khalil-deve" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/khalil-dev" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
