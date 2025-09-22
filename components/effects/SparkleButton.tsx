'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface SparkleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
  sparkleCount?: number
  glowIntensity?: number
  pulseEffect?: boolean
  magneticEffect?: boolean
  liquidEffect?: boolean
  breathingEffect?: boolean
  rippleEffect?: boolean
}

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
}

export function SparkleButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  sparkleCount = 12,
  glowIntensity = 1,
  pulseEffect = true,
  magneticEffect = true,
  liquidEffect = false,
  breathingEffect = false,
  rippleEffect = true
}: SparkleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  // Generate sparkles
  useEffect(() => {
    const generateSparkles = () => {
      return Array.from({ length: sparkleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 2
      }))
    }

    setSparkles(generateSparkles())
  }, [sparkleCount])

  // Magnetic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magneticEffect || disabled) return

    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setMousePosition({ x: x * 0.1, y: y * 0.1 })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  // Button variants
  const getVariantClasses = () => {
    const base = 'relative overflow-hidden font-semibold transition-all duration-300 font-montserrat'
    
    switch (variant) {
      case 'primary':
        return `${base} bg-gradient-to-r from-[#C2185B] to-[#40C4B4] text-white hover:shadow-2xl`
      case 'secondary':
        return `${base} bg-gradient-to-r from-[#40C4B4] to-[#D4AF37] text-white hover:shadow-2xl`
      case 'accent':
        return `${base} bg-gradient-to-r from-[#D4AF37] to-[#C2185B] text-white hover:shadow-2xl`
      default:
        return `${base} bg-gradient-to-r from-[#C2185B] to-[#40C4B4] text-white hover:shadow-2xl`
    }
  }

  // Button sizes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm rounded-lg'
      case 'md':
        return 'px-6 py-3 text-base rounded-xl'
      case 'lg':
        return 'px-8 py-4 text-lg rounded-xl'
      case 'xl':
        return 'px-10 py-5 text-xl rounded-2xl'
      default:
        return 'px-6 py-3 text-base rounded-xl'
    }
  }

  // Breathing animation
  useEffect(() => {
    if (breathingEffect && !disabled) {
      controls.start({
        scale: [1, 1.02, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    }
  }, [breathingEffect, disabled, controls])

  return (
    <motion.button
      ref={buttonRef}
      className={`${getVariantClasses()} ${getSizeClasses()} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
      animate={controls}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
      }}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-[#D4AF37] rounded-full pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          animate={{
            opacity: isHovered ? [0, sparkle.opacity, 0] : 0,
            scale: isHovered ? [0, 1, 0] : 0,
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            delay: sparkle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        animate={{
          x: isHovered ? ['100%', '-100%'] : '-100%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 1,
        }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 blur-xl"
        style={{
          background: variant === 'primary' 
            ? 'linear-gradient(to right, #C2185B, #40C4B4)'
            : variant === 'secondary'
            ? 'linear-gradient(to right, #40C4B4, #D4AF37)'
            : 'linear-gradient(to right, #D4AF37, #C2185B)',
        }}
        animate={{
          opacity: isHovered ? 0.3 * glowIntensity : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Pulse Effect */}
      {pulseEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-white/30"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            opacity: isHovered ? [0.5, 0, 0.5] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      )}

      {/* Liquid Effect */}
      {liquidEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-xl"
          animate={{
            x: isPressed ? ['-100%', '100%'] : '-100%',
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      )}

      {/* Ripple Effect */}
      {rippleEffect && isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-xl"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Floating Sparkles Around Button */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`floating-${i}`}
              className="absolute w-2 h-2 bg-[#D4AF37] rounded-full pointer-events-none"
              style={{
                left: `${-10 + Math.random() * 120}%`,
                top: `${-10 + Math.random() * 120}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, -40],
                x: [(Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </>
      )}
    </motion.button>
  )
}

// Specialized button variants
export function MagneticSparkleButton(props: Omit<SparkleButtonProps, 'magneticEffect'>) {
  return <SparkleButton {...props} magneticEffect={true} />
}

export function LiquidSparkleButton(props: Omit<SparkleButtonProps, 'liquidEffect'>) {
  return <SparkleButton {...props} liquidEffect={true} />
}

export function BreathingSparkleButton(props: Omit<SparkleButtonProps, 'breathingEffect'>) {
  return <SparkleButton {...props} breathingEffect={true} />
}

export function IntenseSparkleButton(props: Omit<SparkleButtonProps, 'sparkleCount' | 'glowIntensity'>) {
  return <SparkleButton {...props} sparkleCount={20} glowIntensity={1.5} />
}

