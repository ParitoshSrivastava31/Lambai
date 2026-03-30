'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect()
    const centeredX = clientX - (left + width / 2)
    const centeredY = clientY - (top + height / 2)
    x.set(Math.max(-20, Math.min(20, centeredX * 0.2)))
    y.set(Math.max(-20, Math.min(20, centeredY * 0.2)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        x: mounted ? xSpring : 0,
        y: mounted ? ySpring : 0,
      }}
      className={cn(
        "relative cursor-pointer rounded-full border border-gold px-6 md:px-8 py-3 md:py-4 font-body text-xs md:text-sm uppercase tracking-widest text-gold shadow-sm transition-all hover:bg-gold hover:text-void hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
