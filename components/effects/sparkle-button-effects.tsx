'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SparkleButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'luxury';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  sparkleCount?: number;
  sparkleColors?: string[];
  onClick?: () => void;
  disabled?: boolean;
  glowEffect?: boolean;
  pulseEffect?: boolean;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  sparkleCount = 12,
  sparkleColors = ['#D4AF37', '#FFD700', '#FFF8DC', '#FFFACD'],
  onClick,
  disabled = false,
  glowEffect = true,
  pulseEffect = false,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Variant styles
  const variantStyles = {
    primary: {
      base: 'bg-gradient-to-r from-pink-500 to-teal-500 text-white border-transparent',
      hover: 'from-pink-600 to-teal-600 shadow-lg shadow-pink-500/25',
      glow: 'shadow-lg shadow-pink-500/50',
    },
    secondary: {
      base: 'bg-gradient-to-r from-teal-500 to-yellow-500 text-white border-transparent',
      hover: 'from-teal-600 to-yellow-600 shadow-lg shadow-teal-500/25',
      glow: 'shadow-lg shadow-teal-500/50',
    },
    accent: {
      base: 'bg-gradient-to-r from-yellow-500 to-pink-500 text-white border-transparent',
      hover: 'from-yellow-600 to-pink-600 shadow-lg shadow-yellow-500/25',
      glow: 'shadow-lg shadow-yellow-500/50',
    },
    luxury: {
      base: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-slate-900 border-yellow-400',
      hover: 'from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/25',
      glow: 'shadow-xl shadow-yellow-500/60',
    },
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  // Generate sparkles
  const generateSparkles = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const newSparkles: Sparkle[] = [];

    for (let i = 0; i < sparkleCount; i++) {
      newSparkles.push({
        id: Math.random(),
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 6 + 2,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        delay: Math.random() * 0.5,
        duration: Math.random() * 1 + 0.5,
      });
    }

    setSparkles(newSparkles);
  };

  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    generateSparkles();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setSparkles([]), 1000);
  };

  // Handle click
  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    generateSparkles();
    onClick?.();
    
    setTimeout(() => setIsClicked(false), 200);
  };

  // Auto-generate sparkles for pulse effect
  useEffect(() => {
    if (pulseEffect && !disabled) {
      const interval = setInterval(() => {
        generateSparkles();
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [pulseEffect, disabled]);

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden font-semibold transition-all duration-300
        ${currentVariant.base} ${currentSize} ${className}
        ${isHovered ? currentVariant.hover : ''}
        ${glowEffect && (isHovered || pulseEffect) ? currentVariant.glow : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={pulseEffect ? {
        boxShadow: [
          '0 0 20px rgba(212, 175, 55, 0.3)',
          '0 0 40px rgba(212, 175, 55, 0.6)',
          '0 0 20px rgba(212, 175, 55, 0.3)',
        ],
      } : {}}
      transition={pulseEffect ? {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      } : { duration: 0.2 }}
    >
      {/* Button Content */}
      <span className="relative z-10">{children}</span>

      {/* Sparkle Effects */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              ease: 'easeOut',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
                borderRadius: '50%',
              }}
            />
            {/* Star shape sparkle */}
            <div
              className="absolute inset-0"
              style={{
                background: sparkle.color,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ transform: 'translateX(-100%)' }}
        animate={isHovered || isClicked ? { transform: 'translateX(100%)' } : {}}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Glow Pulse Effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] opacity-0"
          style={{
            background: `linear-gradient(45deg, ${sparkleColors[0]}40, ${sparkleColors[1]}40)`,
            filter: 'blur(8px)',
          }}
          animate={isHovered || pulseEffect ? { opacity: [0, 0.5, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

// Floating Sparkle Effect Component
interface FloatingSparklesProps {
  className?: string;
  sparkleCount?: number;
  colors?: string[];
  size?: 'sm' | 'md' | 'lg';
}

const FloatingSparkles: React.FC<FloatingSparklesProps> = ({
  className = '',
  sparkleCount = 20,
  colors = ['#D4AF37', '#FFD700', '#C2185B', '#40C4B4'],
  size = 'md',
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const sizeConfig = {
    sm: { min: 2, max: 4 },
    md: { min: 3, max: 6 },
    lg: { min: 4, max: 8 },
  };

  useEffect(() => {
    const newSparkles: Sparkle[] = [];
    
    for (let i = 0; i < sparkleCount; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (sizeConfig[size].max - sizeConfig[size].min) + sizeConfig[size].min,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    
    setSparkles(newSparkles);
  }, [sparkleCount, colors, size]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 1, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
              boxShadow: `0 0 10px ${sparkle.color}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Magic Wand Effect Component
interface MagicWandEffectProps {
  trigger: boolean;
  onComplete?: () => void;
  className?: string;
}

const MagicWandEffect: React.FC<MagicWandEffectProps> = ({
  trigger,
  onComplete,
  className = '',
}) => {
  const [particles, setParticles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Sparkle[] = [];
      
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: 50 + (Math.random() - 0.5) * 20,
          y: 50 + (Math.random() - 0.5) * 20,
          size: Math.random() * 4 + 2,
          color: ['#D4AF37', '#FFD700', '#FFF8DC'][Math.floor(Math.random() * 3)],
          delay: Math.random() * 0.5,
          duration: Math.random() * 1 + 1,
        });
      }
      
      setParticles(newParticles);
      
      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 2000);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [(Math.random() - 0.5) * 200],
                y: [(Math.random() - 0.5) * 200],
                rotate: [0, 360],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  boxShadow: `0 0 10px ${particle.color}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export { SparkleButton, FloatingSparkles, MagicWandEffect };

