'use client'

import React, { useState, useRef } from 'react'
import { ButtonProps } from '@/types/design'

// Base Button Component
export function Button({ 
  variant = 'primary', 
  size = 'md', 
  effect = 'none',
  disabled = false,
  loading = false,
  children, 
  onClick,
  className = '' 
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
    disabled:opacity-50 disabled:cursor-not-allowed
  `
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90', 
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl'
  }

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  // Apply effect wrapper
  if (effect === 'sparkle') {
    return <SparkleButton {...{ variant, size, disabled, loading, onClick, className: buttonClasses }}>{children}</SparkleButton>
  }
  
  if (effect === 'magnetic') {
    return <MagneticButton {...{ variant, size, disabled, loading, onClick, className: buttonClasses }}>{children}</MagneticButton>
  }
  
  if (effect === 'liquid') {
    return <LiquidButton {...{ variant, size, disabled, loading, onClick, className: buttonClasses }}>{children}</LiquidButton>
  }

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  )
}

// Sparkle Button Effect
export function SparkleButton({ children, className, onClick, disabled }: any) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])
  
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20
    }))
    
    setSparkles(newSparkles)
    setTimeout(() => setSparkles([]), 800)
    
    onClick?.(e)
  }

  return (
    <button 
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-accent rounded-full animate-ping pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDuration: '0.6s'
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// Magnetic Button Effect  
export function MagneticButton({ children, className, onClick, disabled }: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      {children}
    </button>
  )
}

// Liquid Button Effect
export function LiquidButton({ children, className, onClick, disabled }: any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 ${
          isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
        }`}
        style={{
          borderRadius: isHovered ? '60% 40% 30% 70% / 60% 30% 70% 40%' : '0.5rem'
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// Loading Spinner
function LoadingSpinner() {
  return (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
  )
}

