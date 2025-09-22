'use client'

import { useEffect, useRef, useState } from 'react'
import { generateWavePoints, type WaveConfig } from '@/lib/effects/wave-generator'

interface WaveCanvasProps {
  intensity: 'subtle' | 'medium' | 'strong'
  interactive: boolean
}

export default function WaveCanvas({ intensity, interactive }: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const waveConfigs: WaveConfig[] = [
      {
        amplitude: intensity === 'subtle' ? 30 : intensity === 'medium' ? 50 : 80,
        frequency: 0.008,
        phase: 0,
        speed: 0.02,
        color: 'hsl(var(--primary))',
        opacity: 0.15
      },
      {
        amplitude: intensity === 'subtle' ? 20 : intensity === 'medium' ? 35 : 60,
        frequency: 0.012,
        phase: Math.PI / 3,
        speed: 0.015,
        color: 'hsl(var(--secondary))',
        opacity: 0.12
      },
      {
        amplitude: intensity === 'subtle' ? 40 : intensity === 'medium' ? 65 : 100,
        frequency: 0.006,
        phase: Math.PI / 2,
        speed: 0.025,
        color: 'hsl(var(--accent))',
        opacity: 0.08
      }
    ]

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waveConfigs.forEach((config, index) => {
        const points = generateWavePoints(
          canvas.width,
          canvas.height,
          time,
          config,
          interactive ? mousePos : undefined
        )

        ctx.beginPath()
        ctx.moveTo(0, canvas.height)
        
        points.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `${config.color}/${Math.floor(config.opacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${config.color}/00`)

        ctx.fillStyle = gradient
        ctx.fill()
      })

      time += 0.016 // ~60fps
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      if (interactive) {
        setMousePos({
          x: e.clientX / canvas.width,
          y: e.clientY / canvas.height
        })
      }
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [intensity, interactive, mousePos])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}

