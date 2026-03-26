import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { laptops } from '../data/laptops'
import type { Condition } from '../types'

const CONDITIONS: ('All' | Condition)[] = ['All', 'Excellent', 'Good', 'Fair']

const conditionStyle: Record<Condition, string> = {
  Excellent: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300',
  Good: 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300',
  Fair: 'bg-orange-100 text-orange-800 ring-1 ring-orange-300',
}

const conditionDot: Record<Condition, string> = {
  Excellent: 'bg-emerald-500',
  Good: 'bg-yellow-400',
  Fair: 'bg-orange-400',
}

/** Inline laptop SVG icon */
function LaptopIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-20 h-20 text-white/60"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )
}

export default function LaptopsPage() {
  const [filter, setFilter] = useState<'All' | Condition>('All')

  const visible = filter === 'All' ? laptops : laptops.filter(l => l.condition === filter)

  return (
    <>
      <Helmet>
        <title>Used Laptops for Sale | FixCel</title>
        <meta
          name="description"
          content="Browse quality used and second-hand laptops for sale in Sta Rosa, Laguna Philippines. Dell, HP, Lenovo, Asus, Acer, Apple and more."
        />
      </Helmet>

      <section className="w-full px-6 lg:px-10 py-8" aria-labelledby="laptops-heading">
        {/* Section header */}
        <div className="mb-6">
          <h2
            id="laptops-heading"
            className="text-2xl md:text-3xl font-bold text-navy"
          >
            Laptops for Sale
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            {laptops.length} units available · Sta Rosa, Laguna
          </p>
        </div>

        {/* Condition filter pills */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by condition">
          {CONDITIONS.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-navy ${
                filter === c
                  ? 'bg-navy text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-navy hover:text-navy'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map(laptop => (
            <article
              key={laptop.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Colored banner */}
              <div
                className={`bg-gradient-to-br ${laptop.gradient} flex items-center justify-center h-40 relative`}
              >
                <LaptopIcon />
                {/* Brand badge */}
                <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                  {laptop.brand}
                </span>
                {/* Condition badge */}
                <span
                  className={`absolute top-3 right-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${conditionStyle[laptop.condition]}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${conditionDot[laptop.condition]}`} aria-hidden="true" />
                  {laptop.condition}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-navy font-bold text-lg leading-tight mb-1">
                  {laptop.model}
                </h3>
                <p className="text-gray-500 text-sm mb-3 truncate">{laptop.processor}</p>

                {/* Spec pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[laptop.ram, laptop.storage, laptop.display].map(spec => (
                    <span
                      key={spec}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="text-navy font-extrabold text-xl">
                    ₱{laptop.price.toLocaleString()}
                  </span>
                  <a
                    href={`tel:+63995160790`}
                    className="bg-accent hover:bg-yellow-400 text-navy text-sm font-bold px-4 py-2 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-navy"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-gray-400 py-16 text-lg">
            No units available for this condition.
          </p>
        )}
      </section>
    </>
  )
}
