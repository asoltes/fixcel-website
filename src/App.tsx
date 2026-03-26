import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const LaptopsPage     = lazy(() => import('./pages/LaptopsPage'))
const AccessoriesPage = lazy(() => import('./pages/AccessoriesPage'))
const RepairPage      = lazy(() => import('./pages/RepairPage'))
const AboutPage       = lazy(() => import('./pages/AboutPage'))
const ContactPage     = lazy(() => import('./pages/ContactPage'))

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-navy focus:font-semibold focus:rounded"
      >
        Skip to main content
      </a>
      <Header />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20 text-navy font-medium">
              Loading…
            </div>
          }
        >
          <div className="animate-fadeIn">
            <Routes>
              <Route path="/"            element={<Navigate to="/repair" replace />} />
              <Route path="/laptops"     element={<LaptopsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/repair"      element={<RepairPage />} />
              <Route path="/about"       element={<AboutPage />} />
              <Route path="/contact"     element={<ContactPage />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
