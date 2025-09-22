# AI Concierge Chatbot Usage Examples

## Basic Usage in Layout
```tsx
import { Chatbot } from '@/components/ai/Chatbot'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot position="bottom-right" theme="brand" />
      </body>
    </html>
  )
}
```

## Custom Positioning and Theme
```tsx
import { Chatbot } from '@/components/ai/Chatbot'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <h1>Contact Us</h1>
      <p>Or chat with our AI assistant below:</p>
      
      {/* Custom positioned chatbot */}
      <Chatbot position="bottom-left" theme="light" />
    </div>
  )
}
```

## Programmatic Control
```tsx
'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/ai/ChatInterface'
import { Button } from '@/components/ui/button'

export default function SupportPage() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="container mx-auto py-8">
      <h1>Need Help?</h1>
      
      <Button onClick={() => setShowChat(true)}>
        Chat with AI Assistant
      </Button>

      {showChat && (
        <div className="mt-4 max-w-md mx-auto border rounded-lg h-96">
          <ChatInterface />
        </div>
      )}
    </div>
  )
}
```

