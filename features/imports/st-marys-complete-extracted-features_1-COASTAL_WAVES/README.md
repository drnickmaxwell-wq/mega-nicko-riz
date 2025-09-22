# Coastal Generative Waves

WebGL/Canvas-based coastal wave background with time-based tinting and scroll reactivity.

## Final File Paths
- `components/effects/impl/CoastalWaves.tsx` - Main wave component
- `components/effects/impl/WaveCanvas.tsx` - Canvas implementation
- `lib/effects/wave-generator.ts` - Wave generation logic

## Installation
1. Copy files to their target paths
2. Add environment variables from `env.txt`
3. Install dependencies from `deps.txt`
4. Import and use as shown in `example.md`

## Required ENV + Flags
- `ENABLE_FX_WAVES=true` (default: true)

## Usage (10-line snippet)
```tsx
import { CoastalWaves } from '@/components/effects/impl/CoastalWaves'

export default function HomePage() {
  return (
    <div className="relative">
      <CoastalWaves intensity="medium" />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </div>
  )
}
```

## SSR Caveats
- Uses `next/dynamic` with `ssr: false` for WebGL components
- Gracefully falls back to static gradient if WebGL unavailable
- No build failures if disabled via flags

