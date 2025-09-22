# AI Concierge Chatbot

Site-wide AI chatbot with Vercel AI SDK, voice support, emotion detection, and avatar integration.

## Final File Paths
- `components/ai/Chatbot.tsx` - Main chatbot component
- `components/ai/ChatInterface.tsx` - Chat UI
- `components/ai/VoiceControls.tsx` - Voice input/output
- `components/ai/EmotionDetector.tsx` - Sentiment analysis
- `lib/integrations/ai/openai-adapter.ts` - OpenAI integration
- `lib/integrations/ai/emotion-engine.ts` - Emotion detection
- `app/api/chat/route.ts` - Chat API endpoint
- `app/api/booking/intent/route.ts` - Booking intent handler

## Installation
1. Copy files to their target paths
2. Add environment variables from `env.txt`
3. Install dependencies from `deps.txt`
4. Add to your layout as shown in `example.md`

## Required ENV + Flags
- `ENABLE_CHATBOT=true` (default: true)
- `ENABLE_VOICE=false` (optional)
- `ENABLE_EMOTION=false` (optional)
- `ENABLE_AVATAR=false` (optional)
- `OPENAI_API_KEY` (optional, uses mock if missing)

## Usage (10-line snippet)
```tsx
import { Chatbot } from '@/components/ai/Chatbot'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Chatbot position="bottom-right" />
      </body>
    </html>
  )
}
```

## SSR Caveats
- Uses `next/dynamic` with `ssr: false` for voice components
- Gracefully falls back to text-only if voice APIs unavailable
- Mock responses if OpenAI key missing

