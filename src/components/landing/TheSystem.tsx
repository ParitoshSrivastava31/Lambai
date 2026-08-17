'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { fadeUp } from '@/lib/animations'

const nodes = [
  {
    id: 'n1', side: 'left', order: 0,
    num: '01', title: 'Indian Nutrition Matrix',
    body: 'Ragi, dal, amla — mapped to growth windows. Zero BS.',
    iconColor: '#fef9ec', iconStroke: '#C8930A',
    icon: <path d="M8 5v3l2 2" stroke="#C8930A" strokeWidth="1.2" strokeLinecap="round" />,
  },
  {
    id: 'n2', side: 'left', order: 1,
    num: '02', title: 'HGH Sleep Cycles',
    body: 'Deep sleep windows timed for peak hormone release.',
    iconColor: '#f0faf5', iconStroke: '#1D9E75',
    icon: null,
  },
  {
    id: 'n3', side: 'right', order: 0,
    num: '03', title: 'The Report Card',
    body: 'Luxury growth dossier. Month-over-month percentiles for your paediatrician.',
    iconColor: '#eef4fe', iconStroke: '#378ADD',
    icon: null,
  },
  {
    id: 'n4', side: 'right', order: 1,
    num: '04', title: 'Micro-Load Exercises',
    body: 'Growth-plate stretches calibrated to open windows.',
    iconColor: '#fef9ec', iconStroke: '#C8930A',
    icon: null,
  },
]

export function TheSystem() {
  const svgRef = useRef<SVGSVGElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const drawLines = () => {
    const svg = svgRef.current
    const stage = stageRef.current
    if (!svg || !stage || window.innerWidth < 640) { svg && (svg.innerHTML = ''); return }
    svg.innerHTML = ''
    const sr = stage.getBoundingClientRect()
    const phone = document.getElementById('lambai-phone')
    if (!phone) return
    const pr = phone.getBoundingClientRect()
    const px = pr.left - sr.left + pr.width / 2
    const py = pr.top - sr.top + pr.height / 2

    nodes.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const nr = el.getBoundingClientRect()
      const nx = nr.left - sr.left + nr.width / 2
      const ny = nr.top - sr.top + nr.height / 2
      const isLeft = nx < px
      const ex = isLeft ? nr.left - sr.left + nr.width : nr.left - sr.left
      const pex = isLeft ? pr.left - sr.left : pr.left - sr.left + pr.width
      const mx = (ex + pex) / 2
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', `M${ex},${ny} C${mx},${ny} ${mx},${py} ${pex},${py}`)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', 'rgba(0,0,0,0.1)')
      path.setAttribute('stroke-width', '1')
      path.setAttribute('stroke-dasharray', '3 4')
      svg.appendChild(path)
    })
  }

  useEffect(() => {
    const t = setTimeout(drawLines, 100)
    window.addEventListener('resize', drawLines)
    return () => { clearTimeout(t); window.removeEventListener('resize', drawLines) }
  }, [])

  return (
    <section className="relative w-full bg-[#FAFAF8] overflow-hidden px-4 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-5">
            One job. Done obsessively well.
          </motion.p>
          <AnimatedText text="Built for Indian mothers." as="h3" splitBy="word" delay={0.1}
            className="font-display text-[clamp(32px,5vw,64px)] leading-[1.05] text-text-primary" />
          <AnimatedText text="Not western developers." as="p" splitBy="word" delay={0.25}
            className="font-display text-[clamp(32px,5vw,64px)] leading-[1.05] text-text-secondary" />
        </div>

        {/* Orbital layout */}
        <div ref={stageRef} className="relative">
          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" />

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_260px_1fr] items-center gap-6 sm:gap-0">

            {/* Left nodes */}
            <div className="flex flex-row sm:flex-col gap-4 sm:gap-5 sm:pr-10 justify-center sm:items-end">
              {nodes.filter(n => n.side === 'left').map((node, i) => (
                <motion.div key={node.id} id={node.id} variants={fadeUp} initial="hidden"
                  whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-white border border-border rounded-[16px] p-4 max-w-[240px] relative group hover:border-gold/50 transition-colors duration-200">
                  <span className="absolute top-3 right-3 font-body text-[9px] tracking-widest text-text-muted">{node.num}</span>
                  <div className="w-7 h-7 rounded-lg mb-3 flex items-center justify-center" style={{ background: node.iconColor }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="5.5" stroke={node.iconStroke} strokeWidth="1.2" />
                    </svg>
                  </div>
                  <p className="font-body text-xs font-medium text-text-primary mb-1">{node.title}</p>
                  <p className="font-body text-[11px] text-text-secondary leading-relaxed">{node.body}</p>
                </motion.div>
              ))}
            </div>

            {/* Phone */}
            <motion.div id="lambai-phone" variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-12 rounded-full border border-dashed border-border/60" />
                <div className="w-[225px] h-[450px] rounded-[42px] border border-border bg-white overflow-hidden relative z-10 shadow-sm">
                  <div className="w-15 h-4.5 bg-surface rounded-b-xl mx-auto mt-0 mb-5" />
                  <div className="px-5">
                    <p className="font-body text-[12px] uppercase tracking-[0.15em] text-gold mb-2">Lambai</p>
                    <p className="font-display text-xl text-text-primary leading-tight mb-5">Arjun's Growth<br />Dashboard</p>
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                      {[['4.2cm', 'This year'], ['72nd', 'Percentile']].map(([v, k]) => (
                        <div key={k} className="bg-surface rounded-xl p-3">
                          <p className="font-display text-[18px] text-text-primary">{v}</p>
                          <p className="font-body text-[10px] uppercase tracking-wider text-text-muted">{k}</p>
                        </div>
                      ))}
                    </div>
                    {[['Nutrition', 88], ['Sleep', 74], ['Exercise', 61]].map(([label, val]) => (
                      <div key={label} className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="font-body text-[11px] text-text-muted">{label}</span>
                          <span className="font-body text-[11px] text-text-muted">{val}%</span>
                        </div>
                        <div className="h-[4.5px] bg-surface rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gold" style={{ width: `${val}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className="mt-5 flex items-center gap-2 bg-gold/5 border border-gold/20 rounded-full px-4 py-2.5">
                      <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      <span className="font-body text-[10px] text-gold uppercase tracking-wider">On track · +2.4cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right nodes */}
            <div className="flex flex-row sm:flex-col gap-4 sm:gap-5 sm:pl-10 justify-center sm:items-start">
              {nodes.filter(n => n.side === 'right').map((node, i) => (
                <motion.div key={node.id} id={node.id} variants={fadeUp} initial="hidden"
                  whileInView="visible" viewport={{ once: true }} custom={i + 2}
                  className="bg-white border border-border rounded-[16px] p-4 max-w-[240px] relative group hover:border-gold/50 transition-colors duration-200">
                  <span className="absolute top-3 right-3 font-body text-[9px] tracking-widest text-text-muted">{node.num}</span>
                  <div className="w-7 h-7 rounded-lg mb-3 flex items-center justify-center" style={{ background: node.iconColor }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="2" width="10" height="12" rx="2" stroke={node.iconStroke} strokeWidth="1.2" />
                    </svg>
                  </div>
                  <p className="font-body text-xs font-medium text-text-primary mb-1">{node.title}</p>
                  <p className="font-body text-[11px] text-text-secondary leading-relaxed">{node.body}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}