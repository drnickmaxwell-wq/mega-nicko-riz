'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileHeader, MobileNavigation } from './mobile-navigation';
import { PullToRefresh, TouchButton } from './touch-interactions';

interface MobileLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  showPullToRefresh?: boolean;
  onRefresh?: () => Promise<void>;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  currentPath = '/',
  showPullToRefresh = false,
  onRefresh,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle PWA install
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  // Default refresh function
  const defaultRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const handleRefresh = onRefresh || defaultRefresh;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Wave background for brand consistency */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/waves-bg-2560.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-0" />

      {/* Mobile Header */}
      <MobileHeader 
        onMenuToggle={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
        currentPath={currentPath}
      />

      {/* Offline Indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            className="fixed top-16 left-4 right-4 z-40 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                You're offline. Some features may be limited.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 z-40 bg-gradient-to-r from-pink-500 to-teal-500 text-white p-4 rounded-xl shadow-lg"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Install SMH Dental App
                </h3>
                <p className="text-xs opacity-90" style={{ fontFamily: 'Lora, serif' }}>
                  Get quick access to appointments and emergency care
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <TouchButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInstallPrompt(false)}
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Later
                </TouchButton>
                <TouchButton
                  variant="secondary"
                  size="sm"
                  onClick={handleInstallClick}
                  className="bg-white text-pink-600 hover:bg-white/90"
                >
                  Install
                </TouchButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {showPullToRefresh ? (
          <PullToRefresh onRefresh={handleRefresh}>
            {children}
          </PullToRefresh>
        ) : (
          children
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3">
        {/* Emergency Call FAB */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <TouchButton
            variant="primary"
            size="lg"
            onClick={() => window.location.href = 'tel:01273453109'}
            className="w-14 h-14 rounded-full p-0 shadow-lg shadow-pink-500/25"
            hapticFeedback={true}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </TouchButton>
        </motion.div>

        {/* Scroll to Top FAB */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        >
          <TouchButton
            variant="secondary"
            size="md"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full p-0 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </TouchButton>
        </motion.div>
      </div>

      {/* Bottom Safe Area for iOS */}
      <div className="h-safe-area-inset-bottom bg-transparent" />
    </div>
  );
};

// Mobile-optimized page wrapper
interface MobilePageProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

const MobilePage: React.FC<MobilePageProps> = ({
  children,
  title,
  description,
  showBackButton = false,
  onBack,
  className = '',
}) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Page Header */}
      {(title || showBackButton) && (
        <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-4">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <TouchButton
                variant="ghost"
                size="sm"
                onClick={onBack || (() => window.history.back())}
                className="w-10 h-10 p-0 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </TouchButton>
            )}
            
            {title && (
              <div className="flex-1">
                <h1 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {title}
                </h1>
                {description && (
                  <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: 'Lora, serif' }}>
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export { MobileLayout, MobilePage };

