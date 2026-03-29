'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WaitlistForm } from '@/components/landing/WaitlistForm'
import { maskReveal, fadeUp } from '@/lib/animations'

export function Hero() {
  return (
    <section
      id="waitlist"
      className="relative flex h-svh min-h-[600px] w-full flex-col items-center justify-center overflow-hidden px-5 sm:px-8"
      style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 110%, var(--color-gold-glow) 0%, transparent 70%), var(--color-void)'
      }}
    >
      <div className="z-10 flex max-w-4xl flex-col items-center text-center">

        <motion.div
          variants={maskReveal}
          initial="hidden"
          animate="visible"
          className="mb-8 flex items-center overflow-hidden"
        >
          <span className="mr-3 h-px w-8 bg-gold" />
          <span className="font-body text-[11px] uppercase tracking-widest text-gold">
            Rich Indian families figured this out decades ago.
          </span>
        </motion.div>

        <h1 className="mb-8 flex flex-col items-center justify-center font-display text-[clamp(48px,10vw,140px)] font-light leading-[0.9] text-text-primary">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <span className="block">Every inch</span>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }}>
            <span className="block italic">belongs to him.</span>
          </motion.div>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
          className="mb-12 max-w-xl font-body text-lg text-text-secondary sm:text-xl"
        >
          India's first science-backed height optimisation system for boys aged 2–17.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className="w-full max-w-md shrink-0"
        >
          <WaitlistForm />
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.0 }}
        className="absolute bottom-12 flex flex-col items-center"
      >
        <div className="relative h-10 w-px overflow-hidden bg-gold/30">
          <motion.div
            animate={{ y: [0, 40] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
            className="absolute top-0 h-1/2 w-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  )
}
