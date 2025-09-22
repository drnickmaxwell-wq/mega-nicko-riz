'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';

// Stagger Animation Container
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants[direction]}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Morphing Shape Animation
interface MorphingShapeProps {
  className?: string;
  colors?: string[];
  size?: number;
  speed?: 'slow' | 'medium' | 'fast';
}

const MorphingShape: React.FC<MorphingShapeProps> = ({
  className = '',
  colors = ['#C2185B', '#40C4B4', '#D4AF37'],
  size = 100,
  speed = 'medium',
}) => {
  const speedConfig = {
    slow: 4,
    medium: 2.5,
    fast: 1.5,
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          borderRadius: [
            "50%",
            "25% 75% 75% 25%",
            "75% 25% 25% 75%",
            "50%",
          ],
          background: [
            `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
            `linear-gradient(135deg, ${colors[1]}, ${colors[2]})`,
            `linear-gradient(225deg, ${colors[2]}, ${colors[0]})`,
            `linear-gradient(315deg, ${colors[0]}, ${colors[1]})`,
          ],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{
          duration: speedConfig[speed],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

// Parallax Scroll Element
interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [0, -speed * 100]),
    down: useTransform(scrollYProgress, [0, 1], [0, speed * 100]),
    left: useTransform(scrollYProgress, [0, 1], [0, -speed * 100]),
    right: useTransform(scrollYProgress, [0, 1], [0, speed * 100]),
  };

  const transform = transforms[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [direction === 'up' || direction === 'down' ? 'y' : 'x']: transform,
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Effect
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
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
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Liquid Button Effect
interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  className = '',
  color = '#C2185B',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative overflow-hidden px-8 py-4 rounded-full border-2 font-semibold ${className}`}
      style={{ borderColor: color, color: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0, borderRadius: "50%" }}
        animate={isHovered ? { 
          scale: 1.5, 
          borderRadius: ["50%", "25% 75%", "75% 25%", "0%"] 
        } : { 
          scale: 0, 
          borderRadius: "50%" 
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <span className="relative z-10 mix-blend-difference text-white">
        {children}
      </span>
    </motion.button>
  );
};

// Breathing Animation
interface BreathingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
}

const BreathingElement: React.FC<BreathingElementProps> = ({
  children,
  className = '',
  intensity = 'medium',
  speed = 'medium',
}) => {
  const intensityConfig = {
    subtle: { scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] },
    medium: { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] },
    strong: { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] },
  };

  const speedConfig = {
    slow: 4,
    medium: 2.5,
    fast: 1.5,
  };

  const config = intensityConfig[intensity];

  return (
    <motion.div
      className={className}
      animate={{
        scale: config.scale,
        opacity: config.opacity,
      }}
      transition={{
        duration: speedConfig[speed],
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Text Reveal Animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: duration,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Ripple Effect
interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  className = '',
  color = '#C2185B',
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: color,
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ 
            width: 300, 
            height: 300, 
            opacity: 0,
            x: -150,
            y: -150,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// Floating Elements
interface FloatingElementsProps {
  className?: string;
  count?: number;
  colors?: string[];
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  className = '',
  count = 10,
  colors = ['#C2185B', '#40C4B4', '#D4AF37'],
}) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map(element => (
        <motion.div
          key={element.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
            backgroundColor: element.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export {
  StaggerContainer,
  MorphingShape,
  ParallaxElement,
  MagneticButton,
  LiquidButton,
  BreathingElement,
  TextReveal,
  RippleEffect,
  FloatingElements,
};

