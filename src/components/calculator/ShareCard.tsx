'use client'

import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

interface ShareCardProps {
  heightText: string
  gapText?: string
}

export function ShareCard({ heightText, gapText }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const downloadCard = async () => {
    if (!cardRef.current) return
    setIsGenerating(true)

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#FDFAF6',
      })

      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'lambai-height-potential.png'
      link.click()
    } catch (err) {
      console.error('Error generating image', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://lambai.in/calculator?utm_source=share_card')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="overflow-hidden rounded-xl border border-border shadow-lg">
        <div
          ref={cardRef}
          className="flex h-[450px] w-[320px] flex-col items-center justify-center p-8 text-center"
          style={{ backgroundColor: '#FDFAF6' }}
        >
          <span className="mb-8 font-display text-lg tracking-[0.2em]" style={{ color: '#B5AA9C' }}>
            LAMBAI
          </span>

          {gapText && (
            <>
              <span className="mb-2 font-body text-[10px] uppercase tracking-widest" style={{ color: '#C4614A' }}>
                Inches left on the table
              </span>
              <span className="mb-8 font-display text-5xl" style={{ color: '#C4614A' }}>
                {gapText}
              </span>
              <div className="mb-6 h-px w-16" style={{ backgroundColor: '#E8E0D6' }} />
            </>
          )}
          
          <span className="mb-2 font-body text-[10px] uppercase tracking-widest" style={{ color: '#7A7062' }}>
            With Lambai protocol
          </span>
          <span className="mb-8 font-display text-5xl" style={{ color: '#C47D4E' }}>
            {heightText}
          </span>

          <span className="mt-auto font-body text-[10px]" style={{ color: '#B5AA9C' }}>
            Calculate yours at lambai.in
          </span>
        </div>
      </div>

      <div className="flex w-full space-x-4">
        <button
          onClick={downloadCard}
          disabled={isGenerating}
          className="flex-1 rounded-full bg-gold py-3 font-body text-xs uppercase tracking-widest text-void shadow-md transition-all hover:shadow-lg hover:opacity-90 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Download Image'}
        </button>
        <button
          onClick={copyLink}
          className="flex-1 rounded-full border border-border py-3 font-body text-xs uppercase tracking-widest transition-all hover:border-gold hover:text-gold hover:shadow-sm"
          style={{ color: copied ? 'var(--color-success)' : 'var(--color-text-muted)' }}
        >
          {copied ? '✓ Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}
