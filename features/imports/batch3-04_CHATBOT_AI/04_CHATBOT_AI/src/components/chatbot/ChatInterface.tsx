'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader2, AlertCircle } from 'lucide-react'
import { useChat } from 'ai/react'
import { useConversation } from '@/components/ai/ContextProvider'

interface ChatInterfaceProps {
  isVoiceMode?: boolean
  enableSpeech?: boolean
  theme?: 'light' | 'dark' | 'luxury'
}

interface QuickAction {
  id: string
  label: string
  message: string
  icon: string
}

const quickActions: QuickAction[] = [
  {
    id: 'book-appointment',
    label: 'Book Appointment',
    message: 'I would like to book an appointment',
    icon: '📅'
  },
  {
    id: 'treatment-info',
    label: 'Treatment Info',
    message: 'Can you tell me about your dental treatments?',
    icon: '🦷'
  },
  {
    id: 'emergency',
    label: 'Emergency',
    message: 'I have a dental emergency',
    icon: '🚨'
  },
  {
    id: 'pricing',
    label: 'Pricing',
    message: 'What are your treatment prices?',
    icon: '💰'
  }
]

export function ChatInterface({
  isVoiceMode = false,
  enableSpeech = false,
  theme = 'luxury'
}: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I'm the AI assistant for St Mary's House Dental Care. I'm here to help you with:

• Booking appointments
• Treatment information
• Pricing and insurance questions
• Emergency dental guidance
• Post-treatment care

How can I assist you today?`
      }
    ]
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addMessage, getContext } = useConversation()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Text-to-speech for responses
  useEffect(() => {
    if (enableSpeech && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'assistant' && lastMessage.content) {
        speakText(lastMessage.content)
      }
    }
  }, [messages, enableSpeech])

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8
      
      // Use a professional female voice if available
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Karen')
      )
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    // Set the input value and submit
    const event = {
      target: { value: action.message }
    } as React.ChangeEvent<HTMLInputElement>
    
    handleInputChange(event)
    
    // Submit after a brief delay to ensure input is set
    setTimeout(() => {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
      handleSubmit(submitEvent as any)
    }, 100)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    // Add message to conversation context
    addMessage({
      role: 'user',
      content: input,
      timestamp: new Date()
    })
    
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-full">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : theme === 'luxury'
                  ? 'bg-white/60 backdrop-blur-sm border border-white/20 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {/* Message Content */}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
              
              {/* Timestamp */}
              <div className={`text-xs mt-2 opacity-70 ${
                message.role === 'user' ? 'text-white/80' : 'text-gray-500'
              }`}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Sorry, I'm having trouble responding. Please try again.</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 border-t border-gray-200/50">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className="flex items-center gap-2 p-2 text-left text-sm bg-white/40 hover:bg-white/60 rounded-lg transition-colors border border-white/20"
                disabled={isLoading}
              >
                <span>{action.icon}</span>
                <span className="truncate">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200/50">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={isVoiceMode ? "Speak your message..." : "Ask me anything about dental care..."}
            disabled={isLoading || isVoiceMode}
            className="flex-1 px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm placeholder-gray-500"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[48px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          This AI assistant provides general information only. For medical advice, please consult our dental professionals.
        </p>
      </div>
    </div>
  )
}

