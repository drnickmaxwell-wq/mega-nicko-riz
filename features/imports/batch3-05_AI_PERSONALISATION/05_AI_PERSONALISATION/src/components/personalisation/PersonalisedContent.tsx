'use client'

import React, { useEffect, useState } from 'react'
import { useUserSegment } from '@/lib/personalisation/segment-engine'
import { getPersonalisedContent } from '@/lib/personalisation/content-rules'
import { useAnalytics } from '@/components/analytics/ClickstreamTracker'

interface PersonalisedContentProps {
  contentType: 'hero' | 'treatments' | 'cta' | 'testimonials' | 'pricing'
  fallbackContent: React.ReactNode
  userId?: string
  sessionId?: string
  className?: string
  children?: React.ReactNode
}

interface PersonalisedData {
  content: any
  segment: string
  confidence: number
  variant?: string
}

export function PersonalisedContent({
  contentType,
  fallbackContent,
  userId,
  sessionId,
  className = '',
  children
}: PersonalisedContentProps) {
  const [personalisedData, setPersonalisedData] = useState<PersonalisedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasConsent, setHasConsent] = useState(false)
  const { segment, confidence, isLoading: segmentLoading } = useUserSegment()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Check for personalisation consent
    const consent = localStorage.getItem('personalisation-consent')
    setHasConsent(consent === 'granted')
  }, [])

  useEffect(() => {
    if (!hasConsent || segmentLoading) {
      setIsLoading(false)
      return
    }

    const loadPersonalisedContent = async () => {
      try {
        setIsLoading(true)
        
        const content = await getPersonalisedContent({
          contentType,
          segment,
          confidence,
          userId,
          sessionId
        })

        if (content) {
          setPersonalisedData({
            content,
            segment,
            confidence,
            variant: content.variant
          })

          // Track personalisation event
          trackEvent('content_personalised', {
            contentType,
            segment,
            confidence,
            variant: content.variant
          })
        }
      } catch (error) {
        console.error('Personalisation error:', error)
        // Fail gracefully to fallback content
      } finally {
        setIsLoading(false)
      }
    }

    loadPersonalisedContent()
  }, [contentType, segment, confidence, hasConsent, segmentLoading, userId, sessionId, trackEvent])

  // Show fallback if no consent, loading, or no personalised content
  if (!hasConsent || isLoading || !personalisedData) {
    return (
      <div className={className}>
        {fallbackContent}
        {children}
      </div>
    )
  }

  // Render personalised content based on type
  const renderPersonalisedContent = () => {
    const { content } = personalisedData

    switch (contentType) {
      case 'hero':
        return <PersonalisedHero content={content} />
      
      case 'treatments':
        return <PersonalisedTreatments content={content} />
      
      case 'cta':
        return <PersonalisedCTA content={content} />
      
      case 'testimonials':
        return <PersonalisedTestimonials content={content} />
      
      case 'pricing':
        return <PersonalisedPricing content={content} />
      
      default:
        return fallbackContent
    }
  }

  return (
    <div className={`relative ${className}`}>
      {renderPersonalisedContent()}
      
      {/* Personalisation Indicator (dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
          {segment} ({Math.round(confidence * 100)}%)
        </div>
      )}
      
      {children}
    </div>
  )
}

// Personalised Hero Component
function PersonalisedHero({ content }: { content: any }) {
  return (
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        {content.headline}
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
        {content.subheadline}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all">
          {content.primaryCTA}
        </button>
        {content.secondaryCTA && (
          <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all">
            {content.secondaryCTA}
          </button>
        )}
      </div>
    </div>
  )
}

// Personalised Treatments Component
function PersonalisedTreatments({ content }: { content: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {content.treatments.map((treatment: any, index: number) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">{treatment.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{treatment.name}</h3>
          <p className="text-gray-600 mb-4">{treatment.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-semibold">{treatment.price}</span>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Personalised CTA Component
function PersonalisedCTA({ content }: { content: any }) {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-2xl p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">{content.headline}</h2>
      <p className="text-xl mb-6 opacity-90">{content.description}</p>
      <button className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors">
        {content.buttonText}
      </button>
    </div>
  )
}

// Personalised Testimonials Component
function PersonalisedTestimonials({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.testimonials.map((testimonial: any, index: number) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
              {testimonial.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <div className="flex text-accent">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.review}"</p>
              <p className="text-sm text-primary mt-2">{testimonial.treatment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Personalised Pricing Component
function PersonalisedPricing({ content }: { content: any }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">{content.title}</h3>
      <div className="space-y-4">
        {content.priceRanges.map((range: any, index: number) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold">{range.treatment}</h4>
              <p className="text-sm text-gray-600">{range.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{range.price}</div>
              {range.financing && (
                <div className="text-sm text-gray-500">or {range.financing}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {content.disclaimer && (
        <p className="text-xs text-gray-500 mt-4 text-center">{content.disclaimer}</p>
      )}
    </div>
  )
}

