# Coastal Waves Usage Examples

## Basic Usage
```tsx
import { CoastalWaves } from '@/components/effects/impl/CoastalWaves'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <CoastalWaves intensity="medium" />
      <div className="relative z-10">
        <h1>Your content here</h1>
      </div>
    </div>
  )
}
```

## Advanced Usage with Custom Styling
```tsx
import { CoastalWaves } from '@/components/effects/impl/CoastalWaves'

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      <CoastalWaves 
        intensity="strong" 
        interactive={true}
        className="opacity-80"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white">
            St Mary's House Dental Care
          </h1>
          <p className="text-xl text-white/80 mt-4">
            Luxury Coastal Dentistry
          </p>
        </div>
      </div>
    </section>
  )
}
```

