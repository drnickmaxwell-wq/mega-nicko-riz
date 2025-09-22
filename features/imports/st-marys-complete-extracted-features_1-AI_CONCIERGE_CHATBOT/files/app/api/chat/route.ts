import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

const DENTAL_CONTEXT = `You are an AI assistant for St Mary's House Dental Care, a luxury coastal dental practice in Shoreham-by-Sea, West Sussex. 

Key information:
- We offer cosmetic dentistry, dental implants, veneers, teeth whitening, and general dental care
- Our practice uses advanced 3D technology and AI-powered diagnostics
- We provide video consultations and emergency dental services
- Our brand colors are Magenta (#C2185B), Turquoise (#40C4B4), and Gold (#D4AF37)
- We focus on luxury, comfort, and cutting-edge dental technology

Guidelines:
- Be helpful, professional, and empathetic
- Provide accurate dental information
- Suggest booking consultations for specific treatments
- Mention our advanced technology when relevant
- Keep responses concise but informative
- If asked about booking, direct to our booking system
- For emergencies, provide immediate guidance and suggest calling

Never provide specific medical diagnoses or treatment plans without a consultation.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Check if OpenAI key is available
    if (!process.env.OPENAI_API_KEY) {
      // Mock response for development
      return new Response(
        JSON.stringify({
          choices: [{
            message: {
              content: "I'm currently in demo mode. I'd be happy to help you learn about our dental services! We offer cosmetic dentistry, implants, veneers, and more. Would you like to know about any specific treatment?"
            }
          }]
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: DENTAL_CONTEXT,
      messages,
      maxTokens: 500,
      temperature: 0.7,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    
    // Fallback response
    return new Response(
      JSON.stringify({
        choices: [{
          message: {
            content: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our practice directly at 01273 453109 for immediate assistance."
          }
        }]
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}

