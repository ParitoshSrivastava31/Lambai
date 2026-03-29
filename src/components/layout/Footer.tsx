import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-void py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-6 px-5 sm:flex-row sm:space-y-0 md:px-8 lg:px-16">
        <div className="text-center sm:text-left">
          <p className="font-body text-[11px] uppercase tracking-wider text-text-muted">
            &copy; {new Date().getFullYear()} Lambai. All rights reserved.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <span className="font-display text-lg tracking-[0.15em] text-text-muted opacity-50">
            LAMBAI
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/privacy"
            data-cursor-label="read"
            className="font-body text-[11px] uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            data-cursor-label="read"
            className="font-body text-[11px] uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
