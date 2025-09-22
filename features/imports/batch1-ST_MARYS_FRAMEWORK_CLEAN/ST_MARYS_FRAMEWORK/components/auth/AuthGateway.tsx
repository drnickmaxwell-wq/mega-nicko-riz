'use client'

import React, { useState } from 'react'
import { Mail, Shield, ArrowRight, CheckCircle } from 'lucide-react'

interface AuthGatewayProps {
  onAuthSuccess: () => void
}

export function AuthGateway({ onAuthSuccess }: AuthGatewayProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [linkSent, setLinkSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock magic link sending - replace with real implementation
    setTimeout(() => {
      setIsLoading(false)
      setLinkSent(true)
      
      // Mock successful authentication after 3 seconds
      setTimeout(() => {
        localStorage.setItem('auth_token', 'mock_token_' + Date.now())
        onAuthSuccess()
      }, 3000)
    }, 2000)
  }

  const handleMockSignIn = () => {
    // For development/demo purposes - remove in production
    localStorage.setItem('auth_token', 'mock_token_' + Date.now())
    onAuthSuccess()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Secure Access Required</h1>
          <p className="text-foreground-secondary">
            Enter your email to access the video consultation portal
          </p>
        </div>
        
        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
          
          {!linkSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Magic Link...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Send Magic Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Check Your Email</h2>
              <p className="text-foreground-secondary mb-6">
                We've sent a secure magic link to <strong>{email}</strong>. 
                Click the link to access your consultation portal.
              </p>
              <p className="text-sm text-foreground-secondary">
                The link will expire in 15 minutes for security.
              </p>
            </div>
          )}
          
          {/* Security Features */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-foreground mb-3">Security Features</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-foreground-secondary">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-foreground-secondary">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>GDPR compliant data handling</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-foreground-secondary">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>No passwords required</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-foreground-secondary">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Session automatically expires</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Development Helper */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">
              <strong>Development Mode:</strong> Skip authentication for testing
            </p>
            <button
              onClick={handleMockSignIn}
              className="text-sm text-yellow-700 hover:text-yellow-900 underline"
            >
              Mock Sign In (Development Only)
            </button>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-foreground-secondary">
            Having trouble? Contact our support team at{' '}
            <a href="mailto:support@stmaryshousedental.co.uk" className="text-primary hover:underline">
              support@stmaryshousedental.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

