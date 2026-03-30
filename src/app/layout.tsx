import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne } from 'next/font/google'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { LenisProvider } from '@/components/layout/LenisProvider'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lambai',
  url: 'https://lambai.in',
  description: "India's first science-backed height optimisation app for boys aged 2–17",
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://lambai.in/calculator',
    'query-input': 'required name=search_term_string'
  }
}

export const metadata: Metadata = {
  title: 'Lambai — Every Inch Belongs to Him',
  description: "India's first science-backed height optimisation system for boys aged 2–17. Built with Indian food, Indian science, and Indian parents in mind.",
  keywords: ['child height increase', 'height growth for kids india', 'genetic height calculator', 'lambai app', 'bachon ki lambai', 'height calculator india'],
  openGraph: {
    title: 'Lambai — Every Inch Belongs to Him',
    description: "Calculate your son's genetic height potential. India's first height optimisation system.",
    url: 'https://lambai.in',
    siteName: 'Lambai',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lambai — Every Inch Belongs to Him',
    description: "Calculate your son's genetic height potential. India's first height optimisation system.",
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: { canonical: 'https://lambai.in' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-void text-text-primary" suppressHydrationWarning>
        <LenisProvider>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
