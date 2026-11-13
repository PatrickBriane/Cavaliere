import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Listing from './components/Listing.jsx'
import Story from './components/Story.jsx'
import Footer from './components/Footer.jsx'

import History from './pages/History.jsx'
import Couture from './pages/Couture.jsx'
import Explore from './pages/Explore.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import LanguageSelect from './pages/LanguageSelect.jsx'
import Cart from './pages/Cart.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

function Landing() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      if (sessionStorage.getItem('cavaliere_scroll_restoring') === 'true') {
        sessionStorage.removeItem('cavaliere_scroll_restoring')
        return
      }
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }
  }, [location.hash])

  return (
    <>
      <Header
        isSolid={false}
        tagline="WHERE TRADITION WEARS A MONOCLE AND THE FUTURE WEARS CONFIDENCE."
      />
      <Hero />
      <div className="landing-sticky-wrapper">
        <div className="listing-header">
          <Header isSolid={true} />
        </div>
        <Listing hideHeader={true} />
        <Story />
        <Footer />
      </div>
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-fade-wrapper">
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/collection" element={<Explore />} />
        <Route path="/the-collection" element={<Explore />} />
        <Route path="/discover-the-collection" element={<Explore />} />
        <Route path="/listing" element={<Explore />} />
        <Route path="/shop" element={<Explore />} />
        <Route path="/outerwear" element={<Explore />} />
        <Route path="/tailoring" element={<Explore />} />
        <Route path="/footwear" element={<Explore />} />
        <Route path="/timepieces" element={<Explore />} />
        <Route path="/accessories" element={<Explore />} />
        <Route path="/new-arrivals" element={<Explore />} />
        <Route path="/mens" element={<Explore />} />
        <Route path="/womens" element={<Explore />} />
        <Route path="/history" element={<History />} />
        <Route path="/history-of-the-nobility-house" element={<History />} />
        <Route path="/couture" element={<Couture />} />
        <Route path="/fashion-show-couture" element={<Couture />} />
        <Route path="/fashion-show-cotoure" element={<Couture />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/terms-and-condition" element={<TermsAndConditions />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
