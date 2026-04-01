'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { calculateFullResult, feetInchesToCm, LifestyleInputs, CalculatorResult } from '@/lib/calculator'
import { ShareCard } from '@/components/calculator/ShareCard'
import { fadeUp, maskReveal, scaleIn } from '@/lib/animations'
import { MagneticButton } from '@/components/ui/MagneticButton'

type Step = 'tier1' | 'tier2' | 'result'

const inputClass = "w-full rounded-xl border border-border bg-white/60 p-3 md:p-4 font-body text-base md:text-lg text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:shadow-sm transition-all"

interface OptionCardProps {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
}

function OptionCard({ label, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-200 ${selected
        ? 'border-gold bg-gold/10 shadow-md'
        : 'border-border bg-white/40 hover:border-gold/50 hover:bg-white/60'
        }`}
    >
      <span className={`font-body text-sm font-medium ${selected ? 'text-text-primary' : 'text-text-secondary'}`}>
        {label}
      </span>
      {description && (
        <span className="mt-1 font-body text-[11px] text-text-muted">{description}</span>
      )}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-3 h-4 w-4 rounded-full bg-gold"
        >
          <svg className="h-full w-full text-void" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </button>
  )
}

const LIFESTYLE_OPTIONS = {
  sleep: {
    poor: { label: '< 7 hours', description: 'Growth hormone suppressed' },
    moderate: { label: '7–8 hours', description: 'Not enough deep sleep' },
    optimal: { label: '8–10 hours', description: 'Optimal GH release' }
  },
  activity: {
    sedentary: { label: 'Sedentary', description: 'No growth stimulation' },
    '30min': { label: '30 min daily', description: 'Minimal activity' },
    '1hr': { label: '1 hour', description: 'Good movement' },
    '2hr+': { label: '2+ hours outdoor', description: 'Best for growth plates' }
  },
  protein: {
    rarely: { label: 'Rarely', description: 'Insufficient building blocks' },
    sometimes: { label: 'Sometimes', description: 'Not consistent enough' },
    daily: { label: 'Daily', description: 'Adequate protein' },
    multiple: { label: 'Multiple times/day', description: 'Optimal for growth' }
  },
  screenTime: {
    always: { label: 'Always before bed', description: 'Melatonin blocked' },
    most: { label: 'Most nights', description: 'Partial disruption' },
    rarely: { label: 'Rarely', description: 'Minimal impact' },
    never: { label: 'Never', description: 'Sleep hygiene optimal' }
  },
  sunExposure: {
    minimal: { label: 'Minimal (indoors)', description: 'Vitamin D deficient' },
    moderate: { label: 'Moderate', description: 'Some vitamin D' },
    daily: { label: 'Daily outdoor play', description: 'Optimal vitamin D' }
  },
  calcium: {
    rarely: { label: 'Rarely', description: 'Calcium deficient' },
    once: { label: '1× daily', description: 'Barely sufficient' },
    'twice+': { label: '2+ times daily', description: 'Optimal calcium intake' }
  }
}

export function CalculatorClient() {
  const [step, setStep] = useState<Step>('tier1')
  const [unit, setUnit] = useState<'ft' | 'cm'>('ft')

  const [fatherFt, setFatherFt] = useState('5')
  const [fatherIn, setFatherIn] = useState('10')
  const [fatherCm, setFatherCm] = useState('178')

  const [motherFt, setMotherFt] = useState('5')
  const [motherIn, setMotherIn] = useState('3')
  const [motherCm, setMotherCm] = useState('160')

  const [childAgeYears, setChildAgeYears] = useState('10')
  const [childAgeMonths, setChildAgeMonths] = useState('0')

  const [childFt, setChildFt] = useState('4')
  const [childIn, setChildIn] = useState('3')
  const [childCm, setChildCm] = useState('130')

  const [lifestyle, setLifestyle] = useState<LifestyleInputs>({
    sleep: 'moderate',
    activity: '30min',
    protein: 'daily',
    screenTime: 'most',
    sunExposure: 'moderate',
    calcium: 'once'
  })

  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [showShare, setShowShare] = useState(false)

  const handleLifestyleChange = (key: keyof LifestyleInputs, value: LifestyleInputs[keyof LifestyleInputs]) => {
    setLifestyle(prev => ({ ...prev, [key]: value }))
  }

  const calculate = () => {
    let fCm = 0
    let mCm = 0
    let cCm = 0

    if (unit === 'ft') {
      fCm = feetInchesToCm(parseInt(fatherFt) || 0, parseInt(fatherIn) || 0)
      mCm = feetInchesToCm(parseInt(motherFt) || 0, parseInt(motherIn) || 0)
      cCm = feetInchesToCm(parseInt(childFt) || 0, parseInt(childIn) || 0)
    } else {
      fCm = parseInt(fatherCm) || 0
      mCm = parseInt(motherCm) || 0
      cCm = parseInt(childCm) || 0
    }

    const ageYears = parseInt(childAgeYears) || 10
    const ageMonths = parseInt(childAgeMonths) || 0

    if (fCm > 0 && mCm > 0 && cCm > 0) {
      const res = calculateFullResult(fCm, mCm, ageYears, ageMonths, cCm, lifestyle)
      setResult(res)
      setStep('result')
      setShowShare(false)
    }
  }

  const years = Array.from({ length: 16 }, (_, i) => i + 2)
  const months = Array.from({ length: 12 }, (_, i) => i)

  return (
    <>
      <Navbar />
      <main className="flex w-full grow flex-col pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 font-display text-[clamp(36px,5vw,56px)] leading-none text-text-primary">
              <span className="block">Discover his</span>
              <span className="block text-gold">full growth potential</span>
            </h1>
            <p className="mx-auto max-w-lg font-body text-base text-text-secondary">
              Most Indian boys never reach their genetic height. See how much your son is leaving on the table.
            </p>
          </motion.div>

          {/* Progress indicator */}
          <div className="mb-8 md:mb-12 flex justify-center">
            <div className="flex items-center gap-1.5 md:gap-2">
              {['tier1', 'tier2', 'result'].map((s, i) => (
                <React.Fragment key={s}>
                  <div
                    className={`flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full font-body text-[10px] md:text-xs font-medium transition-all ${step === s
                      ? 'bg-gold text-void'
                      : ['tier1', 'tier2', 'result'].indexOf(step) > i
                        ? 'bg-gold/20 text-gold'
                        : 'border border-border bg-white/40 text-text-muted'
                      }`}
                  >
                    {['tier1', 'tier2', 'result'].indexOf(step) > i ? '✓' : i + 1}
                  </div>
                  {i < 2 && (
                    <div className={`h-px w-6 md:w-8 ${['tier1', 'tier2', 'result'].indexOf(step) > i ? 'bg-gold' : 'bg-border'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Tier 1: Genetic Inputs */}
            {step === 'tier1' && (
              <motion.div
                key="tier1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mx-auto max-w-2xl"
              >
                <div className="mb-8 text-center">
                  <span className="mb-2 block font-body text-[11px] uppercase tracking-widest text-gold">
                    Step 1 of 2
                  </span>
                  <h2 className="font-display text-2xl text-text-primary">Genetic Foundation</h2>
                  <p className="mt-2 font-body text-sm text-text-secondary">
                    These inputs determine his maximum potential.
                  </p>
                </div>

                <div className="mb-8 flex justify-end">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setUnit('ft')}
                      className={`rounded-full border px-3 py-1 font-body text-[11px] uppercase tracking-wider transition-all ${unit === 'ft'
                        ? 'border-gold bg-gold text-void shadow-sm'
                        : 'border-border text-text-muted hover:border-gold hover:text-gold'
                        }`}
                    >
                      ft / in
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('cm')}
                      className={`rounded-full border px-3 py-1 font-body text-[11px] uppercase tracking-wider transition-all ${unit === 'cm'
                        ? 'border-gold bg-gold text-void shadow-sm'
                        : 'border-border text-text-muted hover:border-gold hover:text-gold'
                        }`}
                    >
                      cm
                    </button>
                  </div>
                </div>

                <div className="space-y-5 md:space-y-6">
                  {/* Father's height */}
                  <div className="flex flex-col">
                    <label className="mb-3 font-body text-[11px] uppercase tracking-widest text-text-muted">
                      Father&apos;s Height
                    </label>
                    {unit === 'ft' ? (
                      <div className="flex space-x-4">
                        <div className="relative flex-1">
                          <input
                            type="number" min="3" max="7"
                            value={fatherFt} onChange={e => setFatherFt(e.target.value)}
                            className={inputClass}
                            placeholder="5"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">ft</span>
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="number" min="0" max="11"
                            value={fatherIn} onChange={e => setFatherIn(e.target.value)}
                            className={inputClass}
                            placeholder="10"
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
                          placeholder="178"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">cm</span>
                      </div>
                    )}
                  </div>

                  {/* Mother's height */}
                  <div className="flex flex-col">
                    <label className="mb-3 font-body text-[11px] uppercase tracking-widest text-text-muted">
                      Mother&apos;s Height
                    </label>
                    {unit === 'ft' ? (
                      <div className="flex space-x-4">
                        <div className="relative flex-1">
                          <input
                            type="number" min="3" max="7"
                            value={motherFt} onChange={e => setMotherFt(e.target.value)}
                            className={inputClass}
                            placeholder="5"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">ft</span>
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="number" min="0" max="11"
                            value={motherIn} onChange={e => setMotherIn(e.target.value)}
                            className={inputClass}
                            placeholder="3"
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
                          placeholder="160"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">cm</span>
                      </div>
                    )}
                  </div>

                  {/* Child's age */}
                  <div className="flex flex-col">
                    <label className="mb-3 font-body text-[11px] uppercase tracking-widest text-text-muted">
                      Child&apos;s Current Age
                    </label>
                    <div className="flex space-x-4">
                      <div className="relative flex-1">
                        <select
                          value={childAgeYears}
                          onChange={e => setChildAgeYears(e.target.value)}
                          className={inputClass}
                        >
                          {years.map(y => (
                            <option key={y} value={y}>{y} years</option>
                          ))}
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <select
                          value={childAgeMonths}
                          onChange={e => setChildAgeMonths(e.target.value)}
                          className={inputClass}
                        >
                          {months.map(m => (
                            <option key={m} value={m}>{m} months</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="mt-2 font-body text-[11px] text-text-muted">
                      Growth velocity is highly age-dependent. This determines remaining growth window.
                    </p>
                  </div>

                  {/* Child's current height */}
                  <div className="flex flex-col">
                    <label className="mb-3 font-body text-[11px] uppercase tracking-widest text-text-muted">
                      Child&apos;s Current Height
                    </label>
                    {unit === 'ft' ? (
                      <div className="flex space-x-4">
                        <div className="relative flex-1">
                          <input
                            type="number" min="2" max="7"
                            value={childFt} onChange={e => setChildFt(e.target.value)}
                            className={inputClass}
                            placeholder="4"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">ft</span>
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="number" min="0" max="11"
                            value={childIn} onChange={e => setChildIn(e.target.value)}
                            className={inputClass}
                            placeholder="3"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">in</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full sm:w-1/2">
                        <input
                          type="number" min="50" max="200"
                          value={childCm} onChange={e => setChildCm(e.target.value)}
                          className={inputClass}
                          placeholder="130"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-text-muted">cm</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex justify-center">
                  <MagneticButton
                    type="button"
                    onClick={() => setStep('tier2')}
                    className="min-w-[200px]"
                    data-cursor-label="next"
                  >
                    Continue to Lifestyle →
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {/* Tier 2: Lifestyle Inputs */}
            {step === 'tier2' && (
              <motion.div
                key="tier2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mx-auto max-w-3xl"
              >
                <div className="mb-8 text-center">
                  <span className="mb-2 block font-body text-[11px] uppercase tracking-widest text-gold">
                    Step 2 of 2
                  </span>
                  <h2 className="font-display text-2xl text-text-primary">Daily Habits</h2>
                  <p className="mt-2 font-body text-sm text-text-secondary">
                    These determine how much of his genetic potential he's actually unlocking.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Sleep */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="font-body text-sm font-medium text-text-primary">Daily sleep hours</h3>
                      <span className="text-gold">*</span>
                    </div>
                    <p className="mb-4 font-body text-[11px] text-text-muted">
                      Growth hormone releases in deep sleep between 10pm–2am
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['poor', 'moderate', 'optimal'] as const).map(opt => (
                        <OptionCard
                          key={opt}
                          label={LIFESTYLE_OPTIONS.sleep[opt].label}
                          description={LIFESTYLE_OPTIONS.sleep[opt].description}
                          selected={lifestyle.sleep === opt}
                          onClick={() => handleLifestyleChange('sleep', opt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Physical Activity */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="font-body text-sm font-medium text-text-primary">Physical activity</h3>
                      <span className="text-gold">*</span>
                    </div>
                    <p className="mb-4 font-body text-[11px] text-text-muted">
                      Weight-bearing activity stimulates growth plates
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {(['sedentary', '30min', '1hr', '2hr+'] as const).map(opt => (
                        <OptionCard
                          key={opt}
                          label={LIFESTYLE_OPTIONS.activity[opt].label}
                          description={LIFESTYLE_OPTIONS.activity[opt].description}
                          selected={lifestyle.activity === opt}
                          onClick={() => handleLifestyleChange('activity', opt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Protein */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="font-body text-sm font-medium text-text-primary">Protein in diet</h3>
                      <span className="text-gold">*</span>
                    </div>
                    <p className="mb-4 font-body text-[11px] text-text-muted">
                      Protein is the raw material for bone and tissue
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {(['rarely', 'sometimes', 'daily', 'multiple'] as const).map(opt => (
                        <OptionCard
                          key={opt}
                          label={LIFESTYLE_OPTIONS.protein[opt].label}
                          description={LIFESTYLE_OPTIONS.protein[opt].description}
                          selected={lifestyle.protein === opt}
                          onClick={() => handleLifestyleChange('protein', opt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Screen Time */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="font-body text-sm font-medium text-text-primary">Screen time before bed</h3>
                      <span className="text-gold">*</span>
                    </div>
                    <p className="mb-4 font-body text-[11px] text-text-muted">
                      Suppresses melatonin → disrupts GH pulse
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {(['always', 'most', 'rarely', 'never'] as const).map(opt => (
                        <OptionCard
                          key={opt}
                          label={LIFESTYLE_OPTIONS.screenTime[opt].label}
                          description={LIFESTYLE_OPTIONS.screenTime[opt].description}
                          selected={lifestyle.screenTime === opt}
                          onClick={() => handleLifestyleChange('screenTime', opt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sun Exposure */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="font-body text-sm font-medium text-text-primary">Sun exposure</h3>
                      <span className="text-gold">*</span>
                    </div>
                    <p className="mb-4 font-body text-[11px] text-text-muted">
                      Vitamin D is the transport mechanism for calcium
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['minimal', 'moderate', 'daily'] as const).map(opt => (
                        <OptionCard
                          key={opt}
                          label={LIFESTYLE_OPTIONS.sunExposure[opt].label}
                          description={LIFESTYLE_OPTIONS.sunExposure[opt].description}
                          selected={lifestyle.sunExposure === opt}
                          onClick={() => handleLifestyleChange('sunExposure', opt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Calcium */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="font-body text-sm font-medium text-text-primary">Calcium-rich foods</h3>
                      <span className="text-gold">*</span>
                    </div>
                    <p className="mb-4 font-body text-[11px] text-text-muted">
                      Roti alone won't build bones
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['rarely', 'once', 'twice+'] as const).map(opt => (
                        <OptionCard
                          key={opt}
                          label={LIFESTYLE_OPTIONS.calcium[opt].label}
                          description={LIFESTYLE_OPTIONS.calcium[opt].description}
                          selected={lifestyle.calcium === opt}
                          onClick={() => handleLifestyleChange('calcium', opt)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() => setStep('tier1')}
                    className="font-body text-sm text-text-muted hover:text-gold"
                  >
                    ← Back
                  </button>
                  <MagneticButton
                    type="button"
                    onClick={calculate}
                    className="min-w-[200px]"
                    data-cursor-label="calculate"
                  >
                    Reveal Potential →
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {step === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-4xl"
              >
                <div className="mb-10 text-center">
                  <span className="mb-2 block font-body text-[11px] uppercase tracking-widest text-gold">
                    His Growth Analysis
                  </span>
                  <h2 className="font-display text-2xl text-text-primary">Here&apos;s What We Found</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                  {/* Genetic Ceiling */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col rounded-2xl border border-gold/30 bg-linear-to-b from-gold/5 to-transparent p-6 md:p-6 text-center"
                  >
                    <span className="mb-2 font-body text-[10px] uppercase tracking-widest text-text-muted">
                      Genetic Ceiling
                    </span>
                    <span className="font-display text-[10px] uppercase tracking-widest text-gold/80">
                      Maximum he could reach
                    </span>
                    <motion.span
                      variants={fadeUp}
                      className="my-4 font-display text-[clamp(48px,8vw,72px)] leading-none text-gold"
                    >
                      {result.geneticCeiling.feetInches}
                    </motion.span>
                    <span className="font-body text-xs text-text-muted">
                      {result.geneticCeiling.rangeText}
                    </span>
                  </motion.div>

                  {/* Current Trajectory */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className="flex flex-col rounded-2xl border border-border bg-surface p-6 text-center"
                  >
                    <span className="mb-2 font-body text-[10px] uppercase tracking-widest text-text-muted">
                      Current Trajectory
                    </span>
                    <span className="font-display text-[10px] uppercase tracking-widest text-text-secondary/70">
                      Where he&apos;s headed now
                    </span>
                    <motion.span
                      variants={fadeUp}
                      className="my-4 font-display text-[clamp(48px,8vw,72px)] leading-none text-text-primary/60"
                    >
                      {result.currentTrajectory.feetInches}
                    </motion.span>
                    <span className="font-body text-xs text-text-muted">
                      {result.currentTrajectory.percentOfAdult}% of adult height
                    </span>
                  </motion.div>

                  {/* Gap */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="flex flex-col rounded-2xl border-2 border-error/30 bg-error/5 p-6 text-center"
                  >
                    <span className="mb-2 font-body text-[10px] uppercase tracking-widest text-error">
                      The Gap
                    </span>
                    <span className="font-display text-[10px] uppercase tracking-widest text-error/80">
                      Inches left on the table
                    </span>
                    <motion.span
                      variants={fadeUp}
                      className="my-4 font-display text-[clamp(48px,8vw,72px)] leading-none text-error"
                    >
                      {result.gap.feetInches}
                    </motion.span>
                    <span className="font-body text-xs text-error/70">
                      {result.gap.cm.toFixed(1)} cm below potential
                    </span>
                  </motion.div>
                </div>

                {/* Celebrity Comparison */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  className="mt-6 md:mt-8 rounded-2xl border border-border bg-surface p-6 md:p-8"
                >
                  <div className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-6 md:text-left">
                    <div className="mb-4 shrink-0 md:mb-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-2xl">
                        🏏
                      </div>
                    </div>
                    <div>
                      <p className="font-body text-lg text-text-primary">
                        <span className="font-semibold text-gold">{result.celebrityComparison.name}</span> is {result.celebrityComparison.fatherHeight}. His son grew to {result.celebrityComparison.sonHeight}.
                      </p>
                      <p className="mt-2 font-body text-sm text-text-secondary">
                        {result.celebrityComparison.message}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Growth Window Countdown */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center"
                >
                  <span className="mb-2 block font-body text-[10px] uppercase tracking-widest text-text-muted">
                    Growth Window Remaining
                  </span>
                  <p className="font-display text-3xl text-text-primary">
                    {result.growthWindowRemaining.years} years, {result.growthWindowRemaining.months} months
                  </p>
                  <p className="mt-2 font-body text-xs text-text-muted">
                    After that, the growth window closes permanently.
                  </p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                  className="mt-6 rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-body text-xs text-text-muted">
                      Potential Unlocked
                    </span>
                    <span className="font-body text-xs text-text-secondary">
                      <span className="text-text-primary font-semibold">{result.potentialUnlocked.current}%</span> current →{' '}
                      <span className="text-gold font-semibold">{result.potentialUnlocked.withLambai}%</span> with Lambai
                    </span>
                  </div>
                  <div className="relative h-3 md:h-4 w-full overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.potentialUnlocked.current}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="absolute left-0 top-0 h-full bg-text-primary/40"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.potentialUnlocked.withLambai}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="absolute left-0 top-0 h-full bg-gold"
                    />
                  </div>
                  <div className="mt-3 flex justify-between font-body text-[10px] text-text-muted">
                    <span>Current</span>
                    <span>With Lambai Protocol</span>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex flex-col items-center gap-4"
                >
                  <Link
                    href="/#waitlist"
                    className="w-full max-w-md rounded-full bg-gold py-4 md:py-5 text-center font-body text-[11px] uppercase tracking-[0.15em] text-void shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
                  >
                    Start the Protocol — Free for 14 Days
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setStep('tier1')
                      setResult(null)
                    }}
                    className="font-body text-sm text-text-muted hover:text-gold"
                  >
                    ← Recalculate
                  </button>
                </motion.div>

                {/* Share */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.7 }}
                  className="mt-8 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => setShowShare(!showShare)}
                    className="rounded-full border border-border px-6 py-3 font-body text-[11px] uppercase tracking-[0.15em] text-text-muted transition-all hover:border-gold hover:text-gold"
                  >
                    {showShare ? 'Hide' : 'Share'} Result
                  </button>
                </motion.div>

                <AnimatePresence>
                  {showShare && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-6"
                    >
                      <ShareCard
                        heightText={`${result.optimisedPotential.feetInches} (with Lambai)`}
                        gapText={result.gap.feetInches}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  )
}
