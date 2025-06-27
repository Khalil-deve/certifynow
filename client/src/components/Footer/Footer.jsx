import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import NewsletterForm from "./NewsletterForm";


export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        <FooterBrand />
        <FooterLinks />
        <FooterContact />
        <NewsletterForm />
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-sm text-center">
        © {new Date().getFullYear()} CertifyNow. All rights reserved.
      </div>
    </footer>
  );
}
