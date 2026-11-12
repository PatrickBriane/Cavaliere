import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './ProductDetail.css'
import Header from '../components/Header.jsx'
import { getProductBySlug } from '../data/products.js'
import heartIcon from '../assets/PRODUCT DETAIL/ICONS/WHITE-HEART.svg'
import returnArrow from '../assets/PRODUCT DETAIL/ICONS/RETURN-ARROW.svg'

const TABS = ['Description', 'Size & Fit', 'In-store Availability']

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  const [activeTab, setActiveTab] = useState('Description')
  const [selectedSize, setSelectedSize] = useState(null)
  const [wishlisted, setWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="pd-not-found">
        <Header isSolid={true} />
        <div className="pd-not-found-body">
          <p>Product not found.</p>
          <Link to="/explore" className="pd-back-link">← Back to Collection</Link>
        </div>
      </div>
    )
  }

  const tabContent = {
    Description: (
      <div className="pd-tab-content">
        {product.description.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p className="pd-materials-label">Materials:</p>
        <ul className="pd-materials-list">
          {product.materials.map(m => <li key={m}>{m}</li>)}
        </ul>
      </div>
    ),
    'Size & Fit': (
      <div className="pd-tab-content">
        <p>{product.fit}</p>
      </div>
    ),
    'In-store Availability': (
      <div className="pd-tab-content">
        <p>{product.availability}</p>
      </div>
    ),
  }

  return (
    <div className="pd-page">
      <Header variant="product-detail" />
      <div className="pd-left">
        <img src={product.detailImage} alt={product.name} className="pd-hero-img" />
        <div className="pd-img-dots">
          {[0, 1, 2].map(i => (
            <span key={i} className={`pd-dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="pd-right">
        <div className="pd-right-inner">
          <button className="pd-back" onClick={() => navigate(-1)} aria-label="Go back">
            <img src={returnArrow} alt="Back" />
          </button>

          <div className="pd-title-row">
            <div>
              <h1 className="pd-name">{product.name}</h1>
              <p className="pd-edition">{product.edition}</p>
            </div>
            <button
              className={`pd-wishlist ${wishlisted ? 'active' : ''}`}
              onClick={() => setWishlisted(w => !w)}
              aria-label="Add to wishlist"
            >
              <img src={heartIcon} alt="Wishlist" />
            </button>
          </div>

          <hr className="pd-divider" />

          <p className="pd-price">₱{product.price.toLocaleString()}.00</p>

          {product.sizes.length > 1 && (
            <div className="pd-sizes">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`pd-size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <button className="pd-btn-buy">Buy Now</button>
          <button className="pd-btn-cart">Add to Cart</button>

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
