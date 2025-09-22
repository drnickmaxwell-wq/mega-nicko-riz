'use client'

import React, { useRef, useEffect, useState } from 'react'
import { HeroContent } from './HeroContent'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HeroVideoProps {
  videoSrc: string
  fallbackSrc?: string
  posterSrc?: string
  webmSrc?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
  children?: React.ReactNode
}

export function HeroVideo({
  videoSrc,
  fallbackSrc,
  posterSrc,
  webmSrc,
  autoPlay = true,
  muted = true,
  loop = true,
  className = '',
  children
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      if (autoPlay && !prefersReducedMotion) {
        video.play().catch(console.error)
      }
    }

    const handleError = () => {
      setHasError(true)
      console.warn('Hero video failed to load, showing fallback')
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [autoPlay, prefersReducedMotion])

  // Fallback gradient if video fails or reduced motion is preferred
  if (hasError || prefersReducedMotion) {
    return (
      <div className={`relative w-full h-screen overflow-hidden ${className}`}>
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
          style={{
            backgroundImage: posterSrc ? `url(${posterSrc})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {children || <HeroContent />}
      </div>
    )
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={autoPlay && !prefersReducedMotion}
        muted={muted}
        loop={loop}
        playsInline
        poster={posterSrc}
        preload="metadata"
      >
        {/* Multiple video sources for better compatibility */}
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={videoSrc} type="video/mp4" />
        {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
        
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xl font-medium">Loading luxury experience...</p>
          </div>
        </div>
      )}

      {/* Hero Content */}
      {children || <HeroContent />}

      {/* Scroll Indicator */}
      {isLoaded && !prefersReducedMotion && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  )
}

