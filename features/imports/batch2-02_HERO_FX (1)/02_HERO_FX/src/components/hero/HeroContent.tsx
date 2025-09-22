'use client'

import React from 'react'
import { Button } from '@/components/ui/buttons'

interface HeroContentProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    onClick: () => void
  }
  secondaryCTA?: {
    text: string
    onClick: () => void
  }
  className?: string
}

export function HeroContent({
  title = "Transform Your Smile",
  subtitle = "Luxury Coastal Dentistry",
  description = "Experience world-class dental care in the heart of Shoreham-by-Sea. Our advanced 3D technology and AI-powered treatments deliver exceptional results in a comfortable, luxury environment.",
  primaryCTA = {
    text: "Book Free Consultation",
    onClick: () => console.log('Book consultation clicked')
  },
  secondaryCTA = {
    text: "Explore Treatments",
    onClick: () => console.log('Explore treatments clicked')
  },
  className = ''
}: HeroContentProps) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      <div className="text-center text-white px-6 max-w-4xl mx-auto">
        
        {/* Subtitle */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
            {subtitle}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block">
            {title.split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block mr-4"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Description */}
        <p 
          className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.3s forwards',
            opacity: 0,
            transform: 'translateY(30px)'
          }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.5s forwards',
            opacity: 0,
            transform: 'translateY(30px)'
          }}
        >
          <Button
            variant="primary"
            size="lg"
            effect="sparkle"
            onClick={primaryCTA.onClick}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
          >
            {primaryCTA.text}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            effect="magnetic"
            onClick={secondaryCTA.onClick}
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold backdrop-blur-sm"
          >
            {secondaryCTA.text}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div 
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.7s forwards',
            opacity: 0,
            transform: 'translateY(30px)'
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
            <span className="text-sm font-medium">GDC Registered</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
            <span className="text-sm font-medium">Award Winning</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
            <span className="text-sm font-medium">5-Star Reviews</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
            <span className="text-sm font-medium">Latest Technology</span>
          </div>
        </div>
      </div>

      {/* Floating Glass Elements */}
      <div className="absolute top-1/4 left-8 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-float" />
      <div className="absolute top-1/3 right-12 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-float-delayed" />
      <div className="absolute bottom-1/4 left-16 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 animate-float-slow" />

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 4s;
        }
      `}</style>
    </div>
  )
}

