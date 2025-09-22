'use client'

import dynamic from 'next/dynamic'
import { useFlags } from '@/lib/flags'

const WaveCanvas = dynamic(() => import('./WaveCanvas'), {
  ssr: false,
  loading: () => <WaveFallback />
})

interface CoastalWavesProps {
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
  interactive?: boolean
}

function WaveFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
  )
}

export function CoastalWaves({ 
  intensity = 'medium', 
  className = '',
  interactive = true 
}: CoastalWavesProps) {
  const { ENABLE_FX_WAVES } = useFlags()
  
  if (!ENABLE_FX_WAVES) {
    return <WaveFallback />
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <WaveCanvas 
        intensity={intensity}
        interactive={interactive}
      />
    </div>
  )
}

