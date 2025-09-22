'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  opacity: number
  type: 'circle' | 'sparkle' | 'triangle' | 'diamond'
  rotation: number
  rotationSpeed: number
}

interface CoastalParticlesProps {
  particleCount?: number
  className?: string
  interactive?: boolean
  speed?: number
  size?: number
  opacity?: number
}

export function CoastalParticles({
  particleCount = 50,
  className = '',
  interactive = true,
  speed = 1,
  size = 1,
  opacity = 0.6
}: CoastalParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  // St Mary's brand colors
  const brandColors = ['#C2185B', '#40C4B4', '#D4AF37', '#C2185B80', '#40C4B480', '#D4AF3780']

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 4 + 2) * size,
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        speedX: (Math.random() - 0.5) * 2 * speed,
        speedY: (Math.random() - 0.5) * 2 * speed,
        opacity: (Math.random() * 0.5 + 0.3) * opacity,
        type: ['circle', 'sparkle', 'triangle', 'diamond'][Math.floor(Math.random() * 4)] as Particle['type'],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      }))
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [particleCount, speed, size, opacity, brandColors])

  // Mouse interaction
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Mouse interaction
        if (interactive) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.x -= dx * force * 0.01
            particle.y -= dy * force * 0.01
          }
        }

        // Boundary wrapping
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10

        // Draw particle
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.globalAlpha = particle.opacity

        // Set color
        ctx.fillStyle = particle.color
        ctx.strokeStyle = particle.color

        // Draw based on type
        switch (particle.type) {
          case 'circle':
            ctx.beginPath()
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break

          case 'sparkle':
            drawSparkle(ctx, particle.size)
            break

          case 'triangle':
            drawTriangle(ctx, particle.size)
            break

          case 'diamond':
            drawDiamond(ctx, particle.size)
            break
        }

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, interactive])

  const drawSparkle = (ctx: CanvasRenderingContext2D, size: number) => {
    const spikes = 4
    const outerRadius = size
    const innerRadius = size * 0.4

    ctx.beginPath()
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / spikes
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
  }

  const drawTriangle = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(-size * 0.866, size * 0.5)
    ctx.lineTo(size * 0.866, size * 0.5)
    ctx.closePath()
    ctx.fill()
  }

  const drawDiamond = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(size, 0)
    ctx.lineTo(0, size)
    ctx.lineTo(-size, 0)
    ctx.closePath()
    ctx.fill()
  }

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

// Specialized particle variants
export function SubtleCoastalParticles(props: Omit<CoastalParticlesProps, 'particleCount' | 'opacity'>) {
  return (
    <CoastalParticles
      {...props}
      particleCount={30}
      opacity={0.3}
    />
  )
}

export function IntenseCoastalParticles(props: Omit<CoastalParticlesProps, 'particleCount' | 'speed'>) {
  return (
    <CoastalParticles
      {...props}
      particleCount={80}
      speed={1.5}
    />
  )
}

export function StaticCoastalParticles(props: Omit<CoastalParticlesProps, 'interactive' | 'speed'>) {
  return (
    <CoastalParticles
      {...props}
      interactive={false}
      speed={0.3}
    />
  )
}

