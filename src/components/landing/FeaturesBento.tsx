'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { fadeUp } from '@/lib/animations'

export function FeaturesBento() {
  return (
    <section className="relative w-full overflow-hidden px-4 md:px-8 py-24 md:py-32">
      {/* Background Image for the whole section */}
      <div 
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        style={{
          backgroundImage: "url('/images/feature.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Fallback gradient over the background to ensure readability if the image is too bright/dark */}
      <div className="absolute inset-0 z-0 bg-void/80 backdrop-blur-[2px]"></div>

      <div className="relative z-10 mx-auto max-w-6xl flex flex-col items-center">
        {/* Header */}
        <div className="mb-16 flex w-full flex-col items-center text-center">
          <AnimatedText
            text="Growth Optimization System"
            as="h2"
            splitBy="word"
            className="mb-4 font-display text-[clamp(32px,5vw,56px)] leading-tight text-text-primary"
            delay={0.1}
          />
          <motion.p 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="max-w-2xl font-body text-base md:text-lg text-text-secondary"
          >
            A comprehensive, science-backed approach to maximizing your child&apos;s genetic potential through intelligent systems.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid w-full grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Card 1: Precision Nutrition */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-4 relative flex flex-col justify-end overflow-hidden rounded-[24px] md:rounded-[32px] bg-white p-6 md:p-8 shadow-sm border border-border group"
          >
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/nutrition_bowl_1774896171004.png')" }}
            />
            <div className="absolute inset-0 z-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80" />
            <div className="relative z-10">
              <h3 className="mb-2 font-display text-2xl text-white">Precision Nutrition Planning</h3>
              <p className="font-body text-sm text-white/90">Tailored meal plans designed for optimal growth cycles.</p>
            </div>
          </motion.div>

          {/* Card 2: Interactive Progress */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="md:col-span-4 relative flex flex-col overflow-hidden rounded-[24px] md:rounded-[32px] bg-white/40 backdrop-blur-md p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
          >
            <h3 className="mb-2 font-display text-2xl text-text-primary">Interactive Progress Tracking</h3>
            <p className="font-body text-sm text-text-secondary mb-6 relative z-10">
              Real-time growth monitoring with intelligent AI-driven feedback loops.
            </p>
            {/* Mockup elements */}
            <div className="mt-auto relative z-10 flex flex-col gap-3">
              <div className="self-end bg-white/80 backdrop-blur-sm rounded-2xl rounded-tr-sm px-4 py-2 text-xs text-text-primary border border-border shadow-sm">
                Is my son&apos;s growth on track?
              </div>
              <div className="self-start flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">L</div>
                <div className="bg-emerald-50/90 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-2 text-xs text-emerald-800 border border-emerald-100 shadow-sm">
                  Yes! Optimized for +2.4cm gain.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Predictive Analysis (Tall) */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="md:col-span-4 md:row-span-2 relative items-start flex flex-col overflow-hidden rounded-[24px] md:rounded-[32px] bg-linear-to-br from-[#F8FAFC] to-[#EFF6FF] p-6 md:p-8 shadow-sm border border-blue-100 group"
          >
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-20 grayscale transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: "url('/images/clab_lm_Photograph_of_a_5-year-old_boy_measuring_himself_with_h_00b5c2e7-7f74-4512-8a97-59df72c2a85a.png')" }}
            />
            <h3 className="mb-2 font-display text-2xl text-blue-900 relative z-10">Predictive Height Analysis</h3>
            <p className="font-body text-sm text-blue-800/80 mb-8 relative z-10">
              Unlock genetic secrets with clinical-grade pattern recognition.
            </p>
            
            <div className="relative mt-auto mx-auto w-full flex-1 min-h-[220px] z-10 flex items-center justify-center">
               <div 
                 className="w-full h-full bg-cover bg-center rounded-2xl shadow-2xl border border-white/50 rotate-3 transition-transform duration-500 group-hover:rotate-0"
                 style={{ backgroundImage: "url('/images/report_card_mockup_1774896154836.png')" }}
               />
               <div className="absolute right-2 top-2 bg-emerald-500 rounded-full px-3 py-1 text-[10px] font-bold text-white shadow-lg flex items-center gap-1 z-20">
                 98th PERCENTILE
               </div>
            </div>
          </motion.div>

          {/* Card 4: 24/7 Expert Support (Wide) */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="md:col-span-8 relative flex flex-col sm:flex-row items-center justify-between overflow-hidden rounded-[24px] md:rounded-[32px] bg-white p-6 md:p-8 shadow-sm border border-border"
          >
            <div className="flex-1">
              <h3 className="mb-2 font-display text-2xl text-text-primary">24/7 Human-in-the-loop Support</h3>
              <p className="font-body text-sm text-text-secondary mb-6 max-w-sm">
                Real pediatric experts backing every AI recommendation, providing peace of mind around the clock.
              </p>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-surface flex items-center justify-center text-[10px] font-bold text-gold shadow-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="pl-4 text-[10px] text-text-muted flex items-center uppercase tracking-tighter self-center">
                  +12 Specialists online
                </div>
              </div>
            </div>
            
             <div className="mt-8 sm:mt-0 shrink-0 w-full sm:w-1/3 flex items-center justify-center">
                <div className="relative bg-void rounded-[20px] p-4 border border-border shadow-inner w-full max-w-[200px] aspect-square flex flex-col items-center justify-center gap-2">
                   <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                   </div>
                   <div className="h-2 w-20 bg-gold/20 rounded-full animate-pulse"></div>
                   <div className="h-2 w-16 bg-gold/10 rounded-full"></div>
                </div>
            </div>
          </motion.div>

          {/* Card 5: Auto Reminder */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            className="md:col-span-4 relative flex items-center justify-center flex-col overflow-hidden rounded-[24px] md:rounded-[32px] bg-gold/5 p-6 shadow-sm border border-gold/10"
          >
            <h3 className="mb-6 font-display text-xl text-text-primary text-center">Smart Growth Reminders</h3>
            
            <div className="relative w-24 h-24 flex items-center justify-center">
               <div className="absolute inset-0 bg-gold/10 rounded-full animate-ping opacity-20"></div>
               <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
                 <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-md text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                 </div>
               </div>
            </div>
            <p className="mt-4 font-body text-[10px] uppercase tracking-widest text-gold text-center">Never miss a cycle</p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
