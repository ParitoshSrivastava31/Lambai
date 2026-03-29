'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  splitBy?: 'word' | 'line' | 'char'
  delay?: number
  className?: string
}

export function AnimatedText({
  text,
  as: Component = 'p',
  splitBy = 'word',
  delay = 0,
  className = '',
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  let units: string[] = []
  if (splitBy === 'word') {
    units = text.split(' ')
  } else if (splitBy === 'char') {
    units = text.split('')
  } else if (splitBy === 'line') {
    units = text.split('\n')
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (customDelay: number) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: customDelay },
    }),
  }

  return (
    <Component className={className} ref={ref}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={delay}
        aria-hidden="true"
        className="inline-flex flex-wrap"
      >
        {units.map((unit, index) => (
          <span
            key={index}
            className={`overflow-hidden ${splitBy === 'word' ? 'mr-[0.25em]' : ''} ${
              splitBy === 'line' ? 'block w-full' : 'inline-block'
            }`}
          >
            <motion.span variants={fadeUp} className="inline-block relative">
              {unit === ' ' && splitBy === 'char' ? '\u00A0' : unit}
              {splitBy === 'line' && unit === '' ? '\u00A0' : null}
            </motion.span>
          </span>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Component>
  )
}
