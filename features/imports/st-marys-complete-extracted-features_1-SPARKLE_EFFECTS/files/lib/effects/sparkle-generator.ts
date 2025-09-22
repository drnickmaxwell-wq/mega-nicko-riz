export interface Sparkle {
  id: number
  x: number
  y: number
  size?: number
  delay?: number
  duration?: number
}

export function generateSparkles(intensity: 'subtle' | 'medium' | 'strong'): Sparkle[] {
  const counts = {
    subtle: 4,
    medium: 8,
    strong: 12
  }

  const count = counts[intensity]
  const sparkles: Sparkle[] = []

  for (let i = 0; i < count; i++) {
    sparkles.push({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 200,
      duration: 600 + Math.random() * 400
    })
  }

  return sparkles
}

export function generateFloatingSparkles(count: number = 20): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3000,
    duration: 2000 + Math.random() * 2000
  }))
}

export const BRAND_SPARKLE_COLORS = [
  'hsl(var(--primary))',   // Magenta
  'hsl(var(--secondary))', // Turquoise  
  'hsl(var(--accent))',    // Gold
  '#FFD700',               // Bright Gold
  '#40E0D0',               // Bright Turquoise
  '#FF69B4'                // Bright Pink
]

