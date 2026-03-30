'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { maskReveal, fadeUp } from '@/lib/animations'

export function TheProblem() {
  return (
    <section className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-8 md:py-32">
      <div className="mb-16 flex w-full flex-col items-center text-center">
        <motion.span 
          variants={maskReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mb-8 font-body text-[11px] uppercase tracking-widest text-gold"
        >
          The Silent Crisis
        </motion.span>
        
        <AnimatedText
          text="India is shrinking."
          as="h2"
          splitBy="word"
          className="mb-6 font-display text-[clamp(40px,6vw,72px)] leading-tight text-text-primary"
          delay={0.1}
        />
        
        <motion.p 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="max-w-2xl font-body text-base md:text-lg text-text-secondary"
        >
          Between 2006 and 2016, while the rest of the world grew taller, the average height of Indian men aged 15–25 declined. Unprecedented. Ignored. Until now.
        </motion.p>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* The Decline Card */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="flex flex-col items-center justify-center rounded-3xl border border-border bg-void px-8 py-16 text-center shadow-sm"
        >
          <span className="mb-4 font-display text-7xl text-error">
            -<NumberTicker value={1} delay={0.3} />.<NumberTicker value={1} delay={0.4} />cm
          </span>
          <h3 className="mb-2 font-display text-2xl text-text-primary">National Decline</h3>
          <p className="font-body text-sm text-text-muted">Average height lost between 2006 and 2016 due to environmental factors, nutrition gaps, and systemic neglect.</p>
        </motion.div>

        {/* The Potential Card */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          custom={1}
          className="flex flex-col items-center justify-center rounded-3xl border border-gold/30 bg-surface px-8 py-16 text-center shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gold-glow opacity-50" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="mb-4 font-display text-7xl text-success">
              +<NumberTicker value={8} delay={0.5} />cm
            </span>
            <h3 className="mb-2 font-display text-2xl text-text-primary">Untapped Potential</h3>
            <p className="font-body text-sm text-text-secondary">Expected growth gain for Indian boys aged 2-17 utilizing a structured, science-backed environmental system.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
