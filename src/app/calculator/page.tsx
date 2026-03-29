import { Metadata } from 'next'
import { CalculatorClient } from '@/app/calculator/CalculatorClient'

export const metadata: Metadata = {
  title: 'Child Height Calculator India — Genetic Height Potential | Lambai',
  description: 'Free calculator: Find out how tall your son will be based on genetics. Uses the Tanner mid-parental height formula trusted by paediatricians worldwide.',
  openGraph: {
    title: 'How tall will your son grow? Calculate his genetic ceiling.',
    description: 'Free calculator based on the Tanner mid-parental height formula. Used by paediatricians worldwide.',
    url: 'https://lambai.in/calculator',
  }
}

export default function CalculatorPage() {
  const calculatorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Genetic Height Calculator for Indian Boys',
    description: 'Calculate your son\'s genetic height potential using the Tanner mid-parental height formula',
    medicalAudience: { '@type': 'Patient' },
    about: {
      '@type': 'MedicalCondition',
      name: 'Child growth optimization'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }}
      />
      <div className="flex w-full flex-col min-h-svh">
        <CalculatorClient />
      </div>
    </>
  )
}
