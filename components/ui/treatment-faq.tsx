'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Clock, 
  DollarSign, 
  Shield, 
  Star,
  CheckCircle,
  AlertCircle,
  Heart,
  Sparkles
} from 'lucide-react';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'cost' | 'procedure' | 'recovery' | 'maintenance';
  icon: React.ReactNode;
  popular: boolean;
}

interface TreatmentFAQProps {
  treatmentName: string;
  faqs: FAQ[];
}

export default function TreatmentFAQ({ treatmentName, faqs }: TreatmentFAQProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', name: 'General Info', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'procedure', name: 'Procedure', icon: <Star className="w-4 h-4" /> },
    { id: 'cost', name: 'Cost & Insurance', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'recovery', name: 'Recovery', icon: <Heart className="w-4 h-4" /> },
    { id: 'maintenance', name: 'Maintenance', icon: <Shield className="w-4 h-4" /> }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Wave Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/waves-bg-2560.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Brand Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-teal-50/80" />

      {/* Micro-Bubble Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-pink-400/30' : 
              i % 3 === 1 ? 'bg-teal-400/30' : 'bg-yellow-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-12 h-12 text-pink-600 mr-4" />
            <h2 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600 bg-clip-text text-transparent"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {treatmentName} FAQ
            </h2>
          </div>
          
          <p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Get answers to the most commonly asked questions about {treatmentName.toLowerCase()} 
            treatment at St Mary's House Dental Care.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-teal-500 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white hover:text-pink-600 border border-slate-200'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <motion.button
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-pink-50 hover:to-teal-50 transition-all duration-300"
                onClick={() => toggleFAQ(faq.id)}
                whileHover={{ paddingLeft: '2rem' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center flex-1">
                  <div className={`p-3 rounded-full mr-4 ${
                    faq.popular 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                      : 'bg-gradient-to-r from-pink-400 to-teal-400'
                  }`}>
                    {faq.popular ? (
                      <Sparkles className="w-5 h-5 text-white" />
                    ) : (
                      <div className="text-white">{faq.icon}</div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-bold text-slate-800 mb-1"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {faq.question}
                      {faq.popular && (
                        <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                
                <motion.div
                  animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4"
                >
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="bg-gradient-to-r from-pink-50 to-teal-50 rounded-xl p-6 border-l-4 border-gradient-to-b border-pink-400">
                        <motion.p 
                          className="text-slate-700 leading-relaxed"
                          style={{ fontFamily: 'Lora, serif' }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          {faq.answer}
                        </motion.p>
                        
                        {/* Additional Info for Popular FAQs */}
                        {faq.popular && (
                          <motion.div
                            className="mt-4 pt-4 border-t border-slate-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <div className="flex items-center text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                This is one of our most frequently asked questions
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFAQs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 
              className="text-xl font-bold text-slate-600 mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              No questions found in this category
            </h3>
            <p 
              className="text-slate-500"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Try selecting a different category or view all questions
            </p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 
              className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-teal-600 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Still Have Questions?
            </h3>
            <p 
              className="text-slate-600 mb-6 leading-relaxed"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Our dental experts are here to help. Book a free consultation to discuss 
              your {treatmentName.toLowerCase()} treatment options in detail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(194, 24, 91, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                📅 Book Free Consultation
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(64, 196, 180, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                📞 Call Now: 01273 453109
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

