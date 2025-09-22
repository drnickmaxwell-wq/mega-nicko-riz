'use client'

import React, { useState } from 'react'
import { HeroVideo } from '@/components/hero/HeroVideo'
import { HeroContent } from '@/components/hero/HeroContent'
import { CoastalParticles } from '@/components/effects/CoastalParticles'
import { Button } from '@/components/ui/buttons'

export default function HeroFXDemo() {
  const [showVideo, setShowVideo] = useState(true)
  const [particleIntensity, setParticleIntensity] = useState<'low' | 'medium' | 'high'>('medium')

  return (
    <div className="min-h-screen">
      
      {/* Demo Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold mb-3">Demo Controls</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Hero Video</label>
            <button
              onClick={() => setShowVideo(!showVideo)}
              className={`px-3 py-1 rounded text-sm ${
                showVideo ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {showVideo ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Particles</label>
            <div className="flex gap-1">
              {(['low', 'medium', 'high'] as const).map(intensity => (
                <button
                  key={intensity}
                  onClick={() => setParticleIntensity(intensity)}
                  className={`px-2 py-1 rounded text-xs ${
                    particleIntensity === intensity 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {intensity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coastal Particles Background */}
      <CoastalParticles intensity={particleIntensity} />

      {/* Hero Section */}
      {showVideo ? (
        <HeroVideo
          videoSrc="/videos/hero-demo.mp4"
          fallbackSrc="/videos/hero-fallback.mp4"
          posterSrc="/images/hero-poster.jpg"
          webmSrc="/videos/hero-demo.webm"
        >
          <HeroContent
            title="Luxury Coastal Dentistry"
            subtitle="St Mary's House Dental Care"
            description="Experience world-class dental care with cutting-edge 3D technology and AI-powered treatments in the beautiful coastal town of Shoreham-by-Sea."
            primaryCTA={{
              text: "Book Free Consultation",
              onClick: () => alert('Booking consultation...')
            }}
            secondaryCTA={{
              text: "Virtual Tour",
              onClick: () => alert('Starting virtual tour...')
            }}
          />
        </HeroVideo>
      ) : (
        <div className="h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
          <HeroContent
            title="Luxury Coastal Dentistry"
            subtitle="St Mary's House Dental Care"
            description="Experience world-class dental care with cutting-edge 3D technology and AI-powered treatments in the beautiful coastal town of Shoreham-by-Sea."
            primaryCTA={{
              text: "Book Free Consultation",
              onClick: () => alert('Booking consultation...')
            }}
            secondaryCTA={{
              text: "Virtual Tour",
              onClick: () => alert('Starting virtual tour...')
            }}
          />
        </div>
      )}

      {/* Additional Content Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Advanced Visual Effects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our hero section combines multiple visual effects to create an immersive, 
              luxury experience that reflects the quality of our dental care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">4K Hero Video</h3>
              <p className="text-gray-600">
                Full-width background video with multiple format support and intelligent fallbacks.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Coastal Particles</h3>
              <p className="text-gray-600">
                Floating particle system with brand colors that creates ambient coastal atmosphere.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Glass Morphism</h3>
              <p className="text-gray-600">
                Frosted glass UI elements that blend seamlessly with the coastal theme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Performance Optimized</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All effects are designed with performance in mind, including reduced motion support 
              and intelligent loading strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">Lazy Loading</h4>
              <p className="text-sm text-gray-600">Components load only when needed</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">Reduced Motion</h4>
              <p className="text-sm text-gray-600">Respects accessibility preferences</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">WebGL Fallbacks</h4>
              <p className="text-sm text-gray-600">Graceful degradation for older browsers</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">Video Optimization</h4>
              <p className="text-sm text-gray-600">Multiple formats and compression</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Smile?</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience our luxury dental care with a free consultation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              effect="sparkle"
              className="bg-white text-primary hover:bg-white/90"
            >
              Book Free Consultation
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              effect="magnetic"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Call Now: 01273 453109
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

