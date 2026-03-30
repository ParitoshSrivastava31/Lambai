'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function TheMission() {
  return (
    <section className="relative mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-8 text-center bg-void overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-gold-glow)_0%,transparent_60%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: '-20% 0px' }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="w-px h-16 bg-gradient-to-b from-transparent to-gold opacity-50 mx-auto"
        />

        <AnimatedText
           text="Our Mission"
           as="h2"
           splitBy="word"
           className="font-body text-[11px] uppercase tracking-widest text-gold mb-8"
           delay={0.1}
        />

        <AnimatedText
           text="In ten years, Lambai will be responsible for measurably increasing the average height of Indian boys by 2 to 4 centimetres per generation."
           as="h3"
           splitBy="word"
           className="font-display text-[clamp(28px,4vw,64px)] italic leading-tight text-text-primary mb-12"
           delay={0.3}
        />

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: '-20% 0px' }}
           transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
           className="w-px h-16 bg-gradient-to-b from-gold to-transparent opacity-50 mx-auto"
        />
      </div>
    </section>
  )
}
