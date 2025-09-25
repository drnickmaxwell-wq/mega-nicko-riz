'use client';

import { motion } from 'framer-motion';
import WaveBackground from '@/components/fx/WaveBackground';

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Full-width Wave Background */}
      <WaveBackground />
      
      {/* Content */}
      <div className="relative z-10 max-w-[var(--content)] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Shimmer Text Heading */}
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] via-white to-[var(--gold)] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Ready for Your Perfect Smile?
              </span>
              <span className="relative bg-gradient-to-r from-[var(--gold)] to-[var(--turquoise)] bg-clip-text text-transparent">
                Ready for Your Perfect Smile?
              </span>
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of dental care with our revolutionary 3D visualization technology and luxury coastal environment.
          </motion.p>
          
          {/* Sparkle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(194, 24, 91, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/contact'}
            className="group relative px-12 py-6 bg-gradient-to-r from-[var(--magenta)] to-[var(--turquoise)] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
          >
            {/* Sparkle Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-3">
              ✨ Book Your Free Consultation
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            
            {/* Shimmer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
          
          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">📞</span>
              <span>01273 453109</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚨</span>
              <span>24/7 Emergency Care</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>CQC Outstanding</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-[var(--gold)] to-[var(--turquoise)] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-40, 40, -40],
              x: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </section>
  );
}
