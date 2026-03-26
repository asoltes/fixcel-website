import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { accessories } from '../data/accessories'
import type { AccessoryCategory, StockCondition } from '../types'

const CATEGORIES: ('All' | AccessoryCategory)[] = [
  'All', 'Memory', 'Storage', 'Battery', 'Display', 'Input', 'Cooling', 'Peripherals',
]

const conditionStyle: Record<StockCondition, string> = {
  New:  'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300',
  Used: 'bg-amber-100  text-amber-800  ring-1 ring-amber-300',
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
      strokeLinecap="round" strokeLinejoin="round"
      className="w-14 h-14 text-white/60" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

export default function AccessoriesPage() {
  const [filter, setFilter] = useState<'All' | AccessoryCategory>('All')

  const visible =
    filter === 'All' ? accessories : accessories.filter(a => a.category === filter)

  return (
    <>
      <Helmet>
        <title>Laptop Parts & Accessories | FixCel</title>
        <meta
          name="description"
          content="Buy laptop parts and accessories in Sta Rosa, Laguna. RAM, SSD, batteries, keyboards, chargers, cooling pads, and more."
        />
      </Helmet>

      <section className="w-full px-6 lg:px-10 py-8" aria-labelledby="accessories-heading">
        {/* Page header */}
        <div className="mb-6">
          <h2
            id="accessories-heading"
            className="text-2xl md:text-3xl font-bold text-navy"
          >
            Parts &amp; Accessories
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            {accessories.length} items in stock · Sta Rosa, Laguna
          </p>
        </div>

        {/* Category filter pills */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-navy ${
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
          {visible.map(item => (
            <article
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Banner */}
              <div className={`bg-gradient-to-br ${item.gradient} h-32 flex flex-col items-center justify-center relative`}>
                <BoxIcon />
                {/* Category badge */}
                <span className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                {/* Condition badge */}
                <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full ${conditionStyle[item.condition]}`}>
                  {item.condition}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-navy font-bold text-base leading-snug mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs mb-3 flex-1">{item.note}</p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="text-navy font-extrabold text-lg">
                    ₱{item.price.toLocaleString()}
                  </span>
                  <a
                    href="tel:+63995160790"
                    className="bg-accent hover:bg-yellow-400 text-navy text-xs font-bold px-3 py-1.5 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-navy"
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
            No items found in this category.
          </p>
        )}
      </section>
    </>
  )
}
