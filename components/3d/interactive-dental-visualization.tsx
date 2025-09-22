'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Zap, Shield, Heart } from 'lucide-react';

const InteractiveDentalVisualization = () => {
  const [activeDemo, setActiveDemo] = useState('3d-scanning');

  const demos = [
    {
      id: '3d-scanning',
      title: '3D Intraoral Scanning',
      description: 'Experience our revolutionary 3D scanning technology',
      icon: Sparkles,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'ai-diagnosis',
      title: 'AI-Powered Diagnosis',
      description: 'Advanced AI analyzes your dental health instantly',
      icon: Zap,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'smile-preview',
      title: 'Smile Preview Technology',
      description: 'See your perfect smile before treatment begins',
      icon: Heart,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-pink-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-teal-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-teal-400/10 to-yellow-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200 mb-6">
            <Sparkles className="w-5 h-5 text-pink-500 mr-2" />
            <span className="text-sm font-semibold text-slate-700">Interactive Technology</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Interactive
            </span>
            <br />
            <span className="text-slate-800">Dental Visualization</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore interactive demos of our cutting-edge dental technology. 
            See how we're revolutionizing dental care with AI, 3D scanning, and advanced visualization.
          </p>
        </motion.div>

        {/* Interactive Demo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {demos.map((demo, index) => {
              const IconComponent = demo.icon;
              const isActive = activeDemo === demo.id;
              
              return (
                <motion.button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white shadow-xl border-2 border-pink-200' 
                      : 'bg-white/50 hover:bg-white/80 border border-slate-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${demo.color} mr-4 flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {demo.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {demo.description}
                      </p>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-slate-200"
                        >
                          <button className="flex items-center text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                            <Play className="w-4 h-4 mr-2" />
                            Start Interactive Demo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Demo Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl">
              {/* Demo Screen */}
              <div className="bg-gradient-to-br from-pink-500/20 to-teal-500/20 rounded-2xl p-8 mb-6 min-h-[400px] flex items-center justify-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-400/30 to-transparent rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1.2, 1, 1.2],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-teal-400/30 to-transparent rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full"
                  />
                </div>

                {/* Demo Content */}
                <div className="relative z-10 text-center">
                  <motion.div
                    key={activeDemo}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-white"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {demos.find(d => d.id === activeDemo)?.title}
                    </h3>
                    <p className="text-white/80 mb-6">
                      Interactive demo loading...
                    </p>
                    <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-teal-600 transition-colors shadow-lg">
                      Start Demo
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Demo Controls */}
              <div className="flex items-center justify-between text-white/60">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm">
                  Interactive Demo • 3D Technology
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg"
            />
            
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full shadow-lg"
            />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-full font-bold text-lg hover:from-pink-600 hover:to-teal-600 transition-colors shadow-xl">
            <Sparkles className="w-6 h-6 mr-3" />
            Learn More About Our Technology
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDentalVisualization;

