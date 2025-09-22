'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

interface HeroVideoProps {
  videoSrc?: string;
  posterImage?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showControls?: boolean;
  overlayOpacity?: number;
  className?: string;
}

export default function FourKHeroVideo({
  videoSrc = '/videos/dental-hero-4k.mp4',
  posterImage = '/hero-poster.jpg',
  title,
  subtitle,
  ctaText,
  onCtaClick,
  autoplay = true,
  muted = true,
  loop = true,
  showControls = true,
  overlayOpacity = 0.4,
  className = ''
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControlsVisible, setShowControlsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsLoaded(true);
    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * video.duration;
    video.currentTime = newTime;
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* 4K Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={posterImage}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        onMouseEnter={() => setShowControlsVisible(true)}
        onMouseLeave={() => setShowControlsVisible(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Brand-Consistent Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-pink-600/40 via-teal-500/30 to-yellow-500/40"
        style={{ opacity: overlayOpacity }}
      />

      {/* Flowing Wave Graphics Overlay - Brand Consistent */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Flowing Lines - Magenta to Turquoise */}
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C2185B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#40C4B4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#40C4B4" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C2185B" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Animated Flowing Lines */}
          <motion.path
            d="M0,400 Q480,200 960,400 T1920,400"
            stroke="url(#waveGradient1)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,600 Q480,800 960,600 T1920,600"
            stroke="url(#waveGradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          
          {/* Particle Dots */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
              r="4"
              fill={i % 3 === 0 ? '#C2185B' : i % 3 === 1 ? '#40C4B4' : '#D4AF37'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
            />
          ))}
        </svg>
      </div>

      {/* Hero Content - Brand Consistent Typography */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-pink-300 via-teal-300 to-yellow-300 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 leading-relaxed"
            style={{ fontFamily: 'Lora, serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <button
              onClick={onCtaClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <span className="relative z-10">{ctaText}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-700 via-teal-600 to-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => {/* AI Smile Quiz */}}
              className="group relative px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full text-lg border-2 border-white/30 transition-all duration-300 hover:bg-white/30 hover:scale-105"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Try AI Smile Quiz
            </button>
          </motion.div>
        </div>
      </div>

      {/* Video Controls - Brand Consistent */}
      <AnimatePresence>
        {showControls && (showControlsVisible || !isPlaying) && (
          <motion.div
            className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-md rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="p-2 bg-gradient-to-r from-pink-600 to-teal-500 text-white rounded-full hover:scale-110 transition-transform duration-200"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              {/* Progress Bar */}
              <div
                className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-teal-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="p-2 text-white hover:text-teal-300 transition-colors duration-200"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 text-white hover:text-teal-300 transition-colors duration-200"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Indicator - Brand Consistent */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-600 via-teal-500 to-yellow-500">
          <div className="text-center text-white">
            <motion.div
              className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-lg font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Loading Luxury Experience...
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Buttons - Brand Consistent */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <motion.button
          className="p-3 bg-gradient-to-r from-pink-600 to-teal-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = 'tel:01273453109'}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </motion.button>

        <motion.button
          className="p-3 bg-gradient-to-r from-teal-500 to-yellow-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCtaClick}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>

      {/* Emergency Banner - Brand Consistent */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 px-4 text-center"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <p className="text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          🚨 Emergency Dental Care Available 24/7 - Call 01273 453109 🚨
        </p>
      </motion.div>

      {/* Statistics Overlay - Brand Consistent */}
      <motion.div
        className="absolute bottom-20 left-6 right-6 flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="flex flex-wrap justify-center gap-6 text-white">
          {[
            { icon: '🏆', label: 'CQC Outstanding', value: 'Rating' },
            { icon: '⚡', label: 'Same-Day', value: 'Appointments' },
            { icon: '😊', label: '98% Patient', value: 'Satisfaction' },
            { icon: '🌊', label: 'Coastal', value: 'Location' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/10 backdrop-blur-md rounded-lg p-3 min-w-[120px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xs font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {stat.label}
              </div>
              <div className="text-xs opacity-90" style={{ fontFamily: 'Lora, serif' }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

