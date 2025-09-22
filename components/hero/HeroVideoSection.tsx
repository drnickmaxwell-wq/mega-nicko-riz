'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroVideoSectionProps {
  videoSrc: string
  posterSrc?: string
  fallbackImageSrc?: string
  title?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
  className?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  overlay?: boolean
  overlayOpacity?: number
}

export function HeroVideoSection({
  videoSrc,
  posterSrc = '/images/hero-poster.jpg',
  fallbackImageSrc = '/images/hero-fallback.jpg',
  title = "Luxury Coastal Dentistry",
  subtitle = "Experience exceptional dental care by the sea at St Mary's House Dental Care",
  ctaText = "Book Your Consultation",
  onCtaClick,
  className = '',
  autoplay = true,
  muted = true,
  loop = true,
  overlay = true,
  overlayOpacity = 0.4
}: HeroVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Video loading and error handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsVideoLoaded(true)
      if (autoplay && isIntersecting) {
        video.play().catch(() => {
          // Autoplay failed, user interaction required
          console.log('Autoplay prevented by browser')
        })
      }
    }

    const handleError = () => {
      setHasError(true)
      console.error('Video failed to load')
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [autoplay, isIntersecting])

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVideoLoaded) return

    if (isIntersecting && autoplay) {
      video.play().catch(() => {
        // Autoplay failed
      })
    } else {
      video.pause()
    }
  }, [isIntersecting, autoplay, isVideoLoaded])

  return (
    <motion.section
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden ${className}`}
      style={{ y, opacity }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!hasError ? (
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            poster={posterSrc}
            muted={muted}
            loop={loop}
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback image
          <img
            src={fallbackImageSrc}
            alt="St Mary's House Dental Care"
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        {overlay && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Brand Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C2185B]/20 via-transparent to-[#40C4B4]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          
          {/* Animated Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-montserrat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37] bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="text-xl md:text-2xl mb-8 font-lora text-white/90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Button with Sparkle Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button
              onClick={onCtaClick}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#C2185B] to-[#40C4B4] rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              {/* Sparkle Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative z-10 font-montserrat">{ctaText}</span>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C2185B] to-[#40C4B4] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Floating Geometric Shapes */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className="absolute w-6 h-6 border-2 border-[#40C4B4]/30 rounded-full"
                style={{
                  right: `${10 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm font-montserrat mb-2">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Video Controls (for accessibility) */}
      {isVideoLoaded && !hasError && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => {
              const video = videoRef.current
              if (video) {
                if (video.paused) {
                  video.play()
                } else {
                  video.pause()
                }
              }
            }}
            className="p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
            aria-label="Toggle video playback"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}
    </motion.section>
  )
}

// Specialized hero variants
export function CompactHeroVideo(props: Omit<HeroVideoSectionProps, 'className'>) {
  return (
    <HeroVideoSection
      {...props}
      className="h-[60vh] md:h-[70vh]"
    />
  )
}

export function FullscreenHeroVideo(props: Omit<HeroVideoSectionProps, 'className'>) {
  return (
    <HeroVideoSection
      {...props}
      className="h-screen"
    />
  )
}

