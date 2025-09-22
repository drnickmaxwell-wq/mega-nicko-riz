'use client'

import { useState, useEffect } from 'react'

export interface UserSegment {
  id: string
  name: string
  description: string
  rules: SegmentRule[]
  priority: number
}

export interface SegmentRule {
  type: 'page_visits' | 'time_on_site' | 'referrer' | 'device' | 'location' | 'behavior'
  condition: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in_array'
  value: any
  weight: number
}

export interface UserProfile {
  sessionId: string
  userId?: string
  pageViews: string[]
  timeOnSite: number
  referrer?: string
  device: string
  location?: string
  behaviors: string[]
  lastActivity: Date
}

// Predefined user segments for dental practice
const DENTAL_SEGMENTS: UserSegment[] = [
  {
    id: 'new_visitor',
    name: 'New Visitor',
    description: 'First-time website visitors',
    priority: 1,
    rules: [
      {
        type: 'page_visits',
        condition: 'less_than',
        value: 3,
        weight: 1.0
      },
      {
        type: 'time_on_site',
        condition: 'less_than',
        value: 120, // 2 minutes
        weight: 0.8
      }
    ]
  },
  {
    id: 'treatment_seeker',
    name: 'Treatment Seeker',
    description: 'Actively researching specific treatments',
    priority: 3,
    rules: [
      {
        type: 'page_visits',
        condition: 'greater_than',
        value: 3,
        weight: 0.7
      },
      {
        type: 'behavior',
        condition: 'in_array',
        value: ['viewed_treatment', 'compared_treatments', 'viewed_pricing'],
        weight: 1.0
      }
    ]
  },
  {
    id: 'emergency_visitor',
    name: 'Emergency Visitor',
    description: 'Seeking urgent dental care',
    priority: 5,
    rules: [
      {
        type: 'page_visits',
        condition: 'contains',
        value: 'emergency',
        weight: 1.0
      },
      {
        type: 'behavior',
        condition: 'in_array',
        value: ['searched_emergency', 'viewed_emergency_page'],
        weight: 1.0
      }
    ]
  },
  {
    id: 'price_conscious',
    name: 'Price Conscious',
    description: 'Focused on pricing and payment options',
    priority: 2,
    rules: [
      {
        type: 'page_visits',
        condition: 'contains',
        value: 'pricing',
        weight: 0.8
      },
      {
        type: 'behavior',
        condition: 'in_array',
        value: ['viewed_pricing', 'compared_prices', 'viewed_financing'],
        weight: 1.0
      }
    ]
  },
  {
    id: 'luxury_seeker',
    name: 'Luxury Seeker',
    description: 'Interested in premium treatments and services',
    priority: 4,
    rules: [
      {
        type: 'page_visits',
        condition: 'contains',
        value: 'cosmetic',
        weight: 0.7
      },
      {
        type: 'behavior',
        condition: 'in_array',
        value: ['viewed_cosmetic', 'viewed_3d_tech', 'viewed_vip_services'],
        weight: 1.0
      },
      {
        type: 'time_on_site',
        condition: 'greater_than',
        value: 300, // 5 minutes
        weight: 0.6
      }
    ]
  },
  {
    id: 'returning_patient',
    name: 'Returning Patient',
    description: 'Previous patients returning for more care',
    priority: 4,
    rules: [
      {
        type: 'behavior',
        condition: 'in_array',
        value: ['has_appointment_history', 'logged_in_patient'],
        weight: 1.0
      },
      {
        type: 'page_visits',
        condition: 'contains',
        value: 'patient-portal',
        weight: 0.8
      }
    ]
  }
]

// Hook for user segmentation
export function useUserSegment() {
  const [segment, setSegment] = useState<string>('new_visitor')
  const [confidence, setConfidence] = useState<number>(0.5)
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const analyzeUserSegment = async () => {
      try {
        setIsLoading(true)
        
        // Get or create user profile
        const userProfile = await getUserProfile()
        setProfile(userProfile)
        
        // Calculate segment scores
        const segmentScores = calculateSegmentScores(userProfile, DENTAL_SEGMENTS)
        
        // Find best matching segment
        const bestMatch = findBestSegment(segmentScores)
        
        setSegment(bestMatch.segment)
        setConfidence(bestMatch.confidence)
        
        // Track segmentation for analytics
        trackSegmentation(bestMatch.segment, bestMatch.confidence)
        
      } catch (error) {
        console.error('Segmentation error:', error)
        // Default to new visitor
        setSegment('new_visitor')
        setConfidence(0.5)
      } finally {
        setIsLoading(false)
      }
    }

    analyzeUserSegment()
  }, [])

  return { segment, confidence, isLoading, profile }
}

