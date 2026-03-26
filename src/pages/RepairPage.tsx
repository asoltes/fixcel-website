import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { repairCategories } from '../data/repairs'
import type { RepairCategory } from '../types'

// ── Icons ────────────────────────────────────────────────────────────────────

function CircuitIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2" />
      <path d="M5 5h2v2H5zM17 5h2v2h-2zM5 17h2v2H5zM17 17h2v2h-2z" />
    </svg>
  )
}

function WrenchIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function CodeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function SparkleIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M3 12h1M20 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}

const ICON_MAP = {
  circuit: CircuitIcon,
  wrench:  WrenchIcon,
  code:    CodeIcon,
  sparkle: SparkleIcon,
}

// ── Slideshow data ────────────────────────────────────────────────────────────

const slides = repairCategories.flatMap(cat =>
  cat.items.map(item => ({
    name:       item.name,
    priceRange: item.priceRange,
    turnaround: item.turnaround,
    category:   cat.title,
    gradient:   cat.gradient,
    iconType:   cat.iconType as keyof typeof ICON_MAP,
  }))
)

// ── Slideshow component ───────────────────────────────────────────────────────

function RepairSlideshow() {
  const [current,      setCurrent]      = useState(0)
  const [paused,       setPaused]       = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = slides.length
  const slide = slides[current]
  const Icon  = ICON_MAP[slide.iconType]

  const next = () => setCurrent(c => (c + 1) % total)
  const prev = () => setCurrent(c => (c - 1 + total) % total)

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 3000)
    return () => clearInterval(timer)
  }, [paused, total])

  // Track fullscreen state from browser events
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const enterFullscreen = async () => {
    await containerRef.current?.requestFullscreen()
    setPaused(false)
  }

  const exitFullscreen = () => document.exitFullscreen()

  // ── Fullscreen / TV-ad layout ─────────────────────────────────────────────
  if (isFullscreen) {
    return (
      <div
        ref={containerRef}
        className={`w-screen h-screen bg-gradient-to-br ${slide.gradient} flex flex-col relative overflow-hidden select-none`}
        style={{ transition: 'background 0.7s ease' }}
      >
        {/* Giant watermark icon */}
        <div className="absolute inset-0 flex items-center justify-end pr-24 pointer-events-none" aria-hidden="true">
          <Icon className="text-white/8" style={{ width: '55vh', height: '55vh', strokeWidth: 0.5 }} />
        </div>

        {/* Top bar — brand */}
        <div className="relative z-10 flex items-center justify-between px-16 pt-12">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
              strokeLinecap="round" strokeLinejoin="round"
              className="text-accent" style={{ width: '4rem', height: '4rem' }} aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            <span className="text-white font-black tracking-tight" style={{ fontSize: '3.5rem' }}>
              Fix<span className="text-accent">Cel</span>
            </span>
          </div>
          <span className="bg-white/20 backdrop-blur-sm text-white font-bold px-6 py-2 rounded-full uppercase tracking-widest"
                style={{ fontSize: '1.2rem' }}>
            {slide.category}
          </span>
        </div>

        {/* Centre — main content */}
        
        <div
          key={current}
          className="relative z-10 flex-1 flex flex-col justify-center px-16"
          style={{ animation: 'slideIn 0.5s ease-out' }}
        > <p className="text-white/50 font-semibold uppercase tracking-widest mb-2"
             style={{ fontSize: '0.9rem' }}>
            Prices are estimates and may vary depending on device model and parts availability. Final price confirmed after diagnostic.
          </p>
          <p className="text-white/60 font-semibold uppercase tracking-widest mb-4"
             style={{ fontSize: '1.3rem' }}>
            Service
          </p>
          <h2 className="text-white font-extrabold leading-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            {slide.name}
          </h2>
          <p className="font-black text-accent leading-none mb-6"
             style={{ fontSize: 'clamp(4rem, 9vw, 8rem)' }}>
            {slide.priceRange}
          </p>
          <p className="text-white/60 flex items-center gap-3" style={{ fontSize: '1.5rem' }}>
            <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.8rem', height: '1.8rem', flexShrink: 0 }} aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
            {slide.turnaround}
          </p>
        </div>

        {/* Bottom bar — contact + controls */}
        <div className="relative z-10 flex items-end justify-between px-16 pb-10 gap-8">
          {/* Contact info */}
          <div className="space-y-1">
            <p className="text-white/50 uppercase tracking-widest" style={{ fontSize: '0.9rem' }}>
              Free Diagnostic · Walk-ins Welcome
            </p>
            <p className="text-white font-bold" style={{ fontSize: '1.8rem' }}>
              📞 +63 995 160 790
            </p>
            <p className="text-white/50" style={{ fontSize: '1rem' }}>
              1312 Rizal Blvd, Sta Rosa, Laguna · Mon–Fri 8AM–5PM
            </p>
          </div>

          {/* Slide counter + arrows + exit */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-white/40 tabular-nums" style={{ fontSize: '1rem' }}>
              {current + 1} / {total}
            </span>
            <button onClick={prev} aria-label="Previous"
              className="text-white/50 hover:text-white transition-colors p-1 focus:outline-none">
              <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '2rem', height: '2rem' }}>
                <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={next} aria-label="Next"
              className="text-white/50 hover:text-white transition-colors p-1 focus:outline-none">
              <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '2rem', height: '2rem' }}>
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={exitFullscreen} aria-label="Exit fullscreen"
              className="text-white/40 hover:text-white/80 transition-colors p-1 focus:outline-none ml-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.8rem', height: '1.8rem' }}>
                <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div
          key={`bar-${current}`}
          className="absolute bottom-0 left-0 h-1 bg-accent/60"
          style={{ animation: 'progressFill 3s linear forwards' }}
        />
      </div>
    )
  }

  // ── Normal (inline) layout ─────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br ${slide.gradient}`}
      style={{ minHeight: '220px', transition: 'background 0.7s ease' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={`Service highlight: ${slide.name}`}
    >
      {/* Watermark icon */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <Icon className="w-40 h-40 text-white/10 stroke-[0.6]" />
      </div>

      {/* Slide content */}
      <div
        key={current}
        className="relative z-10 flex flex-col justify-center px-8 py-8 pr-48 sm:pr-56"
        style={{ minHeight: '220px', animation: 'slideIn 0.4s ease-out' }}
      >
        <span className="inline-flex w-fit items-center bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
          {slide.category}
        </span>
        <h3 className="text-white font-extrabold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)' }}>
          {slide.name}
        </h3>
        <p className="font-black text-accent leading-none mb-2"
           style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
          {slide.priceRange}
        </p>
        <p className="text-white/65 text-sm flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
          </svg>
          {slide.turnaround}
        </p>
      </div>

      {/* Bottom bar: progress + counter + arrows + fullscreen button */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3">
        <span className="text-white/40 text-xs tabular-nums">{current + 1} / {total}</span>

        <div className="flex items-center gap-2">
          <button onClick={prev} aria-label="Previous service"
            className="text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 rounded p-0.5">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={next} aria-label="Next service"
            className="text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 rounded p-0.5">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
          {/* Fullscreen / TV button */}
          <button
            onClick={enterFullscreen}
            aria-label="Enter fullscreen for TV display"
            title="TV / Fullscreen mode"
            className="text-white/50 hover:text-accent transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 rounded p-0.5 ml-1"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {!paused && (
        <div
          key={`bar-${current}`}
          className="absolute bottom-0 left-0 h-0.5 bg-accent/70 rounded-full"
          style={{ animation: 'progressFill 3s linear forwards' }}
        />
      )}
    </div>
  )
}

// ── Service detail card ───────────────────────────────────────────────────────

function ServiceCard({ cat }: { cat: RepairCategory }) {
  const Icon = ICON_MAP[cat.iconType]
  return (
    <article className="bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      <div className={`bg-gradient-to-br ${cat.gradient} px-6 py-5 flex items-center gap-4`}>
        <div className="flex-shrink-0">
          <Icon className="w-10 h-10 text-white/80" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{cat.title}</h3>
          <p className="text-white/70 text-xs mt-0.5">{cat.description}</p>
        </div>
      </div>
      <div className="divide-y divide-gray-100 flex-1">
        {cat.items.map(item => (
          <div key={item.name} className="flex items-center justify-between px-5 py-3 gap-3">
            <span className="text-gray-700 text-sm">{item.name}</span>
            <div className="text-right flex-shrink-0">
              <p className="text-navy font-semibold text-sm">{item.priceRange}</p>
              <p className="text-gray-400 text-xs">{item.turnaround}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RepairPage() {
  return (
    <>
      <Helmet>
        <title>Repair Services & Pricing | FixCel</title>
        <meta
          name="description"
          content="Professional laptop and computer repair services in Sta Rosa, Laguna. Board level repair, hardware replacement, software services, and cleaning. Free diagnostic."
        />
      </Helmet>

      <div className="w-full px-6 lg:px-10 py-8 space-y-8">
        {/* Page header */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-navy">Repair Services</h2>
          <p className="text-gray-500 mt-1 text-sm">Laptops &amp; computers · Sta Rosa, Laguna</p>
        </div>

        {/* ── Slideshow ── */}
        <RepairSlideshow />

        {/* Trust banner */}
        <div className="bg-accent/20 border border-accent rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🔧</span>
          <div>
            <p className="font-bold text-navy text-sm">Free Diagnostic on Every Device</p>
            <p className="text-gray-600 text-sm">
              We inspect your device at no charge before quoting a price.{' '}
              <a href="tel:+63995160790" className="text-navy-light underline font-medium">
                Call +63 995 160 790
              </a>{' '}
              or walk in during business hours.
            </p>
          </div>
        </div>

        {/* Service detail cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Repair service categories">
          {repairCategories.map(cat => (
            <ServiceCard key={cat.id} cat={cat} />
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs">
          Prices are estimates and may vary depending on device model and parts availability.
          Final price confirmed after diagnostic.
        </p>
      </div>
    </>
  )
}
