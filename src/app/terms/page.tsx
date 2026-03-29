import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-svh w-full flex-col pt-32">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-5 pb-32 md:px-8">
          <Link
            href="/"
            className="mb-12 font-body text-[11px] uppercase tracking-widest text-text-muted transition-colors hover:text-gold"
          >
            &larr; Back
          </Link>

          <h1 className="mb-6 font-display text-[clamp(40px,5vw,56px)] leading-none text-text-primary">
            Terms &amp; Conditions
          </h1>

          <p className="mb-12 font-body text-sm text-text-muted">
            Last updated: March 2026
          </p>

          <div className="space-y-12 border-l-2 border-border pl-6">
            <section>
              <h2 className="mb-4 font-body text-[13px] uppercase tracking-wider text-gold">
                1. Acceptance of Terms
              </h2>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                By accessing and using Lambai's website, tools, and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-body text-[13px] uppercase tracking-wider text-gold">
                2. Medical Disclaimer
              </h2>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                The content provided by Lambai, including the genetic ceiling calculator and any associated health, fitness, or nutritional information, is for educational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any medical condition or before starting any new health protocol for your child.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-body text-[13px] uppercase tracking-wider text-gold">
                3. Accuracy of Information
              </h2>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                The Tanner mid-parental height formula provides an estimate based on established paediatric science. However, individual results vary widely due to environmental, epigenetic, and situational factors. We make no guarantees regarding actual height attainment.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-body text-[13px] uppercase tracking-wider text-gold">
                4. User Access
              </h2>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                Access to the Lambai platform waitlist and pre-launch features is provided on an AS-IS basis without warranties of any kind.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
