'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Send, Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFlags } from '@/lib/flags'
import { useEmotion } from '@/lib/integrations/ai/emotion-engine'
import dynamic from 'next/dynamic'

const VoiceControls = dynamic(() => import('./VoiceControls'), {
  ssr: false
})

const EmotionDetector = dynamic(() => import('./EmotionDetector'), {
  ssr: false
})

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  })
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { ENABLE_VOICE, ENABLE_EMOTION } = useFlags()
  const { emotion, analyzeText } = useEmotion()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (ENABLE_EMOTION && input) {
      analyzeText(input)
    }
  }, [input, ENABLE_EMOTION, analyzeText])

  const handleVoiceToggle = () => {
    setIsVoiceMode(!isVoiceMode)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-8">
            <div className="mb-2">👋</div>
            <p>Hello! I'm your AI dental assistant.</p>
            <p>How can I help you today?</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Emotion Indicator */}
      {ENABLE_EMOTION && (
        <EmotionDetector emotion={emotion} />
      )}

      {/* Voice Mode */}
      {ENABLE_VOICE && isVoiceMode && (
        <VoiceControls
          onTranscript={(text) => handleInputChange({ target: { value: text } } as any)}
          onSubmit={() => handleSubmit()}
        />
      )}

      {/* Input */}
      <div className="p-3 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about treatments, booking, or dental care..."
            className="flex-1"
            disabled={isLoading || isVoiceMode}
          />
          
          {ENABLE_VOICE && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleVoiceToggle}
              className={isVoiceMode ? 'bg-red-100 text-red-600' : ''}
            >
              {isVoiceMode ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          )}
          
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

