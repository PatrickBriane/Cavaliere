import { Link } from 'react-router-dom'
import './Hero.css'
import heroBg from '../assets/LANDING PAGE/LANDING-BANNER.jpg'
import scrollIcon from '../assets/ICONS/SCROLL-DOWN-ICON.svg'
import brandLogo from '../assets/ICONS/BRAND-LOGO.svg'

export default function Hero() {
  const scrollToCollection = (e) => {
    e.preventDefault()
    const section = document.getElementById('listing-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-image-container">
        <img src={heroBg} alt="Cavaliere Hero" />
        
        <div className="hero-content">
          <img src={brandLogo} alt="Cavaliere Logo" style={{ width: '170px', height: '170px', marginBottom: '-30px' }} />
          <p className="hero-title">CAVALIÈRE</p>
          <p className="hero-subtitle">ESTABLISHED 2025 - THE HOUSE OF MODERN NOBILITY</p>
        </div>
      </div>

      <div className="hero-bottom-bar">
        <Link to="/explore" className="hero-link">
          DISCOVER THE COLLECTION
        </Link>
        <button
          type="button"
          onClick={scrollToCollection}
          className="arrow-down-btn"
          aria-label="Scroll to collection"
        >
          <div className="arrow-down">
            <img src={scrollIcon} alt="Scroll Icon" style={{ width: '43px', height: 'auto' }} />
          </div>
        </button>
      </div>
    </section>
  )
}
