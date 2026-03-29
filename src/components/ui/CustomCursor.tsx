'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [label, setLabel] = useState('')
  const [mounted, setMounted] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const outerSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 }
  const outerXSpring = useSpring(cursorX, outerSpringConfig)
  const outerYSpring = useSpring(cursorY, outerSpringConfig)

  useEffect(() => {
    setMounted(true)

    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (isTouch) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const linkOrBtn = target.closest('a, button, input[type="submit"]')

      if (linkOrBtn) {
        setIsHovered(true)
        const actionLabel = linkOrBtn.getAttribute('data-cursor-label')
        if (actionLabel) {
          setLabel(actionLabel)
        } else if (linkOrBtn.tagName.toLowerCase() === 'a') {
          setLabel('visit')
        } else {
          setLabel('click')
        }
      } else {
        setIsHovered(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <>
      {/* Outer ring — slow follow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-10000 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-transparent md:block"
        style={{
          x: outerXSpring,
          y: outerYSpring,
          width: isHovered ? 48 : 12,
          height: isHovered ? 48 : 12,
          transition: 'width 0.3s, height 0.3s',
        }}
      />
      {/* Inner dot — fast follow + mix-blend-difference */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-10001 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovered ? 48 : 4,
          height: isHovered ? 48 : 4,
          transition: 'width 0.2s, height 0.2s',
          backgroundColor: isHovered ? 'transparent' : 'var(--color-gold)',
        }}
      >
        {isHovered && label && (
          <span className="whitespace-nowrap font-body text-[9px] uppercase tracking-wider text-text-primary opacity-80">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
