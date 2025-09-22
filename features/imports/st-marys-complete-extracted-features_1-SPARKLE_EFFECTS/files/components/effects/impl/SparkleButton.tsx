'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useFlags } from '@/lib/flags'
import { generateSparkles } from '@/lib/effects/sparkle-generator'

interface SparkleButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function SparkleButton({
  children,
  variant = 'primary',
  intensity = 'medium',
  className = '',
  onClick,
  disabled = false
}: SparkleButtonProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { ENABLE_FX_SPARKLES } = useFlags()

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (ENABLE_FX_SPARKLES && !disabled) {
      const newSparkles = generateSparkles(intensity)
      setSparkles(newSparkles)
      
      // Clear sparkles after animation
      setTimeout(() => setSparkles([]), 1000)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ENABLE_FX_SPARKLES && !disabled) {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (rect) {
        const clickSparkles = Array.from({ length: 8 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100
        }))
        setSparkles(clickSparkles)
        setTimeout(() => setSparkles([]), 800)
      }
    }
    onClick?.()
  }

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
  }

  return (
    <Button
      ref={buttonRef}
      className={`
        relative overflow-hidden transition-all duration-300
        ${variantClasses[variant]}
        ${isHovered && ENABLE_FX_SPARKLES ? 'transform scale-105' : ''}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* Shimmer Effect */}
      {ENABLE_FX_SPARKLES && (
        <div
          className={`
            absolute inset-0 -translate-x-full
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            transition-transform duration-700 ease-out
            ${isHovered ? 'translate-x-full' : ''}
          `}
        />
      )}

      {/* Sparkles */}
      {ENABLE_FX_SPARKLES && sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-accent rounded-full animate-ping pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDuration: '0.8s',
            boxShadow: '0 0 6px hsl(var(--accent))'
          }}
        />
      ))}

      {/* Button Content */}
      <span className="relative z-10 font-semibold">
        {children}
      </span>

      {/* Glow Effect */}
      {ENABLE_FX_SPARKLES && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-md blur-sm" />
      )}
    </Button>
  )
}

