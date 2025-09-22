# Chatbot & AI Module

Complete AI chatbot system with OpenAI integration, avatar support, voice I/O, and dental practice integrations for St Mary's House Dental Care.

## Features Included

- **OpenAI Chatbot**: GPT-4 powered conversational AI with dental knowledge
- **Memory & Context**: Conversation history and patient context management
- **Guardrails & Safety**: Content filtering and appropriate response boundaries
- **GDPR Compliance**: Data handling, consent, and privacy protection
- **Avatar Mode**: HeyGen and Synthesia avatar integration adapters
- **Voice I/O**: Speech-to-text and text-to-speech capabilities
- **Dentally Integration**: Booking and CRM integration via Zapier
- **Appointment Booking**: Intelligent appointment scheduling assistance
- **Treatment Guidance**: AI-powered treatment recommendations

## Brand Integration

- Consistent with St Mary's brand colors and luxury aesthetic
- Professional dental tone and terminology
- Coastal/luxury themed responses when appropriate

## Installation

1. Extract zip to your project root
2. Copy `src/` contents to your project
3. Configure environment variables from `env.example`
4. Install dependencies from `deps.txt`
5. Set up API integrations (optional - mocks provided)

## File Structure

```
src/
├── components/
│   ├── chatbot/
│   │   ├── ChatWidget.tsx         # Main chat widget
│   │   ├── ChatInterface.tsx      # Chat UI components
│   │   ├── VoiceControls.tsx      # Voice input/output
│   │   └── AvatarDisplay.tsx      # Avatar integration
│   ├── ai/
│   │   ├── ConversationManager.tsx # Chat state management
│   │   ├── ResponseFilters.tsx    # Safety guardrails
│   │   └── ContextProvider.tsx    # Patient context
│   └── gdpr/
│       ├── ChatConsent.tsx        # Chat-specific consent
│       └── DataControls.tsx       # Data management UI
├── lib/
│   ├── ai/
│   │   ├── openai-client.ts       # OpenAI integration
│   │   ├── conversation-memory.ts # Memory management
│   │   ├── dental-knowledge.ts    # Dental expertise
│   │   └── safety-filters.ts      # Content moderation
│   ├── integrations/
│   │   ├── heygen-adapter.ts      # HeyGen avatar API
│   │   ├── synthesia-adapter.ts   # Synthesia avatar API
│   │   ├── zapier-webhook.ts      # Zapier integration
│   │   └── dentally-api.ts        # Dentally CRM API
│   └── voice/
│       ├── speech-recognition.ts  # Speech-to-text
│       └── text-to-speech.ts      # Text-to-speech
├── api/
│   ├── chat/route.ts              # Main chat endpoint
│   ├── voice/route.ts             # Voice processing
│   └── booking/intent/route.ts    # Booking integration
└── demo/
    └── page.tsx                   # Complete demo
```

## Usage Examples

```tsx
import { ChatWidget } from '@/components/chatbot/ChatWidget'
import { ConversationProvider } from '@/components/ai/ContextProvider'

export default function Layout({ children }) {
  return (
    <ConversationProvider>
      {children}
      <ChatWidget 
        position="bottom-right"
        enableVoice={true}
        enableAvatar={false}
        theme="luxury"
      />
    </ConversationProvider>
  )
}
```

## AI Capabilities

- **Treatment Information**: Detailed explanations of dental procedures
- **Appointment Booking**: Intelligent scheduling assistance
- **Cost Estimates**: Treatment pricing guidance
- **Emergency Triage**: Urgent care assessment and routing
- **Post-Treatment Care**: Recovery instructions and follow-up
- **Insurance Questions**: Coverage and payment options

## Safety & Compliance

- Content filtering for inappropriate requests
- Medical disclaimer for treatment advice
- GDPR-compliant data handling
- Conversation encryption and secure storage
- User consent management
- Data export and deletion capabilities

## Environment Variables

See `env.example` for OpenAI, avatar services, and integration settings.

