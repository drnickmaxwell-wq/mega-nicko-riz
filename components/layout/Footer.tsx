'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer 
      className="relative bg-gradient-to-br from-[var(--ink)] to-slate-900 dark:from-[#0B1020] dark:to-black text-white py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[var(--content)] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Practice Info */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--magenta)] to-[var(--turquoise)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pink-500/25">
                SMH
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">St Mary&apos;s House</h3>
                <p className="text-sm text-[var(--turquoise)]">Dental Care</p>
              </div>
            </motion.div>
            <p className="text-gray-300 leading-relaxed">
              Experience the future of cosmetic dentistry with our revolutionary 3D visualization technology and award-winning luxury care in beautiful Shoreham-by-Sea.
            </p>
            <div className="flex gap-4 mt-6">
              {['📧', '📱', '🌐', '📍'].map((icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl cursor-pointer hover:bg-white/20 transition-colors"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--turquoise)] mb-6">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              {['About Us', 'Treatments', 'Our Team', 'Patient Stories', 'Blog', 'Emergency Care'].map((item) => (
                <motion.div key={item} whileHover={{ x: 5 }}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-[var(--turquoise)] transition-colors block"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--turquoise)] mb-6">Contact</h4>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-[var(--turquoise)] text-lg">📍</span>
                <div className="text-gray-300">
                  <p>St Mary&apos;s House</p>
                  <p>High Street, Shoreham-by-Sea</p>
                  <p>West Sussex BN43 5DA</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-[var(--turquoise)] text-lg">📞</span>
                <span className="text-gray-300">01273 453109</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-[var(--turquoise)] text-lg">📧</span>
                <span className="text-gray-300">hello@stmaryshousedental.co.uk</span>
              </motion.div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--turquoise)] mb-6">Opening Hours</h4>
            <div className="space-y-3 text-gray-300">
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
              <motion.div 
                className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-700"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-red-300 text-sm font-medium">
                  🚨 24/7 Emergency: 01273 453109
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 St Mary&apos;s House Dental Care. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[var(--turquoise)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[var(--turquoise)] transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[var(--turquoise)] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--turquoise)] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.footer>
  );
}

