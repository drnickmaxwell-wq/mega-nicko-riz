'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About ▼', href: '/about' },
  { label: 'Treatments ▼', href: '/treatments' },
  { label: 'Team', href: '/team' },
  { label: 'Patient Stories', href: '/patient-stories' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#0B1020]/90 border-b border-white/20 dark:border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Emergency Bar */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-6">
        <div className="max-w-[var(--content)] mx-auto flex items-center justify-between text-sm">
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-2">
              📞 Emergency: 01273 453109
            </span>
            <span className="flex items-center gap-2">
              📍 Shoreham-by-Sea, West Sussex
            </span>
            <span className="flex items-center gap-2">
              🕒 24/7 Emergency Care
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full text-xs font-semibold transition-colors"
            >
              Emergency: 01273 453109
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[var(--turquoise)] hover:bg-teal-600 px-4 py-1 rounded-full text-xs font-semibold transition-colors"
            >
              Book Consultation
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-6 py-4">
        <div className="max-w-[var(--content)] mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--magenta)] to-[var(--turquoise)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pink-500/25">
              SMH
            </div>
            <div>
              <h1 className="font-bold text-[var(--ink)] dark:text-white text-lg">St Mary's House</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Dental Care</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item, index) => (
              <motion.div key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[var(--magenta)] dark:hover:text-pink-400 font-medium transition-colors relative group"
                >
                  <motion.span whileHover={{ y: -2 }}>
                    {item.label}
                  </motion.span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--magenta)] to-[var(--turquoise)] group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              📞 Call Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(194, 24, 91, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[var(--magenta)] to-[var(--turquoise)] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              📅 Book Free Consultation
            </motion.button>
          </div>

          {/* Mobile: hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            className="fixed right-0 top-0 bottom-0 z-[61] w-[80vw] max-w-sm bg-white dark:bg-[#0B1020] shadow-xl ring-1 ring-black/10 dark:ring-white/10 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold tracking-[0.02em] text-[var(--ink)] dark:text-white">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex w-9 h-9 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-[var(--ink)] dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-[var(--magenta)] to-[var(--turquoise)] text-white shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
              </Link>
              <a
                href="tel:+441273453109"
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium bg-white/80 dark:bg-white/10 ring-1 ring-black/10 dark:ring-white/10 hover:bg-white/90 dark:hover:bg-white/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
              >
                <Phone className="w-4 h-4" />
                01273 453 109
              </a>
            </div>
          </aside>
        </>
      )}
    </motion.header>
  );
}
