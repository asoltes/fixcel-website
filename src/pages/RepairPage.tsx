import { Helmet } from 'react-helmet-async'
import { repairCategories } from '../data/repairs'
import type { RepairCategory } from '../types'

// ── Icons ────────────────────────────────────────────────────────────────────

function CircuitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round"
      className="w-10 h-10 text-white/80" aria-hidden="true">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2" />
      <path d="M5 5h2v2H5zM17 5h2v2h-2zM5 17h2v2H5zM17 17h2v2h-2z" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round"
      className="w-10 h-10 text-white/80" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round"
      className="w-10 h-10 text-white/80" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round"
      className="w-10 h-10 text-white/80" aria-hidden="true">
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

// ── Sub-components ───────────────────────────────────────────────────────────

function ServiceCard({ cat }: { cat: RepairCategory }) {
  const Icon = ICON_MAP[cat.iconType]
  return (
    <article className="bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Banner */}
      <div className={`bg-gradient-to-br ${cat.gradient} px-6 py-5 flex items-center gap-4`}>
        <div className="flex-shrink-0">
          <Icon />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{cat.title}</h3>
          <p className="text-white/70 text-xs mt-0.5">{cat.description}</p>
        </div>
      </div>

      {/* Service rows */}
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

      <div className="w-full px-6 lg:px-10 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-navy">Repair Services</h2>
          <p className="text-gray-500 mt-1 text-sm">Laptops & computers · Sta Rosa, Laguna</p>
        </div>

        {/* Trust banner */}
        <div className="bg-accent/20 border border-accent rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
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

        {/* Service cards grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          aria-label="Repair service categories"
        >
          {repairCategories.map(cat => (
            <ServiceCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Prices are estimates and may vary depending on device model and parts availability.
          Final price confirmed after diagnostic.
        </p>
      </div>
    </>
  )
}
