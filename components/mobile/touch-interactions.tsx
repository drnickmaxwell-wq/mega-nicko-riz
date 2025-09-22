'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  className?: string;
  disabled?: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 100,
  className = '',
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Brand-consistent visual feedback
  const rotateX = useTransform(y, [-threshold, 0, threshold], [5, 0, -5]);
  const rotateY = useTransform(x, [-threshold, 0, threshold], [-5, 0, 5]);
  const opacity = useTransform(x, [-threshold * 2, 0, threshold * 2], [0.5, 1, 0.5]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    
    if (disabled) return;

    const { offset } = info;
    
    // Horizontal swipes
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (offset.x > threshold && onSwipeRight) {
        onSwipeRight();
      } else if (offset.x < -threshold && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    // Vertical swipes
    else {
      if (offset.y > threshold && onSwipeDown) {
        onSwipeDown();
      } else if (offset.y < -threshold && onSwipeUp) {
        onSwipeUp();
      }
    }

    // Reset position
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative ${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        opacity,
      }}
      drag={!disabled}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      
      {/* Swipe indicators with brand colors */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Left swipe indicator */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-pink-500 to-transparent rounded-full opacity-0"
            animate={{ opacity: x.get() < -50 ? 1 : 0 }}
          />
          
          {/* Right swipe indicator */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-l from-teal-500 to-transparent rounded-full opacity-0"
            animate={{ opacity: x.get() > 50 ? 1 : 0 }}
          />
          
          {/* Up swipe indicator */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-yellow-500 to-transparent rounded-full opacity-0"
            animate={{ opacity: y.get() < -50 ? 1 : 0 }}
          />
          
          {/* Down swipe indicator */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-t from-yellow-500 to-transparent rounded-full opacity-0"
            animate={{ opacity: y.get() > 50 ? 1 : 0 }}
          />
        </div>
      )}
    </motion.div>
  );
};

interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  hapticFeedback?: boolean;
  className?: string;
  disabled?: boolean;
}

const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  hapticFeedback = true,
  className = '',
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-pink-500 to-teal-500 text-white shadow-lg shadow-pink-500/25',
    secondary: 'bg-white text-slate-700 border border-slate-200 shadow-md',
    ghost: 'bg-transparent text-slate-600 border border-slate-300',
  };

  const sizes = {
    sm: 'px-4 py-3 text-sm min-h-[44px]', // iOS minimum touch target
    md: 'px-6 py-4 text-base min-h-[48px]',
    lg: 'px-8 py-5 text-lg min-h-[52px]',
  };

  const handleTouchStart = () => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Haptic feedback for supported devices
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <motion.button
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-xl font-semibold transition-all duration-200
        active:scale-95 touch-manipulation
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      animate={{
        boxShadow: isPressed 
          ? '0 4px 20px rgba(194, 24, 91, 0.4)' 
          : '0 10px 25px rgba(194, 24, 91, 0.25)',
      }}
    >
      {children}
    </motion.button>
  );
};

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  threshold = 80,
  className = '',
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const y = useMotionValue(0);

  const handleDrag = (event: any, info: PanInfo) => {
    if (info.offset.y > 0 && window.scrollY === 0) {
      const distance = Math.min(info.offset.y, threshold * 1.5);
      setPullDistance(distance);
      y.set(distance);
    }
  };

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (info.offset.y > threshold && window.scrollY === 0 && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
        y.set(0);
      }
    } else {
      setPullDistance(0);
      y.set(0);
    }
  };

  const refreshProgress = Math.min(pullDistance / threshold, 1);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ y }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      {/* Pull to refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center">
            {/* Refresh icon with brand colors */}
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-teal-500 flex items-center justify-center mb-2"
              animate={{
                rotate: isRefreshing ? 360 : refreshProgress * 180,
              }}
              transition={{
                rotate: isRefreshing 
                  ? { duration: 1, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.2 },
              }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.div>
            
            {/* Progress text */}
            <p className="text-xs text-slate-600" style={{ fontFamily: 'Lora, serif' }}>
              {isRefreshing ? 'Refreshing...' : refreshProgress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
            </p>
          </div>
        </motion.div>
      )}
      
      {children}
    </motion.div>
  );
};

interface TouchSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

const TouchSlider: React.FC<TouchSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
  disabled = false,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleTouch = (clientX: number) => {
    if (!sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    
    onChange(Math.max(min, Math.min(max, steppedValue)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleTouch(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || disabled) return;
    e.preventDefault();
    handleTouch(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Slider track */}
      <div
        ref={sliderRef}
        className={`
          relative h-12 bg-slate-200 rounded-full cursor-pointer touch-manipulation
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress track with brand gradient */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 to-teal-500 rounded-full"
          style={{ width: `${percentage}%` }}
          animate={{
            boxShadow: isDragging 
              ? '0 0 20px rgba(194, 24, 91, 0.4)' 
              : '0 0 10px rgba(194, 24, 91, 0.2)',
          }}
        />
        
        {/* Slider thumb */}
        <motion.div
          className="absolute top-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-pink-500 transform -translate-y-1/2"
          style={{ left: `calc(${percentage}% - 16px)` }}
          animate={{
            scale: isDragging ? 1.2 : 1,
            boxShadow: isDragging 
              ? '0 4px 20px rgba(194, 24, 91, 0.3)' 
              : '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
      
      {/* Value display */}
      <div className="flex justify-between mt-2 text-sm text-slate-600" style={{ fontFamily: 'Lora, serif' }}>
        <span>{min}</span>
        <span className="font-semibold text-pink-600">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

interface LongPressButtonProps {
  children: React.ReactNode;
  onLongPress: () => void;
  duration?: number;
  className?: string;
  disabled?: boolean;
}

const LongPressButton: React.FC<LongPressButtonProps> = ({
  children,
  onLongPress,
  duration = 1000,
  className = '',
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();

  const handleStart = () => {
    if (disabled) return;
    
    setIsPressed(true);
    setProgress(0);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    // Progress animation
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 50));
        return Math.min(100, newProgress);
      });
    }, 50);
    
    // Long press trigger
    timeoutRef.current = setTimeout(() => {
      onLongPress();
      setIsPressed(false);
      setProgress(0);
      
      // Success haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
      }
    }, duration);
  };

  const handleEnd = () => {
    setIsPressed(false);
    setProgress(0);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.button
      className={`
        relative overflow-hidden bg-gradient-to-r from-pink-500 to-teal-500 text-white
        px-6 py-4 rounded-xl font-semibold touch-manipulation
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Progress overlay */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export {
  SwipeableCard,
  TouchButton,
  PullToRefresh,
  TouchSlider,
  LongPressButton,
};

