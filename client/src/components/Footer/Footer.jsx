import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import NewsletterForm from "./NewsletterForm";


export default function Footer() {
  return (
    <footer className="bg-brand-navy-dark text-gray-400 mt-auto border-t border-brand-navy-card">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        <FooterBrand />
        <FooterLinks />
        <FooterContact />
        <NewsletterForm />
      </div>
      <div className="border-t border-brand-navy-card py-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} CertifyNow. All rights reserved.
      </div>
    </footer>
  );
}
