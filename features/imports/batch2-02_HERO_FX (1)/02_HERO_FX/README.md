# Hero & FX Module

Complete hero section with video background and advanced visual effects for St Mary's House Dental Care.

## Features Included

- **Hero Video Section**: Full-width video with mp4/webm/fallback support
- **Coastal Particles**: Floating particle system with brand colors
- **WebGL Wave Background**: Interactive wave animations
- **Floating Sparkles**: Ambient sparkle effects
- **Glass Morphism**: Frosted glass UI elements
- **Parallax/Scroll Effects**: Smooth scroll-based animations
- **Lazy Loading**: Performance-optimized component loading
- **Reduced Motion**: Respects user accessibility preferences

## Brand Integration

- Uses exact brand colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
- Maintains Montserrat/Lora typography
- Consistent with existing design system

## Installation

1. Extract zip to your project root
2. Copy `src/` contents to your project
3. Add video files to `public/videos/`
4. Configure environment variables
5. Import components as shown in examples

## File Structure

```
src/
├── components/
│   ├── hero/
│   │   ├── HeroVideo.tsx      # Main hero video component
│   │   └── HeroContent.tsx    # Hero text overlay
│   ├── effects/
│   │   ├── CoastalParticles.tsx
│   │   ├── WebGLWaves.tsx
│   │   ├── FloatingSparkles.tsx
│   │   ├── GlassMorphism.tsx
│   │   └── ParallaxScroll.tsx
│   └── ui/
│       └── LazyWrapper.tsx    # Lazy loading utility
├── hooks/
│   ├── useReducedMotion.ts
│   └── useIntersectionObserver.ts
├── assets/
│   └── videos/               # Sample video files
└── demo/
    └── page.tsx             # Complete demo page
```

## Usage Examples

```tsx
import { HeroVideo } from '@/components/hero/HeroVideo'
import { CoastalParticles } from '@/components/effects/CoastalParticles'
import { WebGLWaves } from '@/components/effects/WebGLWaves'

export default function HomePage() {
  return (
    <div className="relative">
      <WebGLWaves />
      <CoastalParticles />
      <HeroVideo 
        videoSrc="/videos/hero-4k.mp4"
        fallbackSrc="/videos/hero-fallback.mp4"
        posterSrc="/images/hero-poster.jpg"
      />
    </div>
  )
}
```

## Performance Features

- Lazy loading for heavy components
- Video preloading strategies
- Reduced motion support
- WebGL fallbacks for older browsers
- Optimized particle systems

## Environment Variables

See `env.example` for all configuration options including feature flags and performance settings.

