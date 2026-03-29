'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { calculateGeneticCeiling, feetInchesToCm } from '@/lib/calculator'
import { ShareCard } from '@/components/calculator/ShareCard'
import { maskReveal, fadeUp } from '@/lib/animations'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function CalculatorClient() {
  const [unit, setUnit] = useState<'ft' | 'cm'>('ft')
  const [fatherFt, setFatherFt] = useState('5')
  const [fatherIn, setFatherIn] = useState('10')
  const [fatherCm, setFatherCm] = useState('178')

  const [motherFt, setMotherFt] = useState('5')
  const [motherIn, setMotherIn] = useState('3')
  const [motherCm, setMotherCm] = useState('160')

  const [result, setResult] = useState<ReturnType<typeof calculateGeneticCeiling> | null>(null)
  const [showShare, setShowShare] = useState(false)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    let fCm = 0
    let mCm = 0

    if (unit === 'ft') {
      fCm = feetInchesToCm(parseInt(fatherFt) || 0, parseInt(fatherIn) || 0)
      mCm = feetInchesToCm(parseInt(motherFt) || 0, parseInt(motherIn) || 0)
    } else {
      fCm = parseInt(fatherCm) || 0
      mCm = parseInt(motherCm) || 0
    }

    if (fCm > 0 && mCm > 0) {
      setResult(calculateGeneticCeiling(fCm, mCm))
      setShowShare(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-border bg-white/60 p-4 font-body text-lg text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:shadow-sm transition-all"

  return (
    <>
      <Navbar />
      <main className="flex w-full grow flex-col pt-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 md:flex-row md:px-8 lg:px-16">

          {/* ── Left panel: Form ── */}
          <div className="flex w-full flex-col md:w-1/2 md:pr-12">
            <h1 className="mb-4 font-display text-[clamp(40px,5vw,72px)] leading-none text-text-primary">
              <span className="block">Calculate his</span>
              <span className="block italic text-gold">genetic ceiling.</span>
            </h1>
            <p className="mb-12 max-w-md font-body text-base text-text-secondary">
              Based on the Tanner mid-parental height formula, used globally by paediatricians.
            </p>

            <div className="mb-12 h-px w-full bg-border" />

            {/* Unit toggle */}
            <div className="mb-8 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setUnit('ft')}
                className={`rounded-full border px-3 py-1 font-body text-[11px] uppercase tracking-wider transition-all ${
                  unit === 'ft'
                    ? 'border-gold bg-gold text-void shadow-sm'
                    : 'border-border text-text-muted hover:border-gold hover:text-gold'
                }`}
              >
                ft / in
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`rounded-full border px-3 py-1 font-body text-[11px] uppercase tracking-wider transition-all ${
                  unit === 'cm'
                    ? 'border-gold bg-gold text-void shadow-sm'
                    : 'border-border text-text-muted hover:border-gold hover:text-gold'
                }`}
              >
                cm
              </button>
            </div>

            <form onSubmit={handleCalculate} className="flex flex-col space-y-8">
              {/* Father's height */}
              <div className="flex flex-col">
                <label className="mb-4 font-body text-[11px] uppercase tracking-widest text-text-muted">
                  Father&apos;s Height
                </label>
                {unit === 'ft' ? (
                  <div className="flex space-x-4">
                    <div className="relative flex-1">
                      <input
                        type="number" min="3" max="7"
                        value={fatherFt} onChange={e => setFatherFt(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">ft</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="number" min="0" max="11"
                        value={fatherIn} onChange={e => setFatherIn(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">in</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full sm:w-1/2">
                    <input
                      type="number" min="100" max="250"
                      value={fatherCm} onChange={e => setFatherCm(e.target.value)}
                      className={inputClass}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">cm</span>
                  </div>
                )}
              </div>

              {/* Mother's height */}
              <div className="flex flex-col">
                <label className="mb-4 font-body text-[11px] uppercase tracking-widest text-text-muted">
                  Mother&apos;s Height
                </label>
                {unit === 'ft' ? (
                  <div className="flex space-x-4">
                    <div className="relative flex-1">
                      <input
                        type="number" min="3" max="7"
                        value={motherFt} onChange={e => setMotherFt(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">ft</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="number" min="0" max="11"
                        value={motherIn} onChange={e => setMotherIn(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">in</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full sm:w-1/2">
                    <input
                      type="number" min="100" max="250"
                      value={motherCm} onChange={e => setMotherCm(e.target.value)}
                      className={inputClass}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">cm</span>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-col items-center pt-8">
                <MagneticButton type="submit" className="w-full min-w-[200px]" data-cursor-label="calculate">
                  Calculate &rarr;
                </MagneticButton>
                <p className="mt-4 text-center font-body text-[11px] text-text-muted">
                  We don&apos;t store any calculation data.
                </p>
              </div>
            </form>
          </div>

          {/* ── Right panel: Result ── */}
          <div className="mt-16 flex w-full flex-col md:mt-0 md:w-1/2 md:pl-12">
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-8 shadow-lg"
                >
                  <span className="mb-8 font-body text-[11px] uppercase tracking-widest text-text-muted">
                    His genetic ceiling
                  </span>

                  <div className="mb-6 flex flex-col items-center justify-center text-center">
                    <motion.span
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="mb-2 font-display text-[clamp(64px,8vw,120px)] leading-none text-gold"
                    >
                      {result.feetInches}
                    </motion.span>
                    <motion.span
                      variants={maskReveal}
                      initial="hidden"
                      animate="visible"
                      className="font-body text-sm text-text-secondary"
                    >
                      Likely range: {result.rangeText}
                    </motion.span>
                  </div>

                  <div className="my-8 h-px w-full bg-border" />

                  <div className="space-y-4 font-body text-sm text-text-secondary">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      This is what consistent nutrition, sleep, and exercise can protect.
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      Most Indian boys never reach it. Lambai gives them the system to.
                    </motion.div>
                  </div>

                  <div className="my-8 h-px w-full bg-border" />

                  <div className="mt-auto flex flex-col space-y-4">
                    <Link
                      href="/#waitlist"
                      className="w-full rounded-full bg-gold py-4 text-center font-body text-[11px] uppercase tracking-[0.15em] text-void shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                    >
                      Join Waitlist to Get Early Access
                    </Link>

                    <button
                      type="button"
                      onClick={() => setShowShare(!showShare)}
                      className="w-full rounded-full border border-border py-4 text-center font-body text-[11px] uppercase tracking-[0.15em] text-text-muted transition-all hover:border-gold hover:text-gold hover:shadow-sm"
                    >
                      {showShare ? 'Hide Share Card' : 'Share Result'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showShare && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-8"
                      >
                        <ShareCard heightText={result.feetInches} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {!result && (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-border bg-surface/50 shadow-sm">
                <p className="font-body text-[13px] text-text-muted">
                  Enter heights above to see the result.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
