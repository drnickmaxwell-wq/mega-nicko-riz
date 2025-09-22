# Gold/Teal Sparkles & Button Shimmer

Reusable CTA wrappers with sparkle effects and shimmer animations using brand colors.

## Final File Paths
- `components/effects/impl/SparkleButton.tsx` - Sparkle button wrapper
- `components/effects/impl/ShimmerEffect.tsx` - Shimmer animation
- `components/effects/impl/FloatingSparkles.tsx` - Background sparkles
- `lib/effects/sparkle-generator.ts` - Sparkle generation logic

## Installation
1. Copy files to their target paths
2. Add environment variables from `env.txt`
3. Install dependencies from `deps.txt`
4. Wrap buttons as shown in `example.md`

## Required ENV + Flags
- `ENABLE_FX_SPARKLES=true` (default: true)

## Usage (10-line snippet)
```tsx
import { SparkleButton } from '@/components/effects/impl/SparkleButton'

export default function CTASection() {
  return (
    <SparkleButton variant="primary" intensity="medium">
      Book Consultation
    </SparkleButton>
  )
}
```

## SSR Caveats
- Pure CSS animations, no SSR issues
- Gracefully degrades to normal buttons if disabled
- Uses CSS custom properties for brand colors

