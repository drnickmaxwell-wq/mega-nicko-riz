'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { TouchButton } from './touch-interactions';

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPath?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onToggle,
  currentPath = '/',
}) => {
  const [activeSection, setActiveSection] = useState('');

  // Navigation items with brand-consistent icons
  const navigationItems = [
    {
      label: 'Home',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Treatments',
      href: '/treatments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      submenu: [
        { label: '3D Digital Dentistry', href: '/treatments/3d-dentistry' },
        { label: 'Porcelain Veneers', href: '/treatments/veneers' },
        { label: 'Dental Implants', href: '/treatments/implants' },
        { label: 'Teeth Whitening', href: '/treatments/whitening' },
      ],
    },
    {
      label: 'About',
      href: '/about',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Team',
      href: '/team',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Patient Stories',
      href: '/patient-stories',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      label: 'Blog',
      href: '/blog',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // Emergency and special actions
  const emergencyActions = [
    {
      label: 'Emergency Call',
      href: 'tel:01273453109',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      variant: 'emergency' as const,
    },
    {
      label: 'Book Consultation',
      href: '/contact',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      variant: 'primary' as const,
    },
    {
      label: 'AI Smile Quiz',
      href: '/ai-smile-quiz',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      variant: 'secondary' as const,
    },
  ];

  // Close menu when clicking outside or on navigation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleItemClick = () => {
    onToggle();
    setActiveSection('');
  };

  const toggleSubmenu = (label: string) => {
    setActiveSection(activeSection === label ? '' : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />

          {/* Navigation Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-y-auto"
            style={{
              backgroundImage: 'url(/waves-bg-2560.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Background overlay for readability */}
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />

            {/* Content */}
            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  {/* SMH Logo */}
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      SMH
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      St Mary's House
                    </h2>
                    <p className="text-sm text-slate-600" style={{ fontFamily: 'Lora, serif' }}>
                      Dental Care
                    </p>
                  </div>
                </div>

                {/* Close button */}
                <TouchButton
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="w-10 h-10 p-0 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </TouchButton>
              </div>

              {/* Emergency Actions */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {emergencyActions.map((action) => (
                    <Link key={action.label} href={action.href} onClick={handleItemClick}>
                      <TouchButton
                        variant={action.variant}
                        size="md"
                        className="w-full justify-start"
                      >
                        <div className="flex items-center space-x-3">
                          {action.icon}
                          <span>{action.label}</span>
                        </div>
                      </TouchButton>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Navigation Items */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Navigation
                </h3>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <div key={item.label}>
                      {/* Main navigation item */}
                      <div
                        className={`
                          flex items-center justify-between p-3 rounded-xl transition-all duration-200
                          ${currentPath === item.href 
                            ? 'bg-gradient-to-r from-pink-50 to-teal-50 border border-pink-200' 
                            : 'hover:bg-slate-50'
                          }
                        `}
                        onClick={() => {
                          if (item.submenu) {
                            toggleSubmenu(item.label);
                          } else {
                            handleItemClick();
                          }
                        }}
                      >
                        <Link href={item.href} className="flex items-center space-x-3 flex-1">
                          <div className={`
                            p-2 rounded-lg
                            ${currentPath === item.href 
                              ? 'bg-gradient-to-r from-pink-500 to-teal-500 text-white' 
                              : 'bg-slate-100 text-slate-600'
                            }
                          `}>
                            {item.icon}
                          </div>
                          <span className={`
                            font-medium
                            ${currentPath === item.href ? 'text-pink-600' : 'text-slate-700'}
                          `} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {item.label}
                          </span>
                        </Link>

                        {/* Submenu toggle */}
                        {item.submenu && (
                          <motion.div
                            animate={{ rotate: activeSection === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>

                      {/* Submenu */}
                      <AnimatePresence>
                        {item.submenu && activeSection === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 mt-2 space-y-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={handleItemClick}
                                  className={`
                                    block p-3 rounded-lg transition-all duration-200
                                    ${currentPath === subItem.href 
                                      ? 'bg-gradient-to-r from-pink-50 to-teal-50 text-pink-600 border-l-2 border-pink-500' 
                                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                                    }
                                  `}
                                >
                                  <span className="text-sm" style={{ fontFamily: 'Lora, serif' }}>
                                    {subItem.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Contact Info
                </h3>
                <div className="space-y-3 text-sm" style={{ fontFamily: 'Lora, serif' }}>
                  <div className="flex items-center space-x-3 text-slate-600">
                    <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>01273 453109</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600">
                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Shoreham-by-Sea, West Sussex</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Mobile Header Component
interface MobileHeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  onMenuToggle,
  isMenuOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-30 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              SMH
            </span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              St Mary's House
            </h1>
          </div>
        </Link>

        {/* Emergency Call Button */}
        <div className="flex items-center space-x-2">
          <TouchButton
            variant="primary"
            size="sm"
            onClick={() => window.location.href = 'tel:01273453109'}
            className="hidden sm:flex"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Emergency
          </TouchButton>

          {/* Menu Toggle */}
          <TouchButton
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="w-10 h-10 p-0 rounded-full"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </TouchButton>
        </div>
      </div>
    </motion.header>
  );
};

export { MobileNavigation, MobileHeader };

