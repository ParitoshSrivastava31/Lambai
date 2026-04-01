'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { maskReveal, fadeUp } from '@/lib/animations'
import Image from 'next/image'
import Link from 'next/link'
import { WaitlistForm } from '@/components/landing/WaitlistForm'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[70svh] md:min-h-svh w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-section5.png"
          alt="Lambai Hero Background"
          fill
          priority
          className="object-cover object-[center_top]"
          sizes="100vw"
        />
        {/* Subtle overlay for better text readability if the sky gets too bright */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center sm:px-8 -mt-6 md:-mt-20">
        <motion.div
          variants={maskReveal}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center justify-center overflow-hidden"
        >
          <span className="font-body text-[11px] uppercase tracking-widest text-white/90 drop-shadow-sm">
            India&apos;s First Science-Backed System
          </span>
        </motion.div>

        <h1 className="mb-6 flex flex-col items-center justify-center font-display text-[clamp(40px,7vw,96px)] font-medium leading-[1.05] text-white drop-shadow-lg">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <span className="block">The Blueprint for</span>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }}>
            <span className="block">Maximum Height</span>
          </motion.div>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
          className="mb-10 max-w-2xl font-body text-base md:text-xl text-white/90 drop-shadow-md sm:text-lg"
        >
          Unlock your son&apos;s genetic potential with India&apos;s most advanced growth optimization system. Safe, effective, and built for boys.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4 mt-4"
        >
          {/* <Link
            href="/calculator"
            className="flex w-full shrink-0 sm:w-auto h-14 items-center justify-center rounded-full bg-white px-8 font-body text-[14px] font-medium tracking-wide text-text-primary transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-xl"
          >
            Try Calculator
          </Link> */}

          <div className="w-full flex justify-center mt-2">
            <WaitlistForm variant="glass" />
          </div>
        </motion.div>
      </div>

      {/* Smooth Rounded V-Shape Bottom Mask */}
      {/* <div className="absolute -bottom-px left-0 z-20 w-full overflow-hidden text-void leading-none">
        <svg
          className="w-full text-void h-[6vh] sm:h-[8vh] md:h-[10vh]"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,60 1440,0 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div> */}
      <div className="absolute -bottom-px left-0 z-20 w-full overflow-hidden text-void leading-none">
        <svg
          className="w-full text-void h-[6vh] sm:h-[8vh] md:h-[10vh]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,200 1440,0 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  )
}

