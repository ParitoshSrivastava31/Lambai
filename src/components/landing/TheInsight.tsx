'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { maskReveal, fadeUp } from '@/lib/animations'

export function TheInsight() {
  return (
    <section className="mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-between px-4 py-20 md:flex-row md:items-center md:px-8 lg:px-16 lg:py-48">
      <div className="mb-12 flex w-full flex-col md:mb-0 md:w-1/2 md:pr-16">
        <span className="mb-8 md:mb-12 font-body text-[11px] uppercase tracking-widest text-gold text-center md:text-left">
          The Unfair Advantage
        </span>

        <div className="space-y-6 md:space-y-8 text-center md:text-left">
          <AnimatedText
            text={`Sachin Tendulkar is 5'5".`}
            as="p"
            splitBy="word"
            className="font-display text-[clamp(28px,3vw,48px)] leading-tight text-text-primary"
            delay={0.15}
          />
          <AnimatedText
            text={`His son stands at 6'1".`}
            as="p"
            splitBy="word"
            className="font-display text-[clamp(28px,3vw,48px)] leading-tight text-text-primary"
            delay={0.3}
          />
          <AnimatedText
            text="This is not luck. It is a system."
            as="p"
            splitBy="word"
            className="font-display text-[clamp(28px,3vw,48px)] leading-tight text-gold"
            delay={0.45}
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="max-w-md mt-6 font-body text-base text-text-secondary leading-relaxed"
          >
            The elite know that 20% to 40% of height is environmental. They deploy nutritionists, trainers, and sleep regimens while everyone else relies on sugar powders and hope.
          </motion.p>
        </div>
      </div>

      <div className="flex w-full flex-col space-y-6 md:w-1/2 md:pl-8">
        <motion.div
           variants={fadeUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: '-10% 0px' }}
           className="relative flex flex-col rounded-2xl bg-surface px-8 py-10 shadow-sm border border-border"
        >
          <div className="mb-4 text-[11px] font-body uppercase tracking-widest text-text-muted">
            The Default Route
          </div>
          <h4 className="mb-3 font-display text-2xl text-text-primary">Hope & Sugar</h4>
          <ul className="space-y-3 font-body text-sm text-text-secondary">
            <li className="flex items-center gap-3">
              <span className="text-error uppercase text-[10px] w-4 mt-0.5">X</span> 
              Sugary health drinks (32g sugar / 100g)
            </li>
            <li className="flex items-center gap-3">
              <span className="text-error uppercase text-[10px] w-4 mt-0.5">X</span> 
              Sedentary childhood with no structured load-bearing exercise
            </li>
            <li className="flex items-center gap-3">
              <span className="text-error uppercase text-[10px] w-4 mt-0.5">X</span> 
              Unstructured sleep cycles interrupting growth hormone release
            </li>
          </ul>
        </motion.div>

        <motion.div
           variants={fadeUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: '-10% 0px' }}
           custom={1}
           className="relative flex flex-col rounded-2xl bg-void px-8 py-10 shadow-md border border-gold/40 z-10 -ml-4 md:-ml-12 mt-4 md:-mt-8"
        >
          <div className="absolute inset-0 bg-gold-glow opacity-30 pointer-events-none rounded-2xl" />
          <div className="mb-4 text-[11px] font-body uppercase tracking-widest text-gold text-right">
            The Elite System
          </div>
          <h4 className="mb-3 font-display text-2xl text-text-primary text-right">Optimised Growth</h4>
          <ul className="space-y-3 font-body text-sm text-text-secondary text-right">
            <li className="flex justify-end items-center gap-3">
              Targeted micronutrient tracking (Zinc, Calcium, D3)
              <span className="text-success uppercase text-xs w-4 mt-0.5">✓</span> 
            </li>
            <li className="flex justify-end items-center gap-3">
              Specific load-bearing stretch protocols (Ages 6-17)
              <span className="text-success uppercase text-xs w-4 mt-0.5">✓</span> 
            </li>
            <li className="flex justify-end items-center gap-3">
              Optimized deep-sleep cycles (Peak HGH window)
              <span className="text-success uppercase text-xs w-4 mt-0.5">✓</span> 
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
