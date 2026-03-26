import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navItems = [
  { to: '/laptops',      label: 'Laptops'      },
  { to: '/accessories',  label: 'Accessories'  },
  { to: '/repair',       label: 'Repair'       },
  { to: '/about',        label: 'About Us'     },
  { to: '/contact',      label: 'Contact Us'   },
]

function LaptopLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-accent" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/60 ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-white/75 hover:bg-white/10 hover:text-white'
    }`

  return (
    <nav
      className="bg-navy sticky top-0 z-30 shadow-lg border-b border-white/10"
      aria-label="Main navigation"
    >
      <div className="w-full px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            to="/laptops"
            className="flex items-center gap-2 text-white font-bold text-lg tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent/60 rounded"
          >
            <LaptopLogoIcon />
            <span>Fix<span className="text-accent">Cel</span></span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop phone CTA */}
          <a
            href="tel:+63995160790"
            className="hidden lg:flex items-center gap-2 bg-accent hover:bg-yellow-400 text-navy text-sm font-bold px-4 py-1.5 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.09 6.09l1.2-1.2a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +63 995 160 790
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(prev => !prev)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="md:hidden text-white p-1.5 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <ul
            id="mobile-menu"
            className="md:hidden pb-3 pt-1 flex flex-col gap-0.5 list-none m-0 p-0 border-t border-white/10"
          >
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-md font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/60 ${
                      isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="tel:+63995160790"
                className="flex items-center gap-2 bg-accent text-navy text-sm font-bold px-3 py-2 rounded-lg w-full"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.09 6.09l1.2-1.2a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +63 995 160 790
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
