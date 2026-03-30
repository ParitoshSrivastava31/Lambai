'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WaitlistForm } from '@/components/landing/WaitlistForm'
import { maskReveal, fadeUp } from '@/lib/animations'
import Image from 'next/image'

export function Hero() {
  return (
    <section
      id="waitlist"
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-8 py-20"
      style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 110%, var(--color-gold-glow) 0%, transparent 70%), var(--color-void)'
      }}
    >
      <div className="z-10 flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-20 lg:mt-0">

        {/* Left Content */}
        <div className="flex w-full lg:w-1/2 flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            variants={maskReveal}
            initial="hidden"
            animate="visible"
            className="mb-6 md:mb-8 flex items-center overflow-hidden justify-center lg:justify-start"
          >
            <span className="mr-3 h-px w-6 md:w-8 bg-gold hidden lg:block" />
            <span className="font-body text-[10px] md:text-[11px] uppercase tracking-widest text-gold text-center lg:text-left">
              Rich Indian families figured this out decades ago.
            </span>
            <span className="ml-3 h-px w-6 md:w-8 bg-gold lg:hidden" />
            <span className="mr-3 h-px w-6 md:w-8 bg-gold lg:hidden" />
          </motion.div>

          <h1 className="mb-6 flex flex-col items-center lg:items-start justify-center font-display text-[clamp(48px,8vw,120px)] font-light leading-[0.9] text-text-primary">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <span className="block">Every inch</span>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }}>
              <span className="block italic text-gold">belongs to him.</span>
            </motion.div>
          </h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="mb-8 md:mb-12 max-w-xl font-body text-base md:text-lg text-text-secondary sm:text-xl lg:pr-12"
          >
            India's first science-backed height optimisation system for boys aged 2–17.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="w-full max-w-sm shrink-0"
          >
            <WaitlistForm />
          </motion.div>
        </div>

        {/* Right Phone Mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end perspective-[1000px]"
        >
          <div className="relative w-full max-w-[400px] aspect-9/16 transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 transition-transform duration-700 ease-out">
            <Image
              src="/images/phone_mockup.png"
              alt="Lambai App Mockup"
              fill
              priority
              className="object-contain drop-shadow-2xl filter"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 lg:bottom-12 flex flex-col items-center"
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
