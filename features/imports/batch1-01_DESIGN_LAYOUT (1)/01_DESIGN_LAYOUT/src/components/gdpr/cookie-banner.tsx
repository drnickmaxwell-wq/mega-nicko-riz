'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/buttons'
import { CookieConsentProps } from '@/types/design'

export function CookieBanner({ 
  onAccept, 
  onDecline, 
  onCustomize,
  position = 'bottom',
  theme = 'light' 
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
    onAccept()
  }

  const handleDeclineAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
    onDecline()
  }

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
    onCustomize()
  }

  if (!isVisible) return null

  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0',
    top: 'top-0 left-0 right-0'
  }

  const themeClasses = {
    light: 'bg-white border-gray-200 text-gray-900',
    dark: 'bg-gray-900 border-gray-700 text-white'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 border-t ${themeClasses[theme]} shadow-lg`}>
      <div className="container mx-auto p-6">
        {!showDetails ? (
          // Simple consent banner
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
              <p className="text-sm opacity-90">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDetails(true)}
              >
                Customize
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleDeclineAll}
              >
                Decline All
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          // Detailed preferences
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Cookie Preferences</h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-2xl opacity-60 hover:opacity-100"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <CookieCategory
                title="Necessary Cookies"
                description="Essential for the website to function properly. Cannot be disabled."
                enabled={preferences.necessary}
                disabled={true}
                onChange={() => {}}
              />
              
              <CookieCategory
                title="Analytics Cookies"
                description="Help us understand how visitors interact with our website."
                enabled={preferences.analytics}
                onChange={(enabled) => setPreferences(prev => ({ ...prev, analytics: enabled }))}
              />
              
              <CookieCategory
                title="Marketing Cookies"
                description="Used to deliver personalized advertisements and track campaign performance."
                enabled={preferences.marketing}
                onChange={(enabled) => setPreferences(prev => ({ ...prev, marketing: enabled }))}
              />
              
              <CookieCategory
                title="Functional Cookies"
                description="Enable enhanced functionality like chat widgets and social media features."
                enabled={preferences.functional}
                onChange={(enabled) => setPreferences(prev => ({ ...prev, functional: enabled }))}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 justify-end">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleDeclineAll}
              >
                Decline All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSavePreferences}
              >
                Save Preferences
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Cookie Category Component
function CookieCategory({ 
  title, 
  description, 
  enabled, 
  disabled = false, 
  onChange 
}: {
  title: string
  description: string
  enabled: boolean
  disabled?: boolean
  onChange: (enabled: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex-1 mr-4">
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm opacity-75">{description}</p>
      </div>
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className={`
          w-11 h-6 rounded-full transition-colors
          ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200'}
          peer-checked:bg-primary
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:rounded-full after:h-5 after:w-5 
          after:transition-all after:duration-200
          peer-checked:after:translate-x-full
        `} />
      </label>
    </div>
  )
}

