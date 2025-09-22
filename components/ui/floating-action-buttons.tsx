'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, MessageCircle, ArrowUp, MapPin, Clock } from 'lucide-react';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

interface FloatingActionButtonsProps {
  className?: string;
}

export default function FloatingActionButtons({ className = '' }: FloatingActionButtonsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actionButtons = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Now',
      action: () => window.open('tel:01273453109'),
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'from-pink-600 to-pink-700'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Book Consultation',
      action: () => window.location.href = '/contact',
      color: 'from-teal-500 to-teal-600',
      hoverColor: 'from-teal-600 to-teal-700'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'AI Chat',
      action: () => window.location.href = '/ai-smile-quiz',
      color: 'from-yellow-500 to-yellow-600',
      hoverColor: 'from-yellow-600 to-yellow-700'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Directions',
      action: () => window.open('https://maps.google.com/?q=Shoreham-by-Sea+Dental+Practice'),
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700'
    }
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
      {/* Main Action Buttons */}
      <div className="flex flex-col items-end space-y-3 mb-4">
        <AnimatePresence>
          {isExpanded && actionButtons.map((button, index) => (
            <motion.div
              key={button.label}
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: 20 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className="flex items-center space-x-3"
            >
              {/* Button Label */}
              <motion.div
                className="bg-white/95 backdrop-blur-lg px-3 py-2 rounded-lg shadow-lg border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <span 
                  className="text-sm font-medium text-slate-700 whitespace-nowrap"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {button.label}
                </span>
              </motion.div>

              {/* Action Button */}
              <motion.button
                onClick={button.action}
                className={`w-12 h-12 bg-gradient-to-r ${button.color} hover:${button.hoverColor} text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {button.icon}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Emergency Call Button - Always Visible */}
      <div className="flex items-center space-x-3 mb-3">
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/95 backdrop-blur-lg px-3 py-2 rounded-lg shadow-lg border border-white/20"
            >
              <span 
                className="text-sm font-medium text-slate-700 whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Emergency: 01273 453109
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => window.open('tel:01273453109')}
          className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(239, 68, 68, 0.4)',
              '0 0 0 10px rgba(239, 68, 68, 0)',
              '0 0 0 0 rgba(239, 68, 68, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Phone className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Menu Toggle Button */}
      <div className="flex items-center space-x-3 mb-3">
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/95 backdrop-blur-lg px-3 py-2 rounded-lg shadow-lg border border-white/20"
            >
              <span 
                className="text-sm font-medium text-slate-700 whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Quick Actions
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-pink-500 via-teal-500 to-yellow-500 hover:from-pink-600 hover:via-teal-600 hover:to-yellow-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-6 h-6 relative">
              <motion.div
                className="absolute top-2 left-1 w-4 h-0.5 bg-white rounded-full"
                animate={{ 
                  rotate: isExpanded ? 45 : 0,
                  y: isExpanded ? 2 : 0
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute top-3 left-1 w-4 h-0.5 bg-white rounded-full"
                animate={{ 
                  opacity: isExpanded ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute top-4 left-1 w-4 h-0.5 bg-white rounded-full"
                animate={{ 
                  rotate: isExpanded ? -45 : 0,
                  y: isExpanded ? -2 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.button>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-lg px-3 py-2 rounded-lg shadow-lg border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <span 
                className="text-sm font-medium text-slate-700 whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Back to Top
              </span>
            </motion.div>

            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Operating Hours Indicator */}
      <motion.div
        className="mt-4 bg-white/95 backdrop-blur-lg px-3 py-2 rounded-lg shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-green-500" />
          <span 
            className="text-xs font-medium text-slate-700"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Open Today 9AM-5PM
          </span>
        </div>
      </motion.div>
    </div>
  );
}

