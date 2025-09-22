'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  ChevronDown,
  MapPin,
  Clock,
  Star
} from 'lucide-react';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

interface StickyHeaderProps {
  className?: string;
}

export default function StickyHeader({ className = '' }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerScale = useTransform(scrollY, [0, 100], [1.02, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'About', 
      href: '/about',
      dropdown: [
        { name: 'Our Practice', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Technology', href: '/3d-showcase' },
        { name: 'Patient Stories', href: '/patient-stories' }
      ]
    },
    { 
      name: 'Treatments', 
      href: '/treatments',
      dropdown: [
        { name: 'All Treatments', href: '/treatments' },
        { name: '3D Digital Dentistry', href: '/treatments/3d-dentistry' },
        { name: 'Porcelain Veneers', href: '/treatments/veneers' },
        { name: 'Dental Implants', href: '/treatments/implants' },
        { name: 'Teeth Whitening', href: '/treatments/whitening' },
        { name: 'Emergency Dentist', href: '/emergency-dentist' },
        { name: 'Anxiety Dentistry', href: '/anxiety-dentistry' }
      ]
    },
    { name: 'Team', href: '/team' },
    { name: 'Patient Stories', href: '/patient-stories' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Emergency Banner */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 text-center text-sm relative z-50"
      >
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Emergency: 01273 453109</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span style={{ fontFamily: 'Lora, serif' }}>Shoreham-by-Sea, West Sussex</span>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span style={{ fontFamily: 'Lora, serif' }}>24/7 Emergency Care</span>
          </div>
        </div>
      </motion.div>

      {/* Main Sticky Header */}
      <motion.header
        style={{ 
          opacity: headerOpacity,
          scale: headerScale,
        }}
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-pink-100' 
            : 'bg-white/90 backdrop-blur-md shadow-lg'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div 
              style={{ scale: logoScale }}
              className="flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-teal-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    SMH
                  </span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    St Mary's House
                  </h1>
                  <p className="text-sm text-slate-600" style={{ fontFamily: 'Lora, serif' }}>
                    Dental Care
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-slate-700 hover:text-pink-600 transition-colors duration-200 font-medium"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-pink-100 py-2 z-50"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-slate-700 hover:text-pink-600 hover:bg-pink-50/50 transition-all duration-200"
                            style={{ fontFamily: 'Lora, serif' }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.a
                href="tel:01273453109"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full hover:from-slate-200 hover:to-slate-300 transition-all duration-200 border border-slate-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Call Now
                </span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-full hover:from-pink-600 hover:to-teal-600 transition-all duration-200 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Book Free Consultation
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-pink-500 to-teal-500 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-pink-100"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-slate-700 hover:text-pink-600 transition-colors duration-200 font-medium"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-1 text-sm text-slate-600 hover:text-pink-600 transition-colors duration-200"
                            style={{ fontFamily: 'Lora, serif' }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="pt-4 space-y-3">
                  <motion.a
                    href="tel:01273453109"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Call Now
                    </span>
                  </motion.a>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-full"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Book Free Consultation
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-24" />
    </>
  );
}

