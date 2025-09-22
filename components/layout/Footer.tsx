'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Practice Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SMH</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">St Mary&apos;s House</h3>
                <p className="text-sm text-teal-300">Dental Care</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Luxury coastal dental care in the heart of Shoreham-by-Sea. 
              Experience advanced 3D dentistry with AI-powered diagnostics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-teal-300">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-slate-300 hover:text-teal-300 transition-colors">
                About Us
              </Link>
              <Link href="/treatments" className="text-slate-300 hover:text-teal-300 transition-colors">
                Treatments
              </Link>
              <Link href="/team" className="text-slate-300 hover:text-teal-300 transition-colors">
                Our Team
              </Link>
              <Link href="/emergency-dentist" className="text-slate-300 hover:text-teal-300 transition-colors">
                Emergency Care
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-teal-300">Contact</h4>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p>St Mary&apos;s House</p>
                  <p>High Street, Shoreham-by-Sea</p>
                  <p>West Sussex BN43 5DA</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p>01273 123 456</p>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p>hello@stmaryshousedental.co.uk</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-teal-300">Opening Hours</h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 - 15:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Emergency Only</span>
              </div>
              <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-700">
                <p className="text-red-300 text-sm font-medium">
                  24/7 Emergency Line: 07123 456 789
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 St Mary&apos;s House Dental Care. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-teal-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-teal-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-teal-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

