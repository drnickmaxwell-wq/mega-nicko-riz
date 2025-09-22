# Sparkle Effects Usage Examples

## Basic Sparkle Button
```tsx
import { SparkleButton } from '@/components/effects/impl/SparkleButton'

export default function HeroSection() {
  return (
    <div className="text-center">
      <h1>Transform Your Smile</h1>
      <SparkleButton 
        variant="primary" 
        intensity="medium"
        onClick={() => console.log('Book consultation')}
      >
        Book Free Consultation
      </SparkleButton>
    </div>
  )
}
```

## Multiple Sparkle Buttons with Different Intensities
```tsx
import { SparkleButton } from '@/components/effects/impl/SparkleButton'

export default function CTASection() {
  return (
    <div className="flex gap-4 justify-center">
      <SparkleButton variant="primary" intensity="strong">
        Book Now
      </SparkleButton>
      
      <SparkleButton variant="outline" intensity="medium">
        Learn More
      </SparkleButton>
      
      <SparkleButton variant="secondary" intensity="subtle">
        Call Us
      </SparkleButton>
    </div>
  )
}
```

