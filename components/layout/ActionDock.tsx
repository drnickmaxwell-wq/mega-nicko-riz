'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ActionDock() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: '📞', label: 'Call Now', color: 'from-red-500 to-orange-500', action: () => window.open('tel:01273453109') },
    { icon: '💬', label: 'Chat', color: 'from-blue-500 to-cyan-500', action: () => {} },
    { icon: '📅', label: 'Book', color: 'from-[var(--magenta)] to-[var(--turquoise)]', action: () => {} },
    { icon: '🚨', label: 'Emergency', color: 'from-red-600 to-red-700', action: () => window.open('tel:01273453109') },
  ];

  return (
    <>
      {/* Mobile Action Dock */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white/90 dark:bg-[#0B1020]/90 backdrop-blur-xl border-t border-white/20 dark:border-white/10 px-4 py-3">
          <div className="flex items-center justify-around max-w-sm mx-auto">
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-lg min-w-[60px]`}
              >
                <span className="text-lg">{action.icon}</span>
                <span className="text-xs font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Floating Action Buttons */}
      <div className="hidden md:block fixed right-6 bottom-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <span className="text-xl">{action.icon}</span>
                  <span className="font-medium whitespace-nowrap">{action.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--magenta)] to-[var(--turquoise)] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-xl"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? '✕' : '⚡'}
          </motion.span>
        </motion.button>
      </div>

      {/* Emergency Floating Button */}
      <motion.div
        className="fixed left-6 bottom-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('tel:01273453109')}
          className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="text-2xl"
          >
            🚨
          </motion.span>
          
          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Tooltip */}
          <div className="absolute left-full ml-4 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Emergency: 01273 453109
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45" />
          </div>
        </motion.button>
      </motion.div>

      {/* Quick Actions Hint */}
      <motion.div
        className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="bg-white/90 dark:bg-[#0B1020]/90 backdrop-blur-xl rounded-lg px-4 py-2 shadow-lg border border-white/20 dark:border-white/10">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Quick Actions</p>
          <div className="flex items-center gap-2 mt-1">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg"
            >
              👆
            </motion.div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Click the ⚡ button</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
