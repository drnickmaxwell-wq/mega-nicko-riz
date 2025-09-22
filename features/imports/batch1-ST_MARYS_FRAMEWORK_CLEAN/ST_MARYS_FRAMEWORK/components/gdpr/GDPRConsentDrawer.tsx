'use client'

import React, { useState } from 'react'
import { Shield, X, CheckCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface GDPRConsentDrawerProps {
  onConsent: () => void
}

export function GDPRConsentDrawer({ onConsent }: GDPRConsentDrawerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleAccept = () => {
    onConsent()
    setIsVisible(false)
  }

  const handleDecline = () => {
    // Redirect back to public page if consent is declined
    window.location.href = '/video-consultations'
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Privacy & Data Consent</h2>
          </div>
          <button
            onClick={handleDecline}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground-secondary" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-foreground-secondary mb-4">
              Before accessing our secure video consultation portal, we need your consent 
              to process your personal data in accordance with GDPR regulations.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What data we collect:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Email address for authentication</li>
                <li>• Video consultation session metadata</li>
                <li>• Technical logs for security purposes</li>
                <li>• Consultation notes (if you request them)</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-900 mb-2">How we protect your data:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• End-to-end encryption for all communications</li>
                <li>• No video recordings are stored</li>
                <li>• Data is automatically deleted after 30 days</li>
                <li>• UK-based secure servers</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-orange-900 mb-2">Your rights:</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Request data export at any time</li>
                <li>• Request data deletion</li>
                <li>• Withdraw consent (ends consultation access)</li>
                <li>• Contact our Data Protection Officer</li>
              </ul>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <Link 
              href="/privacy" 
              className="text-primary hover:underline flex items-center space-x-1"
              target="_blank"
            >
              <span>Privacy Policy</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link 
              href="/cookies" 
              className="text-primary hover:underline flex items-center space-x-1"
              target="_blank"
            >
              <span>Cookie Policy</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link 
              href="/docs/security-gdpr" 
              className="text-primary hover:underline flex items-center space-x-1"
              target="_blank"
            >
              <span>Security Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          
          {/* Consent Checkboxes */}
          <div className="space-y-4 mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                required
              />
              <span className="text-sm text-foreground">
                I consent to the processing of my personal data for video consultation purposes 
                as described above.
              </span>
            </label>
            
            <label className="flex items-start space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                required
              />
              <span className="text-sm text-foreground">
                I understand that I can withdraw my consent at any time by contacting 
                the practice or our Data Protection Officer.
              </span>
            </label>
            
            <label className="flex items-start space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                required
              />
              <span className="text-sm text-foreground">
                I confirm that I am over 16 years of age or have parental consent 
                for this consultation.
              </span>
            </label>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="btn-primary flex items-center justify-center space-x-2 flex-1"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Accept & Continue</span>
            </button>
            
            <button
              onClick={handleDecline}
              className="btn-outline flex-1"
            >
              Decline & Exit
            </button>
          </div>
          
          <p className="text-xs text-foreground-secondary mt-4 text-center">
            By clicking "Accept & Continue", you agree to our data processing practices 
            and confirm you have read our privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}

