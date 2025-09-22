'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import StickyHeader from './sticky-header';
import { ScrollProgress } from '@/components/effects/parallax-scroll';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

// Lazy load components for performance
const Footer = lazy(() => import('./FooterFuture'));
const FloatingActionButtons = lazy(() => import('@/components/ui/floating-action-buttons'));

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showFloatingButtons?: boolean;
  className?: string;
}

// Brand-consistent loading component
function BrandLoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 border-4 border-transparent rounded-full"
        style={{
          borderTopColor: '#C2185B',
          borderRightColor: '#40C4B4',
          borderBottomColor: '#D4AF37',
          borderLeftColor: 'transparent'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span 
        className="ml-3 text-slate-600"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        Loading...
      </span>
    </div>
  );
}

// Brand-consistent error boundary
function BrandErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-teal-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-pink-100 max-w-md mx-4">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>!</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Something went wrong
        </h2>
        <p className="text-slate-600 mb-4" style={{ fontFamily: 'Lora, serif' }}>
          We're experiencing a temporary issue. Please refresh the page or contact us directly.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-teal-600 transition-all duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Refresh Page
          </button>
          <a
            href="tel:01273453109"
            className="block w-full px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-lg font-medium hover:from-slate-200 hover:to-slate-300 transition-all duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Call Us: 01273 453109
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PerformanceOptimizedLayout({
  children,
  showHeader = true,
  showFooter = true,
  showFloatingButtons = true,
  className = ''
}: PerformanceOptimizedLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress className="fixed top-0 left-0 right-0 z-50" />
      
      {/* Sticky Header */}
      {showHeader && (
        <Suspense fallback={<BrandLoadingSpinner />}>
          <StickyHeader />
        </Suspense>
      )}
      
      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && (
        <Suspense fallback={<BrandLoadingSpinner />}>
          <Footer />
        </Suspense>
      )}
      
      {/* Floating Action Buttons */}
      {showFloatingButtons && (
        <Suspense fallback={null}>
          <FloatingActionButtons />
        </Suspense>
      )}
    </div>
  );
}

