import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductDetail.css'
import Header from '../components/Header.jsx'
import historyImg from '../assets/BRAND STORY/HISTORY-BACKGROUND.jpg'
import heartIcon from '../assets/PRODUCT DETAIL/ICONS/WHITE-HEART.svg'
import returnArrow from '../assets/PRODUCT DETAIL/ICONS/RETURN-ARROW.svg'

const TABS = ['Chronicle', 'Heritage & Craft', 'The Archives']

export default function History() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Chronicle')
  const [wishlisted, setWishlisted] = useState(false)

  const tabContent = {
    Chronicle: (
      <div className="pd-tab-content">
        <p>
          Founded upon the timeless pillars of nobility, restraint, and impeccable sartorial poise,
          the House of Cavalière emerged as a sanctuary for those who view attire as an armor of modern prestige.
        </p>
        <p>
          Born amidst the grand salons of high aristocracy and revived for the modern era in 2025,
          our lineage carries forward ancestral tailoring codes—weaving equestrian discipline with avant-garde elegance.
        </p>
        <p className="pd-materials-label">Guiding Tenets:</p>
        <ul className="pd-materials-list">
          <li>Architectural precision in tailoring</li>
          <li>Uncompromising provenance of raw materials</li>
          <li>Artisanal mastery passed across generations</li>
          <li>Discreet luxury with undeniable presence</li>
        </ul>
      </div>
    ),
    'Heritage & Craft': (
      <div className="pd-tab-content">
        <p>
          Every garment is sculpted in historical ateliers where time-honored benchcraft meets contemporary silhouette design.
          From hand-rolled seams to hand-finished horn buttons, our artisans spend dozens of hours perfecting each bespoke proportion.
        </p>
      </div>
    ),
    'The Archives': (
      <div className="pd-tab-content">
        <p>
          Preserved within our heritage vaults are original sketches, vintage equestrian motifs, and ceremonial attire dating back to our earliest aristocratic commissions. Selected artifacts are available for private viewing by appointment at our flagship salons.
        </p>
      </div>
    ),
  }

  return (
    <div className="pd-page">
      <Header variant="product-detail" />
      <div className="pd-left">
        <img src={historyImg} alt="History of the Nobility House" className="pd-hero-img" />
        <div className="pd-img-dots">
          {[0, 1, 2].map(i => (
            <span key={i} className={`pd-dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="pd-right">
        <div className="pd-right-inner">
          <button
            className="pd-back"
            onClick={() => {
              sessionStorage.setItem('cavaliere_scroll_restoring', 'true')
              navigate(-1)
            }}
            aria-label="Go back"
          >
            <img src={returnArrow} alt="Back" />
          </button>

          <div className="pd-title-row">
            <div>
              <h1 className="pd-name">HISTORY OF THE NOBILITY HOUSE</h1>
              <p className="pd-edition">THE ORIGINS & HERITAGE OF CAVALIÈRE</p>
            </div>
            <button
              className={`pd-wishlist ${wishlisted ? 'active' : ''}`}
              onClick={() => setWishlisted(w => !w)}
              aria-label="Add to favorites"
            >
              <img src={heartIcon} alt="Wishlist" />
            </button>
          </div>

          <hr className="pd-divider" />

          <p className="pd-price" style={{ fontSize: '1.25rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
            ESTABLISHED 2025 · FLORENCE & PARIS
          </p>

          <button className="pd-btn-buy" onClick={() => navigate('/explore')}>
            Discover The Collection
          </button>
          <button className="pd-btn-cart" onClick={() => navigate('/couture')}>
            View Couture Runway
          </button>

          <div className="pd-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`pd-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <hr className="pd-tab-divider" />

          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  )
}
