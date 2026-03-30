'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { fadeUp } from '@/lib/animations'
import Image from 'next/image'

export function TheSystem() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <section className="relative mx-auto flex w-full flex-col px-4 py-24 sm:px-8 md:py-48 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gold-glow blur-[100px] opacity-30 pointer-events-none" />

      <div className="z-10 mx-auto w-full max-w-7xl">
        <div className="mb-20 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="font-body text-[11px] uppercase tracking-widest text-gold mb-6"
          >
            One job. Done obsessively well.
          </motion.h2>

          <AnimatedText
             text="Built for Indian mothers."
             as="h3"
             splitBy="word"
             className="font-display text-[clamp(40px,6vw,88px)] leading-[1.1] text-text-primary"
             delay={0.1}
          />
          <AnimatedText
             text="Not western developers."
             as="p"
             splitBy="word"
             className="font-display text-[clamp(40px,6vw,88px)] italic leading-[1.1] text-text-secondary mt-2"
             delay={0.3}
          />
        </div>

        {/* System Features */}
        <div className="space-y-32 md:space-y-48">
          
          {/* Feature 1: Indian Food Database */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              style={{ y: y1 }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20% 0px' }}
              className="w-full md:w-5/12 max-w-md relative aspect-square rounded-[3rem] overflow-hidden border border-border/50 shadow-sm"
            >
              <Image 
                src="/images/nutrition_bowl_1774896171004.png" 
                alt="Indian Nutrition Database Mockup" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </motion.div>
            
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="w-full md:w-5/12 flex flex-col space-y-6"
            >
              <h4 className="font-display text-4xl text-text-primary">The Indian Nutrition Matrix</h4>
              <p className="font-body text-text-secondary leading-relaxed">
                Ragi, dal, methi, amla, paneer, and chaas—not kale and whey isolate. 
                Our database maps exactly how to maximize biological height potential using the exact meals cooked in an Indian kitchen. 
                Actionable. Zero friction. Zero BS.
              </p>
            </motion.div>
          </div>

          {/* Feature 2: Sleep & Exercise */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
             <motion.div 
              style={{ y: y2 }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20% 0px' }}
              className="w-full md:w-5/12 max-w-sm relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-border/50 bg-void flex items-center justify-center p-8 shadow-sm"
            >
              <div className="absolute inset-0 bg-gold-glow opacity-20" />
              <div className="text-center z-10 space-y-8">
                <div className="h-0.5 w-12 bg-gold mx-auto" />
                <h5 className="font-display text-5xl text-text-primary italic">Deep Growth Protocol</h5>
                <div className="h-0.5 w-12 bg-gold mx-auto" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="w-full md:w-5/12 flex flex-col space-y-6"
            >
              <h4 className="font-display text-4xl text-text-primary">Micro-Load & HGH Cycles</h4>
              <p className="font-body text-text-secondary leading-relaxed">
                Height optimization isn't just about food. It is about micro-load bearing exercises that stretch the body while the growth plates are open, combined with deep regenerative sleep windows to maximise Human Growth Hormone (HGH) release.
              </p>
            </motion.div>
          </div>

          {/* Feature 3: The Report Card */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              style={{ y: y1 }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20% 0px' }}
              className="w-full md:w-7/12 max-w-2xl relative aspect-[16/10] rounded-3xl md:rounded-[3rem] overflow-hidden border border-border/50 shadow-md"
            >
              <Image 
                src="/images/report_card_mockup_1774896154836.png" 
                alt="Growth Report Card System" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
            
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="w-full md:w-4/12 flex flex-col space-y-6"
            >
              <h4 className="font-display text-4xl text-text-primary">The Report Card</h4>
              <p className="font-body text-text-secondary leading-relaxed">
                The single most important document you will own. A luxury growth dossier showing month-over-month percentile increases, gap bridging, and actionable insights to show your paediatrician.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
