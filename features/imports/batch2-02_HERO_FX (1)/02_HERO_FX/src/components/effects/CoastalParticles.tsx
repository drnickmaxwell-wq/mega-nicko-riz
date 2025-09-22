'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

interface CoastalParticlesProps {
  count?: number
  intensity?: 'low' | 'medium' | 'high'
  colors?: string[]
  className?: string
}

const BRAND_COLORS = [
  'rgba(194, 24, 91, 0.6)',   // Magenta
  'rgba(64, 196, 180, 0.6)',  // Turquoise
  'rgba(212, 175, 55, 0.6)',  // Gold
  'rgba(255, 255, 255, 0.4)', // White
  'rgba(173, 216, 230, 0.5)'  // Light Blue
]

export function CoastalParticles({
  count = 50,
  intensity = 'medium',
  colors = BRAND_COLORS,
  className = ''
}: CoastalParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  // Adjust particle count based on intensity
  const particleCount = {
    low: Math.floor(count * 0.5),
    medium: count,
    high: Math.floor(count * 1.5)
  }[intensity]

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(false)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
        life: 0,
        maxLife: Math.random() * 300 + 200
      }))
    }

    initParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Add some wave-like motion
        particle.vy += Math.sin(particle.life * 0.01) * 0.01
        particle.vx += Math.cos(particle.life * 0.008) * 0.005

        // Fade in/out based on life
        const lifeFactor = Math.sin((particle.life / particle.maxLife) * Math.PI)
        const currentOpacity = particle.opacity * lifeFactor

        // Wrap around screen edges
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10

        // Reset particle if life exceeded
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = 0
          particle.maxLife = Math.random() * 300 + 200
          particle.color = colors[Math.floor(Math.random() * colors.length)]
        }

        // Draw particle
        ctx.save()
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow
        ctx.shadowBlur = particle.size * 2
        ctx.shadowColor = particle.color
        ctx.fill()
        
        ctx.restore()

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (1 - distance / 100) * 0.1
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [particleCount, colors, prefersReducedMotion])

  if (!isVisible || prefersReducedMotion) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

