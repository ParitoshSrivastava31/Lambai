'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface NumberTickerProps {
  value: number
  delay?: number
  className?: string
  suffix?: string
}

export function NumberTicker({ value, delay = 0, className, suffix = '' }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  })

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value)
      }, delay * 1000)
    }
  }, [motionValue, isInView, value, delay])

  const displayValue = useTransform(springValue, (latest) => {
    const rounded = Math.round(latest)
    return `${rounded}${suffix}`
  })

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  )
}