// Get or create user profile
async function getUserProfile(): Promise<UserProfile> {
  const sessionId = getSessionId()
  
  // Try to get existing profile from localStorage
  const stored = localStorage.getItem(`user_profile_${sessionId}`)
  if (stored) {
    const profile = JSON.parse(stored)
    // Update last activity
    profile.lastActivity = new Date()
    return profile
  }
  
  // Create new profile
  const profile: UserProfile = {
    sessionId,
    pageViews: [window.location.pathname],
    timeOnSite: 0,
    referrer: document.referrer,
    device: getDeviceType(),
    behaviors: [],
    lastActivity: new Date()
  }
  
  // Save to localStorage
  localStorage.setItem(`user_profile_${sessionId}`, JSON.stringify(profile))
  
  return profile
}

// Calculate segment scores for all segments
function calculateSegmentScores(profile: UserProfile, segments: UserSegment[]): Array<{segment: string, score: number}> {
  return segments.map(segment => ({
    segment: segment.id,
    score: calculateSegmentScore(profile, segment)
  }))
}

// Calculate score for a specific segment
function calculateSegmentScore(profile: UserProfile, segment: UserSegment): number {
  let totalScore = 0
  let totalWeight = 0
  
  for (const rule of segment.rules) {
    const ruleScore = evaluateRule(profile, rule)
    totalScore += ruleScore * rule.weight
    totalWeight += rule.weight
  }
  
  return totalWeight > 0 ? totalScore / totalWeight : 0
}

// Evaluate a single segmentation rule
function evaluateRule(profile: UserProfile, rule: SegmentRule): number {
  switch (rule.type) {
    case 'page_visits':
      return evaluatePageVisitsRule(profile, rule)
    
    case 'time_on_site':
      return evaluateTimeRule(profile, rule)
    
    case 'referrer':
      return evaluateReferrerRule(profile, rule)
    
    case 'device':
      return evaluateDeviceRule(profile, rule)
    
    case 'behavior':
      return evaluateBehaviorRule(profile, rule)
    
    default:
      return 0
  }
}

// Evaluate page visits rule
function evaluatePageVisitsRule(profile: UserProfile, rule: SegmentRule): number {
  const pageCount = profile.pageViews.length
  
  switch (rule.condition) {
    case 'greater_than':
      return pageCount > rule.value ? 1 : 0
    
    case 'less_than':
      return pageCount < rule.value ? 1 : 0
    
    case 'contains':
      return profile.pageViews.some(page => page.includes(rule.value)) ? 1 : 0
    
    default:
      return 0
  }
}

// Evaluate time on site rule
function evaluateTimeRule(profile: UserProfile, rule: SegmentRule): number {
  const timeOnSite = Math.floor((new Date().getTime() - profile.lastActivity.getTime()) / 1000)
  
  switch (rule.condition) {
    case 'greater_than':
      return timeOnSite > rule.value ? 1 : 0
    
    case 'less_than':
      return timeOnSite < rule.value ? 1 : 0
    
    default:
      return 0
  }
}

// Evaluate referrer rule
function evaluateReferrerRule(profile: UserProfile, rule: SegmentRule): number {
  if (!profile.referrer) return 0
  
  switch (rule.condition) {
    case 'contains':
      return profile.referrer.includes(rule.value) ? 1 : 0
    
    default:
      return 0
  }
}

// Evaluate device rule
function evaluateDeviceRule(profile: UserProfile, rule: SegmentRule): number {
  switch (rule.condition) {
    case 'equals':
      return profile.device === rule.value ? 1 : 0
    
    default:
      return 0
  }
}

// Evaluate behavior rule
function evaluateBehaviorRule(profile: UserProfile, rule: SegmentRule): number {
  switch (rule.condition) {
    case 'in_array':
      return profile.behaviors.some(behavior => rule.value.includes(behavior)) ? 1 : 0
    
    default:
      return 0
  }
}

// Find the best matching segment
function findBestSegment(scores: Array<{segment: string, score: number}>): {segment: string, confidence: number} {
  // Sort by score descending
  scores.sort((a, b) => b.score - a.score)
  
  const bestScore = scores[0]
  const confidence = Math.min(bestScore.score, 1.0)
  
  return {
    segment: bestScore.segment,
    confidence
  }
}

// Utility functions
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

function getDeviceType(): string {
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
    return 'mobile'
  } else if (/tablet|ipad/i.test(userAgent)) {
    return 'tablet'
  } else {
    return 'desktop'
  }
}

function trackSegmentation(segment: string, confidence: number): void {
  // Track segmentation event for analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'user_segmented', {
      segment,
      confidence: Math.round(confidence * 100),
      timestamp: new Date().toISOString()
    })
  }
}

// Export segment definitions for use in other components
export { DENTAL_SEGMENTS }

