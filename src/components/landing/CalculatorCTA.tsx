'use client'

import { useRouter } from 'next/navigation'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function CalculatorCTA() {
  const router = useRouter()
  return (
    <MagneticButton onClick={() => router.push('/calculator')} data-cursor-label="calculate">
      Calculate Now &rarr;
    </MagneticButton>
  )
}
