import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const phoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.09 6.09l1.2-1.2a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

function LaptopLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round"
      className="w-7 h-7 text-accent" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

const linkBase =
  'px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/60'
const linkActive   = 'bg-white/15 text-white'
const linkInactive = 'text-white/75 hover:bg-white/10 hover:text-white'

export default function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [saleOpen,     setSaleOpen]     = useState(false)
  const [mobileSaleOpen, setMobileSaleOpen] = useState(false)

  const { pathname } = useLocation()
  const forSaleActive = pathname === '/laptops' || pathname === '/accessories'

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileSaleOpen(false)
  }

  return (
    <nav
      className="bg-navy sticky top-0 z-30 shadow-lg border-b border-white/10"
      aria-label="Main navigation"
    >
      <div className="w-full px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">

          {/* Logo → links to /repair */}
          <Link
            to="/repair"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent/60 rounded"
          >
            <LaptopLogoIcon />
            <span className="text-2xl font-black tracking-tight text-white">
              Fix<span className="text-accent">Cel</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">

            {/* 1. Repair */}
            <li>
              <NavLink
                to="/repair"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                Repair
              </NavLink>
            </li>

            {/* 2. For Sale! dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setSaleOpen(true)}
              onMouseLeave={() => setSaleOpen(false)}
            >
              <button
                onClick={() => setSaleOpen(o => !o)}
                aria-haspopup="true"
                aria-expanded={saleOpen}
                className={`${linkBase} flex items-center gap-1 ${
                  forSaleActive ? linkActive : linkInactive
                }`}
              >
                For Sale!
                <svg viewBox="0 0 20 20" fill="currentColor"
                  className={`w-4 h-4 transition-transform duration-150 ${saleOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true">
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {saleOpen && (
                <ul
                  className="absolute top-full left-0 mt-1 w-44 bg-navy border border-white/10 rounded-xl shadow-xl overflow-hidden list-none m-0 p-1"
                  onMouseEnter={() => setSaleOpen(true)}
                  onMouseLeave={() => setSaleOpen(false)}
                >
                  <li>
                    <NavLink
                      to="/laptops"
                      onClick={() => setSaleOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                          isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      💻 Laptops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/accessories"
                      onClick={() => setSaleOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                          isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      🔩 Accessories
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 3. About Us */}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                About Us
              </NavLink>
            </li>

            {/* 4. Contact Us */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* Desktop phone CTA */}
          <a
            href="tel:+63995160790"
            className="hidden lg:flex items-center gap-2 bg-accent hover:bg-yellow-400 text-navy text-sm font-bold px-4 py-1.5 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {phoneIcon}
            +63 995 160 790
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="md:hidden text-white p-1.5 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {mobileOpen ? (
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

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <ul
            id="mobile-menu"
            className="md:hidden pb-3 pt-1 flex flex-col gap-0.5 list-none m-0 p-0 border-t border-white/10"
          >
            {/* Repair */}
            <li>
              <NavLink
                to="/repair"
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md font-medium text-sm transition-colors duration-150 ${
                    isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                Repair
              </NavLink>
            </li>

            {/* For Sale! accordion */}
            <li>
              <button
                onClick={() => setMobileSaleOpen(o => !o)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md font-medium text-sm transition-colors duration-150 ${
                  forSaleActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                For Sale!
                <svg viewBox="0 0 20 20" fill="currentColor"
                  className={`w-4 h-4 transition-transform duration-150 ${mobileSaleOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true">
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>

              {mobileSaleOpen && (
                <ul className="mt-0.5 ml-4 flex flex-col gap-0.5 list-none p-0">
                  <li>
                    <NavLink
                      to="/laptops"
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                          isActive ? 'bg-white/15 text-white' : 'text-white/65 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      💻 Laptops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/accessories"
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                          isActive ? 'bg-white/15 text-white' : 'text-white/65 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      🔩 Accessories
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* About Us */}
            <li>
              <NavLink
                to="/about"
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md font-medium text-sm transition-colors duration-150 ${
                    isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                About Us
              </NavLink>
            </li>

            {/* Contact Us */}
            <li>
              <NavLink
                to="/contact"
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md font-medium text-sm transition-colors duration-150 ${
                    isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>

            {/* Phone */}
            <li className="pt-2">
              <a
                href="tel:+63995160790"
                className="flex items-center gap-2 bg-accent text-navy text-sm font-bold px-3 py-2 rounded-lg w-full"
              >
                {phoneIcon}
                +63 995 160 790
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
