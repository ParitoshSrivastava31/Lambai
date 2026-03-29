import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="mb-12 font-body text-sm text-text-muted">
            Last updated: March 2026
          </p>

          <div className="space-y-12 border-l-2 border-border pl-6">
            <section>
              <h2 className="mb-4 font-body text-[13px] uppercase tracking-wider text-gold">
                Information Collection
              </h2>
              <p className="mb-4 font-body text-[15px] leading-[1.7] text-text-secondary">
                We only collect information that you voluntarily provide to us. During this pre-launch phase, this is limited to your email address when joining the waitlist.
              </p>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                <strong>Important:</strong> Our genetic height calculator processes data entirely on your device (client-side). We do not transmit, log, or store any parental heights or calculation results on our servers.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-body text-[13px] uppercase tracking-wider text-gold">
                Use of Information
              </h2>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                The email address you provide will be used exclusively to notify you about Lambai product updates, early access opportunities, and launch details. We will not sell, rent, or lease your information to any third parties.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-body text-[13px] uppercase tracking-wider text-gold">
                Analytics
              </h2>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                We may use standard analytics tools to monitor aggregated web traffic and engagement patterns to improve our user experience. This data remains anonymous and is not linked directly to your personally identifiable information.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
