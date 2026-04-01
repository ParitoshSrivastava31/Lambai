'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
            ? "border-b border-white/20 bg-void/10 backdrop-blur-xl py-3 md:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-transparent py-4 md:py-6"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-8 lg:px-16">
          <div className="flex items-center">
            <Link
              href="/"
              data-cursor-label="home"
              className="transition-opacity hover:opacity-70 flex items-center gap-3"
            >
              <Image
                src="/images/logo.png"
                alt="Lambai Logo"
                width={120}
                height={120}
                className="h-10 w-auto object-contain md:h-12"
                priority
              />
              <span className={cn(
                "font-display text-lg uppercase tracking-[0.15em] mt-1 transition-colors duration-300",
                isScrolled ? "text-[#1B4332]" : "text-white"
              )}>
                Lambai
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6 md:space-x-8">
            <Link
              href="/calculator"
              data-cursor-label="view"
              className={cn(
                "font-body text-[10px] md:text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-text-primary",
                isScrolled ? "text-[#1B4332]" : "text-white"
              )}
            >
              Calculator
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
