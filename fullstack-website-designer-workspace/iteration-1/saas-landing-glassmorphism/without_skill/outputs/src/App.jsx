/**
 * App
 * Root component — assembles the full Luminary landing page.
 * Layout: AuroraBackground (fixed) → Navbar → Hero → Features
 *          → SocialProof → Pricing → Footer
 */
import AuroraBackground from './components/AuroraBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import SocialProof from './components/SocialProof'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Fixed aurora gradient + noise layer */}
      <AuroraBackground />

      {/* Sticky navigation */}
      <Navbar />

      {/* Page content — positioned above aurora */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
      </main>

      <Footer />
    </>
  )
}
