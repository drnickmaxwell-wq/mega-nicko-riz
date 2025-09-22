'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle, X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { ChatInterface } from './ChatInterface'
import { VoiceControls } from './VoiceControls'
import { AvatarDisplay } from './AvatarDisplay'
import { ChatConsent } from '@/components/gdpr/ChatConsent'
import { useConversation } from '@/components/ai/ContextProvider'

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme?: 'light' | 'dark' | 'luxury'
  enableVoice?: boolean
  enableAvatar?: boolean
  autoOpen?: boolean
  className?: string
}

const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6'
}

const themeClasses = {
  light: 'bg-white border-gray-200 text-gray-900',
  dark: 'bg-gray-900 border-gray-700 text-white',
  luxury: 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-gray-900'
}

export function ChatWidget({
  position = 'bottom-right',
  theme = 'luxury',
  enableVoice = false,
  enableAvatar = false,
  autoOpen = false,
  className = ''
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [hasConsent, setHasConsent] = useState(false)
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { isEnabled } = useConversation()

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem('chat-consent')
    if (consent === 'granted') {
      setHasConsent(true)
    }
  }, [])

  const handleConsentGranted = () => {
    setHasConsent(true)
    localStorage.setItem('chat-consent', 'granted')
  }

  const handleConsentDenied = () => {
    setIsOpen(false)
    localStorage.setItem('chat-consent', 'denied')
  }

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode)
  }

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking)
    // Stop any current speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
      }
    }
  }

  if (!isEnabled) {
    return null
  }

  return (
    <div className={`fixed z-50 ${positionClasses[position]} ${className}`}>
      
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-96 h-[500px] rounded-2xl shadow-2xl border backdrop-blur-sm ${themeClasses[theme]} overflow-hidden`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-current/10 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="flex items-center gap-3">
              {enableAvatar && (
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg">🦷</span>
                </div>
              )}
              <div>
                <h3 className="font-semibold">St Mary's AI Assistant</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {enableVoice && (
                <>
                  <button
                    onClick={toggleVoiceMode}
                    className={`p-2 rounded-lg transition-colors ${
                      isVoiceMode ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    title={isVoiceMode ? 'Disable Voice' : 'Enable Voice'}
                  >
                    {isVoiceMode ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={toggleSpeaking}
                    className={`p-2 rounded-lg transition-colors ${
                      isSpeaking ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    title={isSpeaking ? 'Mute Responses' : 'Enable Speech'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </>
              )}
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 h-full">
            {!hasConsent ? (
              <ChatConsent
                onAccept={handleConsentGranted}
                onDecline={handleConsentDenied}
              />
            ) : (
              <div className="h-full flex flex-col">
                {enableAvatar && (
                  <AvatarDisplay 
                    isActive={isOpen}
                    isSpeaking={isSpeaking}
                  />
                )}
                
                <div className="flex-1">
                  <ChatInterface
                    isVoiceMode={isVoiceMode}
                    enableSpeech={isSpeaking}
                    theme={theme}
                  />
                </div>
                
                {enableVoice && isVoiceMode && (
                  <VoiceControls
                    onTranscript={(text) => {
                      // Handle voice input
                      console.log('Voice input:', text)
                    }}
                    isListening={isVoiceMode}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
        
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
            !
          </div>
        )}
      </button>

      {/* Welcome Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Hi! I'm here to help with your dental questions
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
        </div>
      )}
    </div>
  )
}

