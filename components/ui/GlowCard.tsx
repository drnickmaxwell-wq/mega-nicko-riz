'use client'

import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function GlowCard({ children, className = '', ...rest }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={clsx(
        'relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg overflow-hidden p-6',
        className
      )}
      {...rest}
    >
      {/* Glow overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-[#C2185B]/20 via-[#40C4B4]/20 to-[#D4AF37]/20 opacity-30 blur-2xl"></div>
      </div>
      {children}
    </motion.div>
  )
}
