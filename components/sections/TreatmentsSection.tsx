'use client';

import { motion } from 'framer-motion';

export default function TreatmentsSection() {
  const treatments = [
    {
      icon: '🦷',
      title: '3D Digital Dentistry',
      description: 'Experience the future with our cutting-edge 3D scanning and treatment planning.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💎',
      title: 'Porcelain Veneers',
      description: 'Transform your smile with our luxury porcelain veneers and cosmetic treatments.',
      gradient: 'from-[var(--magenta)] to-purple-500'
    },
    {
      icon: '⭐',
      title: 'Dental Implants',
      description: 'Restore your confidence with our premium dental implant solutions.',
      gradient: 'from-[var(--gold)] to-orange-500'
    },
    {
      icon: '🌊',
      title: 'AI Diagnostics',
      description: 'Advanced AI-powered dental analysis for precise treatment planning.',
      gradient: 'from-[var(--turquoise)] to-teal-500'
    },
    {
      icon: '✨',
      title: 'Luxury Materials',
      description: 'Premium porcelain and ceramics for lasting, beautiful results.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: '🏖️',
      title: 'Coastal Serenity',
      description: 'Relaxing seaside environment for a calming dental experience.',
      gradient: 'from-sky-500 to-blue-500'
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[var(--bg)] to-gray-50 dark:from-[#0B1020] dark:to-slate-900 relative overflow-hidden">
      <div className="max-w-[var(--content)] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[var(--magenta)] to-[var(--turquoise)] bg-clip-text text-transparent">
              Luxury Coastal Dentistry
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where Innovation Meets Elegance
          </p>
        </motion.div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow Card */}
              <div className="relative p-8 rounded-[var(--radius)] bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                {/* Gold Hover Tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/10 to-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Circular Gradient Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${treatment.gradient} flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {treatment.icon}
                </motion.div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className="text-xl font-bold text-[var(--ink)] dark:text-white mb-4">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {treatment.description}
                  </p>
                  
                  {/* Learn More CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--gold)] to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all group-hover:from-[var(--magenta)] group-hover:to-[var(--turquoise)]"
                  >
                    Learn more
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>

                {/* Floating Geometric Shapes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${15 + i * 25}%`,
                        top: `${10 + i * 15}%`,
                      }}
                      animate={{
                        y: [-15, 15, -15],
                        rotate: [0, 180, 360],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      {i % 2 === 0 ? (
                        <div className="w-2 h-2 bg-[var(--turquoise)] rounded-full" />
                      ) : (
                        <div className="w-2 h-2 bg-[var(--gold)] rotate-45" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-[var(--magenta)] to-[var(--turquoise)] rounded-full opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-15, 15, -15],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


