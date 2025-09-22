'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'left-to-right' | 'right-to-left' | 'center-out';
  trigger?: 'hover' | 'always' | 'viewport';
}

const ShimmerText: React.FC<ShimmerTextProps> = ({
  children,
  className = '',
  intensity = 'medium',
  speed = 'medium',
  direction = 'left-to-right',
  trigger = 'hover',
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  // Intensity configurations with brand colors
  const intensityConfig = {
    subtle: {
      colors: ['rgba(212, 175, 55, 0.3)', 'rgba(255, 255, 255, 0.8)', 'rgba(212, 175, 55, 0.3)'],
      size: '200%',
    },
    medium: {
      colors: ['rgba(212, 175, 55, 0.5)', 'rgba(255, 255, 255, 1)', 'rgba(212, 175, 55, 0.5)'],
      size: '300%',
    },
    strong: {
      colors: ['rgba(212, 175, 55, 0.7)', 'rgba(255, 255, 255, 1)', 'rgba(212, 175, 55, 0.7)'],
      size: '400%',
    },
  };

  // Speed configurations
  const speedConfig = {
    slow: '3s',
    medium: '2s',
    fast: '1.5s',
  };

  // Direction configurations
  const directionConfig = {
    'left-to-right': '-200% 0, 200% 0',
    'right-to-left': '200% 0, -200% 0',
    'center-out': '0 0, -200% 0, 200% 0',
  };

  const config = intensityConfig[intensity];
  const animationDuration = speedConfig[speed];
  const animationValues = directionConfig[direction];

  const shimmerStyle = {
    background: `linear-gradient(90deg, ${config.colors.join(', ')})`,
    backgroundSize: config.size,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundPosition: '-200% 0',
  };

  const animationClass = `shimmer-${trigger}-${intensity}-${speed}-${direction}`;

  useEffect(() => {
    // Inject CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animationClass} {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      .${animationClass} {
        animation: ${animationClass} ${animationDuration} ease-in-out;
      }
      
      .${animationClass}-hover:hover {
        animation: ${animationClass} ${animationDuration} ease-in-out;
      }
      
      .${animationClass}-always {
        animation: ${animationClass} ${animationDuration} ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [animationClass, animationDuration]);

  const triggerClass = trigger === 'always' 
    ? `${animationClass}-always` 
    : trigger === 'hover' 
    ? `${animationClass}-hover` 
    : '';

  return (
    <motion.div
      ref={textRef}
      className={`${className} ${triggerClass}`}
      style={shimmerStyle}
      initial={trigger === 'viewport' ? { backgroundPosition: '-200% 0' } : undefined}
      whileInView={trigger === 'viewport' ? { backgroundPosition: '200% 0' } : undefined}
      transition={trigger === 'viewport' ? { duration: parseFloat(animationDuration), ease: 'easeInOut' } : undefined}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'rainbow';
  animate?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  variant = 'primary',
  animate = false,
}) => {
  const gradients = {
    primary: 'linear-gradient(135deg, #C2185B 0%, #40C4B4 50%, #D4AF37 100%)',
    secondary: 'linear-gradient(135deg, #40C4B4 0%, #D4AF37 100%)',
    accent: 'linear-gradient(135deg, #D4AF37 0%, #C2185B 100%)',
    rainbow: 'linear-gradient(135deg, #C2185B 0%, #40C4B4 25%, #D4AF37 50%, #C2185B 75%, #40C4B4 100%)',
  };

  const baseStyle = {
    background: gradients[variant],
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: animate ? '200% 200%' : '100% 100%',
  };

  return (
    <motion.span
      className={className}
      style={baseStyle}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : undefined}
      transition={animate ? {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
    >
      {children}
    </motion.span>
  );
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(cursor);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        
        if (index >= text.length) {
          clearInterval(interval);
          if (cursor) {
            setTimeout(() => setShowCursor(false), 1000);
          }
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, cursor, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-[1em] bg-gradient-to-b from-pink-500 to-teal-500 ml-1"
        />
      )}
    </span>
  );
};

interface FloatingTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  direction?: 'up' | 'down' | 'random';
}

const FloatingText: React.FC<FloatingTextProps> = ({
  children,
  className = '',
  intensity = 'medium',
  direction = 'up',
}) => {
  const intensityConfig = {
    subtle: { y: [-2, 2], duration: 3 },
    medium: { y: [-5, 5], duration: 2.5 },
    strong: { y: [-8, 8], duration: 2 },
  };

  const config = intensityConfig[intensity];
  const yValues = direction === 'up' 
    ? [-Math.abs(config.y[0]), Math.abs(config.y[1])]
    : direction === 'down'
    ? [Math.abs(config.y[0]), -Math.abs(config.y[1])]
    : config.y;

  return (
    <motion.div
      className={className}
      animate={{
        y: yValues,
        rotate: [-0.5, 0.5, -0.5],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'magenta' | 'turquoise' | 'gold' | 'white';
  intensity?: 'subtle' | 'medium' | 'strong';
  pulse?: boolean;
}

const GlowText: React.FC<GlowTextProps> = ({
  children,
  className = '',
  color = 'gold',
  intensity = 'medium',
  pulse = false,
}) => {
  const colorConfig = {
    magenta: '#C2185B',
    turquoise: '#40C4B4',
    gold: '#D4AF37',
    white: '#FFFFFF',
  };

  const intensityConfig = {
    subtle: '0 0 10px',
    medium: '0 0 20px',
    strong: '0 0 30px',
  };

  const glowColor = colorConfig[color];
  const glowIntensity = intensityConfig[intensity];

  const textStyle = {
    textShadow: `${glowIntensity} ${glowColor}`,
    color: glowColor,
  };

  return (
    <motion.span
      className={className}
      style={textStyle}
      animate={pulse ? {
        textShadow: [
          `${glowIntensity} ${glowColor}`,
          `0 0 ${parseInt(glowIntensity.split(' ')[2]) * 1.5}px ${glowColor}`,
          `${glowIntensity} ${glowColor}`,
        ],
      } : undefined}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
    >
      {children}
    </motion.span>
  );
};

// Export all components
export {
  ShimmerText,
  GradientText,
  TypewriterText,
  FloatingText,
  GlowText,
};

// Utility function to apply text effects to existing components
export const withTextEffect = (
  Component: React.ComponentType<any>,
  effect: 'shimmer' | 'gradient' | 'glow' | 'float',
  options: any = {}
) => {
  return React.forwardRef<any, any>((props, ref) => {
    const EffectComponent = {
      shimmer: ShimmerText,
      gradient: GradientText,
      glow: GlowText,
      float: FloatingText,
    }[effect];

    return (
      <EffectComponent {...options}>
        <Component {...props} ref={ref} />
      </EffectComponent>
    );
  });
};

