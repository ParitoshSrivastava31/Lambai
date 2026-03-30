'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { fadeUp, maskReveal } from '@/lib/animations'

export function TheEnemy() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-8 text-center bg-void">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-surface opacity-[0.2]" />

      <div className="relative z-10 flex w-full flex-col items-center">
        <motion.span
          variants={maskReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mb-8 font-body text-[11px] uppercase tracking-widest text-error"
        >
          The False Promise
        </motion.span>

        <AnimatedText
          text="32 grams of sugar."
          as="h2"
          splitBy="word"
          className="font-display text-[clamp(40px,6vw,72px)] leading-tight text-text-primary mb-2"
          delay={0.1}
        />
        <AnimatedText
          text="Per 100 grams."
          as="h3"
          splitBy="word"
          className="font-display text-[clamp(32px,4vw,56px)] italic leading-tight text-text-secondary mb-12"
          delay={0.3}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="max-w-3xl space-y-6 text-center"
        >
          <p className="font-body text-base text-text-secondary md:text-lg">
            "Health drinks" like Horlicks, Bournvita, and Complan are not growth products. They are flavoured sugar powders designed to make children drink more milk. In 2024, the Indian government formally stripped their ability to be sold as "health drinks."
          </p>
          <p className="font-body text-lg text-text-primary font-medium">
            You are spending ₹500 a month on sugar, getting no structured guidance, and watching the 2-17 age growth window close entirely.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex items-center gap-4 border border-border px-8 py-4 rounded-full bg-surface"
        >
          <span className="font-display text-gold italic text-xl">Lambai</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span className="font-body text-sm text-text-secondary uppercase tracking-wider">A Digital Optimization System. Not A Supplement.</span>
        </motion.div>

      </div>
    </section>
  )
}
