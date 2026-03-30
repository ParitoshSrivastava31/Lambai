'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const { error } = await supabase.from('waitlist').insert([
        { email, source: 'landing' }
      ])

      if (error) {
        if (error.code === '23505') {
          setStatus('success')
        } else {
          throw error
        }
      } else {
        setStatus('success')
      }
    } catch (err: unknown) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-14 w-full items-center justify-center rounded-full border border-success bg-success/10 text-success"
          >
            <span className="font-body text-sm font-medium tracking-wide">
              ✓ You're in.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="relative flex flex-col items-center"
          >
            <div className={`relative flex h-14 w-full items-center overflow-hidden rounded-full border bg-transparent transition-colors ${
              status === 'error'
                ? 'border-error'
                : 'border-border focus-within:border-gold'
            }`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading'}
                className="h-full grow bg-transparent px-6 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="absolute right-1 mr-1 h-10 rounded-full bg-gold px-3 md:px-6 font-body text-[10px] md:text-[11px] font-medium uppercase tracking-widest text-void transition-all hover:bg-gold-dim focus:outline-none disabled:opacity-50 cursor-pointer whitespace-nowrap"
                data-cursor-label="join"
              >
                {status === 'loading' ? 'wait...' : 'Join'}
              </button>
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-7 left-0 w-full text-center font-body text-xs text-error"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
