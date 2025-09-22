'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MessageCircle, X } from 'lucide-react'
import { useFlags } from '@/lib/flags'
import { Button } from '@/components/ui/button'

const ChatInterface = dynamic(() => import('./ChatInterface'), {
  ssr: false,
  loading: () => <div className="p-4">Loading chat...</div>
})

interface ChatbotProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme?: 'light' | 'dark' | 'brand'
}

const positionClasses = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4'
}

export function Chatbot({ position = 'bottom-right', theme = 'brand' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { ENABLE_CHATBOT } = useFlags()

  if (!ENABLE_CHATBOT) {
    return null
  }

  return (
    <div className={`fixed z-50 ${positionClasses[position]}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-medium">St Mary's AI Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <ChatInterface />
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  )
}

