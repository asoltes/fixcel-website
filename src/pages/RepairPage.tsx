import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { repairCategories } from '../data/repairs'
import type { RepairCategory } from '../types'

// ── Icons ────────────────────────────────────────────────────────────────────

function CircuitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2" />
      <path d="M5 5h2v2H5zM17 5h2v2h-2zM5 17h2v2H5zM17 17h2v2h-2z" />
    </svg>
  )
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
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
  const [current, setCurrent]   = useState(0)
  const [paused,  setPaused]    = useState(false)

  const total = slides.length
  const slide = slides[current]
  const Icon  = ICON_MAP[slide.iconType]

  const next = () => setCurrent(c => (c + 1) % total)
  const prev = () => setCurrent(c => (c - 1 + total) % total)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 3000)
    return () => clearInterval(timer)
  }, [paused, total])

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br ${slide.gradient}`}
      style={{ minHeight: '220px', transition: 'background 0.7s ease' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={`Service highlight: ${slide.name}`}
    >
      {/* Watermark icon — large, right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <Icon className="w-40 h-40 text-white/10 stroke-[0.6]" />
      </div>

      {/* Slide content */}
      <div
        key={current}
        className="relative z-10 flex flex-col justify-center px-8 py-8 pr-48 sm:pr-56"
        style={{ minHeight: '220px', animation: 'slideIn 0.4s ease-out' }}
      >
        {/* Category badge */}
        <span className="inline-flex w-fit items-center bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
          {slide.category}
        </span>

        {/* Service name */}
        <h3 className="text-white font-extrabold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)' }}>
          {slide.name}
        </h3>

        {/* Price — accent yellow, huge */}
        <p className="font-black text-accent leading-none mb-2"
           style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
          {slide.priceRange}
        </p>

        {/* Turnaround */}
        <p className="text-white/65 text-sm flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
          </svg>
          {slide.turnaround}
        </p>
      </div>

      {/* Bottom bar: progress + counter + arrows */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3">
        <span className="text-white/40 text-xs tabular-nums">{current + 1} / {total}</span>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous service"
            className="text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 rounded p-0.5"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next service"
            className="text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 rounded p-0.5"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
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
