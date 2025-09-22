'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassMorphismProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'panel' | 'button' | 'navigation' | 'overlay' | 'floating';
  intensity?: 'subtle' | 'medium' | 'strong' | 'ultra';
  borderGlow?: boolean;
  animated?: boolean;
}

const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className = '',
  variant = 'card',
  intensity = 'medium',
  borderGlow = false,
  animated = false,
}) => {
  // Glass morphism configurations
  const glassConfig = {
    subtle: {
      backdrop: 'backdrop-blur-sm',
      background: 'bg-white/10',
      border: 'border border-white/20',
      shadow: 'shadow-lg',
    },
    medium: {
      backdrop: 'backdrop-blur-md',
      background: 'bg-white/20',
      border: 'border border-white/30',
      shadow: 'shadow-xl',
    },
    strong: {
      backdrop: 'backdrop-blur-lg',
      background: 'bg-white/30',
      border: 'border border-white/40',
      shadow: 'shadow-2xl',
    },
    ultra: {
      backdrop: 'backdrop-blur-xl',
      background: 'bg-white/40',
      border: 'border border-white/50',
      shadow: 'shadow-2xl drop-shadow-2xl',
    },
  };

  // Variant-specific styles
  const variantStyles = {
    card: 'rounded-3xl p-6',
    panel: 'rounded-2xl p-8',
    button: 'rounded-xl px-6 py-3',
    navigation: 'rounded-none',
    overlay: 'rounded-lg p-4',
    floating: 'rounded-full p-4',
  };

  const config = glassConfig[intensity];
  const variantStyle = variantStyles[variant];

  // Border glow effect
  const borderGlowStyle = borderGlow
    ? 'before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-r before:from-pink-500/50 before:via-teal-500/50 before:to-yellow-500/50 before:mask-composite-exclude before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] relative'
    : '';

  // Animation variants
  const animationVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const baseClasses = `
    ${config.backdrop}
    ${config.background}
    ${config.border}
    ${config.shadow}
    ${variantStyle}
    ${borderGlowStyle}
    ${className}
  `.trim();

  if (animated) {
    return (
      <motion.div
        className={baseClasses}
        variants={animationVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

// Floating Glass Panel Component
interface FloatingGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const FloatingGlassPanel: React.FC<FloatingGlassPanelProps> = ({
  children,
  className = '',
  position = 'center',
  size = 'md',
}) => {
  const positionStyles = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  const sizeStyles = {
    sm: 'w-64 h-32',
    md: 'w-80 h-48',
    lg: 'w-96 h-64',
    xl: 'w-[32rem] h-80',
  };

  return (
    <motion.div
      className={`
        fixed z-50 ${positionStyles[position]} ${sizeStyles[size]}
        backdrop-blur-xl bg-white/25 border border-white/30
        rounded-3xl shadow-2xl ${className}
      `}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

// Glass Navigation Component
interface GlassNavigationProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

const GlassNavigation: React.FC<GlassNavigationProps> = ({
  children,
  className = '',
  sticky = true,
}) => {
  return (
    <motion.nav
      className={`
        ${sticky ? 'sticky top-0' : ''} z-40 w-full
        backdrop-blur-xl bg-white/20 border-b border-white/20
        shadow-lg ${className}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
    >
      {children}
    </motion.nav>
  );
};

// Glass Button Component
interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
}) => {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-pink-500/30 to-teal-500/30 border-pink-500/50 hover:from-pink-500/40 hover:to-teal-500/40',
    secondary: 'bg-white/20 border-white/30 hover:bg-white/30',
    accent: 'bg-gradient-to-r from-yellow-500/30 to-pink-500/30 border-yellow-500/50 hover:from-yellow-500/40 hover:to-pink-500/40',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={`
        backdrop-blur-md ${variantStyles[variant]} ${sizeStyles[size]}
        border rounded-xl shadow-lg font-medium text-white
        transition-all duration-300 ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
      `}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
};

// Glass Card with Layered Effect
interface LayeredGlassCardProps {
  children: React.ReactNode;
  className?: string;
  layers?: number;
}

const LayeredGlassCard: React.FC<LayeredGlassCardProps> = ({
  children,
  className = '',
  layers = 3,
}) => {
  const layerElements = Array.from({ length: layers }, (_, index) => (
    <div
      key={index}
      className={`
        absolute inset-0 rounded-3xl backdrop-blur-sm
        bg-white/${10 + index * 5} border border-white/${20 + index * 10}
        transform rotate-${index} translate-x-${index} translate-y-${index}
      `}
      style={{
        transform: `rotate(${index * 2}deg) translate(${index * 2}px, ${index * 2}px)`,
        zIndex: layers - index,
      }}
    />
  ));

  return (
    <div className={`relative ${className}`}>
      {layerElements}
      <div className="relative z-10 p-6 rounded-3xl backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export {
  GlassMorphism,
  FloatingGlassPanel,
  GlassNavigation,
  GlassButton,
  LayeredGlassCard,
};

