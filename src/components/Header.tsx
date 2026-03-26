import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    src: '/img/slide1.jpg',
    alt: 'Quality used laptops available for sale',
  },
  {
    src: '/img/slide2.jpg',
    alt: 'Wide selection of second-hand laptops',
  },
  {
    src: '/img/slide3.jpg',
    alt: 'Affordable pre-owned laptops in great condition',
  },
]

export default function Header() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(360px, 55vh, 600px)' }}
      role="banner"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          width={1920}
          height={600}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Gradient overlay — dark at bottom, subtle at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,31,63,0.92) 0%, rgba(0,31,63,0.55) 45%, rgba(0,0,0,0.15) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 lg:px-10 pb-10 pt-8"
           style={{ minHeight: 'clamp(360px, 55vh, 600px)' }}>

        {/* Eyebrow */}
        <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-2">
          Sta Rosa, Laguna · Philippines
        </p>

        {/* Title */}
        <h1 className="text-white font-extrabold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
          Computer and Laptop Repair Services
        </h1>

        {/* Subtitle */}
        <p className="text-white/75 text-sm sm:text-base mb-6 max-w-xl">
          Tested &amp; inspected by an expert technician. Affordable prices, free diagnostics,
          and same-day repair available.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/laptops"
            className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-400 text-navy font-bold text-sm px-5 py-2.5 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Browse Laptops
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            to="/repair"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold text-sm px-5 py-2.5 rounded-lg border border-white/30 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Book a Repair
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 right-6 lg:right-10 flex gap-1.5" aria-hidden="true">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
