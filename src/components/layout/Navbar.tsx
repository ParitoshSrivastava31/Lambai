'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80)
  })

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 z-100 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "border-b border-border bg-void/80 backdrop-blur-md py-3 md:py-4"
            : "bg-transparent py-4 md:py-6"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-8 lg:px-16">
          <div className="flex items-center">
            <Link
              href="/"
              data-cursor-label="home"
              className="font-display text-lg uppercase tracking-[0.15em] text-text-primary transition-opacity hover:opacity-70"
            >
              Lambai
            </Link>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/calculator"
              data-cursor-label="view"
              className="font-body text-[11px] uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-text-primary"
            >
              Calculator
            </Link>
            <Link
              href="/#waitlist"
              data-cursor-label="join"
              className="rounded-full border border-gold px-6 py-2 pb-2.5 font-body text-[11px] uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-void"
            >
              Join Waitlist &rarr;
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-90 flex flex-col items-center justify-center bg-void/95 pt-20 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center space-y-8">
              <Link
                href="/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-3xl text-text-primary transition-opacity hover:opacity-70"
              >
                Calculator
              </Link>
              <Link
                href="/#waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-3xl text-gold"
              >
                Join Waitlist
              </Link>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-5 top-6 text-text-secondary transition-colors hover:text-text-primary"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
