'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface HoverCard3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  glowEffect?: boolean;
  rotateOnHover?: boolean;
}

const HoverCard3D: React.FC<HoverCard3DProps> = ({
  children,
  className = '',
  intensity = 'medium',
  glowEffect = true,
  rotateOnHover = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const intensityConfig = {
    subtle: { rotate: 5, scale: 1.02 },
    medium: { rotate: 10, scale: 1.05 },
    strong: { rotate: 15, scale: 1.08 },
  };

  const config = intensityConfig[intensity];

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [config.rotate, -config.rotate]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-config.rotate, config.rotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: rotateOnHover ? rotateX : 0,
        rotateY: rotateOnHover ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: config.scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}

      {/* Glow effect */}
      {glowEffect && isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-teal-500/20 to-yellow-500/20 rounded-inherit blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTransform = () => {
    const offset = scrollY * speed;
    switch (direction) {
      case 'up': return `translateY(-${offset}px)`;
      case 'down': return `translateY(${offset}px)`;
      case 'left': return `translateX(-${offset}px)`;
      case 'right': return `translateX(${offset}px)`;
      default: return `translateY(-${offset}px)`;
    }
  };

  return (
    <div
      className={className}
      style={{ transform: getTransform() }}
    >
      {children}
    </div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className = '',
  onClick,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={`relative ${className}`}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

interface FloatingGeometryProps {
  shape?: 'circle' | 'square' | 'triangle' | 'hexagon';
  size?: 'sm' | 'md' | 'lg';
  color?: 'magenta' | 'turquoise' | 'gold';
  animation?: 'float' | 'rotate' | 'pulse' | 'orbit';
  className?: string;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  shape = 'circle',
  size = 'md',
  color = 'magenta',
  animation = 'float',
  className = '',
}) => {
  const colors = {
    magenta: '#C2185B',
    turquoise: '#40C4B4',
    gold: '#D4AF37',
  };

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'rounded-sm',
    hexagon: 'rounded-lg',
  };

  const animations = {
    float: {
      y: [-10, 10, -10],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 8, repeat: Infinity, ease: 'linear' },
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
    orbit: {
      rotate: [0, 360],
      transition: { duration: 10, repeat: Infinity, ease: 'linear' },
    },
  };

  return (
    <motion.div
      className={`${sizes[size]} ${shapes[shape]} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors[color]}, ${colors[color]}80)`,
        boxShadow: `0 4px 20px ${colors[color]}40`,
      }}
      animate={animations[animation]}
    />
  );
};

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
}

const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  onClick,
  className = '',
  color = 'primary',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    primary: 'from-pink-500 to-teal-500',
    secondary: 'from-teal-500 to-yellow-500',
    accent: 'from-yellow-500 to-pink-500',
  };

  return (
    <motion.button
      className={`
        relative px-8 py-4 rounded-full text-white font-semibold overflow-hidden
        bg-gradient-to-r ${colors[color]} ${className}
      `}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Liquid effect */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={isHovered ? { clipPath: 'circle(100% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-full"
        animate={isHovered ? {
          scale: [1, 1.2, 1],
          opacity: [0, 0.5, 0],
        } : {}}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}) => {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  const initialDirection = directions[direction];

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: initialDirection.y, 
        x: initialDirection.x 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration, 
        delay, 
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={index * staggerDelay}
          direction="up"
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};

interface MorphingShapeProps {
  shapes: string[];
  duration?: number;
  className?: string;
  color?: string;
}

const MorphingShape: React.FC<MorphingShapeProps> = ({
  shapes,
  duration = 3,
  className = '',
  color = '#C2185B',
}) => {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShapeIndex((prev) => (prev + 1) % shapes.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [shapes.length, duration]);

  return (
    <motion.div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={shapes[currentShapeIndex]}
          fill={color}
          animate={{ d: shapes[currentShapeIndex] }}
          transition={{ duration: duration * 0.8, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
};

export {
  HoverCard3D,
  ParallaxElement,
  MagneticButton,
  FloatingGeometry,
  LiquidButton,
  ScrollReveal,
  StaggeredReveal,
  MorphingShape,
};

