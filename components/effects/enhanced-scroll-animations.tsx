'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = '',
  threshold = 0.1,
  once = true
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold, 
    once,
    margin: "-10% 0px -10% 0px"
  });

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      case 'rotate':
        return { opacity: 0, rotate: 15, scale: 0.9 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'rotate':
        return { opacity: 1, rotate: 0, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function StaggeredReveal({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  className = ''
}: StaggeredRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.1, once: true });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
          once={true}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

interface ScrollProgressProps {
  children: React.ReactNode;
  className?: string;
  color?: 'pink' | 'teal' | 'yellow' | 'gradient';
}

export function ScrollProgress({ 
  children, 
  className = '',
  color = 'gradient'
}: ScrollProgressProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getProgressColor = () => {
    switch (color) {
      case 'pink':
        return 'from-pink-500 to-pink-600';
      case 'teal':
        return 'from-teal-500 to-teal-600';
      case 'yellow':
        return 'from-yellow-500 to-yellow-600';
      case 'gradient':
      default:
        return 'from-pink-500 via-teal-500 to-yellow-500';
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Progress Bar */}
      <motion.div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getProgressColor()} rounded-full`}
        style={{
          scaleY: scrollYProgress,
          transformOrigin: 'top'
        }}
      />
      
      {/* Content */}
      <div className="pl-8">
        {children}
      </div>
    </div>
  );
}

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxText({ 
  children, 
  speed = 0.5,
  className = ''
}: ParallaxTextProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = ''
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.5, once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}

export function Typewriter({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  cursor = true
}: TypewriterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.5, once: true });
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        
        if (index >= text.length) {
          clearInterval(interval);
          if (cursor) {
            // Blink cursor
            setInterval(() => {
              setShowCursor(prev => !prev);
            }, 500);
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, text, speed, delay, cursor]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && showCursor && (
        <motion.span
          className="inline-block w-0.5 h-6 bg-gradient-to-b from-pink-500 to-teal-500 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

interface MorphingShapeProps {
  className?: string;
  color?: 'pink' | 'teal' | 'yellow';
  size?: number;
}

export function MorphingShape({ 
  className = '',
  color = 'pink',
  size = 100
}: MorphingShapeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });

  const getColor = () => {
    switch (color) {
      case 'pink':
        return '#C2185B';
      case 'teal':
        return '#40C4B4';
      case 'yellow':
        return '#D4AF37';
      default:
        return '#C2185B';
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          width: size,
          height: size,
          background: `linear-gradient(45deg, ${getColor()}, ${getColor()}80)`
        }}
        animate={isInView ? {
          borderRadius: [
            "20% 80% 80% 20%",
            "80% 20% 20% 80%",
            "50% 50% 50% 50%",
            "20% 80% 80% 20%"
          ],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 0.9, 1.05, 1]
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="blur-sm opacity-30"
      />
    </div>
  );
}

interface WaveRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'center';
}

export function WaveReveal({ 
  children, 
  className = '',
  direction = 'left'
}: WaveRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });

  const getClipPath = () => {
    switch (direction) {
      case 'left':
        return isInView 
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(0 0, 0 0, 0 100%, 0 100%)';
      case 'right':
        return isInView
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
      case 'center':
        return isInView
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)';
      default:
        return 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        clipPath: getClipPath()
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hook for scroll-triggered animations
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return { ref, isInView, hasAnimated };
}

