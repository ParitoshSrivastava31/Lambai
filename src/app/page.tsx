import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'
import { ScrollMarquee } from '@/components/landing/ScrollMarquee'
import { StatementSection } from '@/components/landing/StatementSection'
import { CalculatorCTA } from '@/components/landing/CalculatorCTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero />
        <ScrollMarquee />
        <StatementSection />

        {/* Calculator CTA Bridge Section */}
        <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center bg-void px-4 py-24 sm:px-8 md:py-32">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, var(--color-gold-glow) 0%, transparent 50%)'
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="mb-4 md:mb-6 font-body text-[11px] uppercase tracking-widest text-gold">
              Start in 30 seconds
            </span>
            <h2 className="mb-8 md:mb-12 font-display text-[clamp(36px,6vw,88px)] leading-[1.1] text-text-primary">
              What is your son&apos;s <br className="hidden sm:block" />
              <span className="italic">genetic ceiling?</span>
            </h2>

            <CalculatorCTA />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
