'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Video, Clock, User, AlertCircle } from 'lucide-react'
import { AuthGateway } from '@/components/auth/AuthGateway'
import { GDPRConsentDrawer } from '@/components/gdpr/GDPRConsentDrawer'
import { VideoConsultationInterface } from '@/components/video/VideoConsultationInterface'

export default function VideoConsultationPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasGDPRConsent, setHasGDPRConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication and GDPR consent status
  useEffect(() => {
    const checkAuthStatus = () => {
      // Mock authentication check - replace with real auth logic
      const authToken = localStorage.getItem('auth_token')
      const gdprConsent = localStorage.getItem('gdpr_consent')
      
      setIsAuthenticated(!!authToken)
      setHasGDPRConsent(gdprConsent === 'true')
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleGDPRConsent = () => {
    localStorage.setItem('gdpr_consent', 'true')
    setHasGDPRConsent(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground-secondary">Loading secure portal...</p>
        </div>
      </div>
    )
  }

  // Show authentication gateway if not authenticated
  if (!isAuthenticated) {
    return <AuthGateway onAuthSuccess={handleAuthSuccess} />
  }

  // Show GDPR consent if not given
  if (!hasGDPRConsent) {
    return <GDPRConsentDrawer onConsent={handleGDPRConsent} />
  }

  // Show video consultation interface
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Video Consultation Portal</div>
                <div className="text-xs text-foreground-secondary">Secure & GDPR Compliant</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-foreground-secondary">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure Connection</span>
              </div>
              
              <button
                onClick={() => {
                  localStorage.removeItem('auth_token')
                  localStorage.removeItem('gdpr_consent')
                  router.push('/video-consultations')
                }}
                className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Welcome to Your Consultation Portal</h1>
          </div>
          
          <p className="text-foreground-secondary mb-4">
            You're now in the secure video consultation area. Your privacy is protected with 
            end-to-end encryption and full GDPR compliance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Video className="w-4 h-4 text-blue-500" />
              <span>HD Video Quality</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </div>
        
        {/* Video Consultation Interface */}
        <VideoConsultationInterface />
        
        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Video consultations are not recorded and no data is stored after the session</li>
                <li>• For emergencies, please call 999 or visit your nearest A&E department</li>
                <li>• Technical support is available during consultation hours</li>
                <li>• You can request a consultation summary to be sent to your email</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

