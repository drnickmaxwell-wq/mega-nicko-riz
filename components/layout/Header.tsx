'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Calendar } from 'lucide-react';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Fees & Plan', href: '/fees' },
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
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all',
        'backdrop-blur-md',
        scrolled ? 'bg-white/65 dark:bg-zinc-900/65 shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'bg-white/40 dark:bg-zinc-900/40',
      ].join(' ')}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 rounded-md">
          <span className="font-semibold tracking-[0.02em]">St Mary’s House</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 rounded-md px-1 py-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-pink-500 to-teal-400 text-white shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
          >
            <Calendar className="w-4 h-4" />
            Book
          </Link>
          <a
            href="tel:+441273453109"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-white/80 dark:bg-white/10 ring-1 ring-black/10 dark:ring-white/10 hover:bg-white/90 dark:hover:bg-white/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
          >
            <Phone className="w-4 h-4" />
            01273 453 109
          </a>
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

      {/* Right-side sheet */}
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
            className="fixed right-0 top-0 bottom-0 z-[61] w-[80vw] max-w-sm bg-white dark:bg-zinc-900 shadow-xl ring-1 ring-black/10 dark:ring-white/10 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold tracking-[0.02em]">Menu</span>
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
                  className="rounded-md px-2 py-2 text-foreground/90 hover:bg-black/5 dark:hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-pink-500 to-teal-400 text-white shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400"
              >
                <Calendar className="w-4 h-4" />
                Book
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
    </header>
  );
}
