import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

// Dental knowledge base and context
const DENTAL_SYSTEM_PROMPT = `You are an AI assistant for St Mary's House Dental Care, a luxury coastal dental practice in Shoreham-by-Sea, West Sussex, UK.

PRACTICE INFORMATION:
- Location: Shoreham-by-Sea, West Sussex (coastal town)
- Style: Luxury dental care with cutting-edge technology
- Specialties: Cosmetic dentistry, dental implants, veneers, teeth whitening, 3D dentistry, AI-powered diagnostics
- Technology: Advanced 3D scanning, AI smile analysis, digital treatment planning
- Atmosphere: Professional, luxury, coastal-themed, comfortable
- Colors: Magenta (#C2185B), Turquoise (#40C4B4), Gold (#D4AF37)

SERVICES OFFERED:
1. Cosmetic Dentistry (veneers, bonding, smile makeovers)
2. Dental Implants (single tooth, multiple teeth, full mouth reconstruction)
3. Teeth Whitening (professional, take-home options)
4. General Dentistry (checkups, cleanings, fillings)
5. Emergency Dental Care (same-day appointments available)
6. 3D Digital Dentistry (intraoral scanning, digital impressions)
7. AI Smile Analysis and Treatment Planning
8. Sedation Dentistry (for anxious patients)

BOOKING INFORMATION:
- Phone: 01273 453109
- Online booking available through website
- Emergency appointments: Same day availability
- Consultation: Free initial consultations for cosmetic treatments
- Hours: Monday-Friday 8:00-18:00, Saturday 9:00-15:00

PRICING GUIDANCE (General ranges - always recommend consultation for exact pricing):
- Dental Checkup: £80-120
- Teeth Whitening: £300-600
- Porcelain Veneers: £800-1200 per tooth
- Dental Implants: £2000-4000 per tooth
- Smile Makeover: £5000-15000 (depending on complexity)

PERSONALITY & TONE:
- Professional but warm and approachable
- Knowledgeable about dental procedures
- Empathetic to patient concerns and dental anxiety
- Enthusiastic about modern dental technology
- Luxury-focused but not pretentious
- Coastal/seaside references when appropriate

IMPORTANT GUIDELINES:
1. Always recommend booking a consultation for personalized treatment plans
2. Never provide specific medical diagnoses - always refer to qualified dentists
3. For emergencies, prioritize immediate care and provide emergency contact
4. Mention relevant technology (3D scanning, AI analysis) when discussing treatments
5. Be reassuring about dental anxiety and mention sedation options
6. Emphasize the practice's luxury, comfortable environment
7. Include coastal/seaside metaphors naturally when appropriate
8. Always maintain professional boundaries while being helpful

BOOKING ASSISTANCE:
- Can help identify suitable treatments based on patient goals
- Should gather basic information (treatment interest, urgency, contact preferences)
- Always end booking discussions with clear next steps
- Mention free consultations for cosmetic treatments

EMERGENCY PROTOCOLS:
- Severe pain: Recommend immediate call to practice
- Trauma/injury: Suggest emergency appointment same day
- Swelling/infection: Urgent care needed
- Lost filling/crown: Same-day repair available

Remember: You represent a premium dental practice. Be helpful, professional, and always prioritize patient safety and appropriate care.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Check if OpenAI key is available
    if (!process.env.OPENAI_API_KEY) {
      // Mock response for development/demo
      const mockResponses = [
        "Hello! I'm currently in demo mode. I'd be happy to help you learn about St Mary's House Dental Care. We offer cosmetic dentistry, dental implants, teeth whitening, and advanced 3D dental technology. What would you like to know more about?",
        "Thank you for your interest in our dental services! While I'm in demo mode, I can tell you that we specialize in luxury coastal dentistry with cutting-edge technology. Would you like to know about our treatments, pricing, or how to book an appointment?",
        "I'm here to help with information about our dental practice! In demo mode, I can share that we're located in beautiful Shoreham-by-Sea and offer comprehensive dental care from routine checkups to complete smile makeovers. What specific treatment interests you?",
        "Great question! Although I'm currently in demo mode, I can tell you about our advanced 3D dentistry and AI-powered smile analysis. We pride ourselves on combining luxury comfort with the latest dental technology. How can I assist you further?"
      ]
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
      return new Response(randomResponse, {
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Filter messages to ensure appropriate content
    const filteredMessages = messages.map((msg: any) => ({
      ...msg,
      content: filterInappropriateContent(msg.content)
    }))

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: DENTAL_SYSTEM_PROMPT,
      messages: filteredMessages,
      maxTokens: 800,
      temperature: 0.7,
      frequencyPenalty: 0.1,
      presencePenalty: 0.1,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    
    // Fallback response
    return new Response(
      "I apologize, but I'm experiencing technical difficulties at the moment. For immediate assistance, please call our practice directly at 01273 453109. Our team will be happy to help you with any dental questions or to book an appointment.",
      { 
        status: 200,
        headers: { 'Content-Type': 'text/plain' } 
      }
    )
  }
}

// Content filtering function
function filterInappropriateContent(content: string): string {
  // Basic content filtering - in production, use more sophisticated filtering
  const inappropriatePatterns = [
    /\b(illegal|drugs|violence|hate)\b/gi,
    /\b(prescription|medication|drug)\b/gi, // Prevent medication advice
  ]
  
  let filtered = content
  inappropriatePatterns.forEach(pattern => {
    filtered = filtered.replace(pattern, '[filtered]')
  })
  
  return filtered
}

// Rate limiting helper (implement with your preferred solution)
function checkRateLimit(req: NextRequest): boolean {
  // Implement rate limiting logic here
  // Return false if rate limit exceeded
  return true
}

