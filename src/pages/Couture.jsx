import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductDetail.css'
import Header from '../components/Header.jsx'
import coutureImg from '../assets/BRAND STORY/COTOURE-BACKGROUND.jpg'
import heartIcon from '../assets/PRODUCT DETAIL/ICONS/WHITE-HEART.svg'
import returnArrow from '../assets/PRODUCT DETAIL/ICONS/RETURN-ARROW.svg'

const TABS = ['Runway Concept', 'Atelier & Silhouettes', 'Show Credits']

export default function Couture() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Runway Concept')
  const [wishlisted, setWishlisted] = useState(false)

  const tabContent = {
    'Runway Concept': (
      <div className="pd-tab-content">
        <p>
          Presented under the soaring colonnades of historic architectural halls, the Cavalière Haute Couture showcase explored the interplay of armored silhouettes, flowing drape, and aristocratic minimalism.
        </p>
        <p>
          Each couture ensemble commands space through dramatic structure, exaggerated collars, and razor-sharp lapels—reinterpreting classic eveningwear into an unapologetic statement of power and grace.
        </p>
        <p className="pd-materials-label">Signature Elements:</p>
        <ul className="pd-materials-list">
          <li>Hand-dyed midnight wool & structured plongé lambskin</li>
          <li>Sculpted equestrian harnesses with antique brass buckles</li>
          <li>Architectural high-stance shoulders and fluid pleated hems</li>
          <li>Monogram silk jacquard linings and concealed closures</li>
        </ul>
      </div>
    ),
    'Atelier & Silhouettes': (
      <div className="pd-tab-content">
        <p>
          Each piece featured in the runway collection was painstakingly constructed by our senior master tailors, requiring over 180 hours of hand-draping and meticulous fitting per couture look.
        </p>
      </div>
    ),
    'Show Credits': (
      <div className="pd-tab-content">
        <p>
          Creative Direction: The House of Cavalière Design Atelier.<br />
          Styling: Cavalière Studio Paris.<br />
          Soundtrack: Custom orchestral compositions recorded in Milan.
        </p>
      </div>
    ),
  }

  return (
    <div className="pd-page">
      <Header variant="product-detail" />
      <div className="pd-left">
        <img src={coutureImg} alt="Fashion Show Couture" className="pd-hero-img" />
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
              <h1 className="pd-name">FASHION SHOW COUTURE</h1>
              <p className="pd-edition">2026 WINTER-FALL RUNWAY COLLECTION</p>
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
            HAUTE COUTURE · RUNWAY PRESENTATION
          </p>

          <button className="pd-btn-buy" onClick={() => navigate('/explore')}>
            Explore Ready-To-Wear
          </button>
          <button className="pd-btn-cart" onClick={() => navigate('/history')}>
            Read House History
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
