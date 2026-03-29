'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { maskReveal } from '@/lib/animations'

export function StatementSection() {
  return (
    <section className="mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-between px-5 py-32 md:flex-row md:items-center md:px-8 lg:px-16 lg:py-48">
      <div className="mb-16 flex w-full flex-col md:mb-0 md:w-3/5 md:pr-16">
        <span className="mb-12 font-body text-[11px] uppercase tracking-widest text-gold">
          The Problem
        </span>

        <div className="space-y-8">
          <AnimatedText
            text={`Sachin Tendulkar stands at 5'4".`}
            as="p"
            splitBy="word"
            className="font-display text-[clamp(32px,4vw,56px)] leading-tight text-text-primary"
            delay={0.15}
          />
          <AnimatedText
            text={`His son Arjun is 6'1".`}
            as="p"
            splitBy="word"
            className="font-display text-[clamp(32px,4vw,56px)] leading-tight text-text-primary"
            delay={0.3}
          />
          <AnimatedText
            text="That is not luck. That is a system."
            as="p"
            splitBy="word"
            className="font-display text-[clamp(32px,4vw,56px)] leading-tight text-text-primary"
            delay={0.45}
          />
        </div>
      </div>

      <div className="flex w-full flex-col space-y-4 md:w-2/5 md:pl-8">
        {[
          { value: 40, suffix: '%', label1: 'of height is environment', label2: 'not genetics' },
          { value: 8, suffix: 'cm', label1: 'potential gained with', label2: 'the right system' },
          { value: 0, prefix: '₹', label1: 'cost to calculate your', label2: "son's genetic ceiling" }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={maskReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            custom={idx}
            className="flex flex-col rounded-xl border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="mb-4 font-display text-5xl text-gold">
              {stat.prefix}
              <NumberTicker value={stat.value} suffix={stat.suffix} delay={0.3} />
            </span>
            <span className="font-body text-[13px] text-text-secondary">
              {stat.label1}<br />{stat.label2}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
