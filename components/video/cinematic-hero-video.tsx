'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';

// Floating Particle Component
function FloatingParticle({ delay = 0, color = '#D4AF37' }: { delay?: number; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
      animate={{
        opacity: [0, 1, 0],
        y: -100,
        x: Math.random() * 200 - 100,
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
      className="absolute w-1 h-1 rounded-full"
      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
    />
  );
}

// Shimmer Text Component
function ShimmerText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span 
      className={`bg-gradient-to-r from-white via-yellow-200 to-white bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,215,0,1) 25%, rgba(255,255,255,1) 50%, rgba(255,215,0,1) 75%, rgba(255,255,255,0.8) 100%)',
        animation: 'shimmer 3s ease-in-out infinite'
      }}
    >
      {children}
    </span>
  );
}

// Main Cinematic Hero Video Component
export default function CinematicHeroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-transparent border-t-yellow-400 border-r-teal-400 rounded-full mx-auto mb-6"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/80 text-lg font-light"
              >
                Loading Coastal Experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster="/hero-poster.jpg"
          style={{ aspectRatio: '21/9' }}
        >
          <source src="/videos/coastal-dental-hero-4k.mp4" type="video/mp4" />
          <source src="/videos/coastal-dental-hero-1080p.webm" type="video/webm" />
          <source src="/videos/coastal-dental-hero-720p.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-transparent to-blue-900/20" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            color={i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#40C4B4' : '#C2185B'}
          />
        ))}
      </div>

      {/* Coastal Caustics Effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(64, 196, 180, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(194, 24, 91, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 40% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)
            `,
            animation: 'caustics 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <ShimmerText className="block">
              Experience Luxury
            </ShimmerText>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="block text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mt-4"
            >
              Coastal Dental Care
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-xl md:text-2xl lg:text-3xl font-light mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed"
          >
            Where advanced 3D dentistry meets the tranquil beauty of Shoreham-by-Sea. 
            Discover your perfect smile in our luxury coastal practice.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(64, 196, 180, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 rounded-full text-white font-semibold text-lg transition-all duration-300 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Watch Our Story</span>
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 rounded-full text-white font-semibold text-lg transition-all duration-300 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Maximize2 className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Book Consultation</span>
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <Sparkles className="w-3 h-3 text-teal-400 animate-pulse" />
              </div>
            </motion.button>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="mt-12"
          >
            <p className="text-white/60 text-lg font-light italic">
              "Going the Extra Smile" 🌊✨
            </p>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 flex items-center gap-4 z-20"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>

        <div className="text-white/80 text-sm font-light">
          Coastal Dental Experience
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/60"
        >
          <div className="text-sm font-light mb-2">Discover More</div>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Coastal Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(64, 196, 180, 0.8)" />
              <stop offset="50%" stopColor="rgba(212, 175, 55, 0.8)" />
              <stop offset="100%" stopColor="rgba(194, 24, 91, 0.8)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// CSS Animations (add to globals.css)
const styles = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes caustics {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  50% { 
    transform: scale(1.1) rotate(5deg);
    opacity: 0.5;
  }
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}
`;

