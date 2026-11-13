import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'
import brandLogo from '../assets/ICONS/BRAND-LOGO.svg'
import searchIcon from '../assets/ICONS/SEARCH-ICON.svg'
import cartIcon from '../assets/ICONS/SHOPPING-CART.svg'
import userIcon from '../assets/ICONS/USER-ICON.svg'
import menuIcon from '../assets/ICONS/MENU-ICON.svg'

export default function Header({ isSolid, tagline, variant }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleAboutClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      const section = document.getElementById('story-section')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate('/#story-section')
  }

  if (variant === 'product-detail') {
    return (
      <header className="header-container transparent-bg pd-header-variant">
        <div className="header-left pd-header-empty-left" />

        <div className="header-center pd-header-center-logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit', textDecoration: 'none' }}>
            <img src={brandLogo} alt="Main Logo" className="logo-main" />
            <h1 className="brand-name">CAVALIÈRE</h1>
          </Link>
        </div>

        <div className="header-right pd-header-right-btns">
          <button className="header-button" aria-label="Search">
            <img src={searchIcon} alt="Search" />
          </button>
          <button className="header-button" onClick={() => navigate('/cart')} aria-label="Cart">
            <img src={cartIcon} alt="Cart" />
          </button>
          <button className="header-button" aria-label="User"><img src={userIcon} alt="User" /></button>
          <button className="header-button" onClick={() => navigate('/language')} aria-label="Menu">
            <img src={menuIcon} alt="Menu" />
          </button>
        </div>
      </header>
    )
  }

  return (
    <header className={`header-container ${isSolid ? 'solid-bg' : 'transparent-bg'}`}>

      <div className="header-left">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'inherit', textDecoration: 'none' }}>
          <img src={brandLogo} alt="Small Logo" className="logo-small" />
        </Link>
        <button
          type="button"
          onClick={handleAboutClick}
          className="about-text about-text-btn"
        >
          ABOUT US
        </button>
      </div>

      <div className="header-center">
        {tagline ? (
          <span className="header-tagline">{tagline}</span>
        ) : (
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit', textDecoration: 'none' }}>
            <img src={brandLogo} alt="Main Logo" className="logo-main" />
            <h1 className="brand-name">CAVALIÈRE</h1>
          </Link>
        )}
      </div>

      <div className="header-right">
        <button className="header-button" aria-label="Search">
          <img src={searchIcon} alt="Search" />
        </button>
        <button className="header-button" onClick={() => navigate('/cart')} aria-label="Cart">
          <img src={cartIcon} alt="Cart" />
        </button>
        <button className="header-button" aria-label="User"><img src={userIcon} alt="User" /></button>
        <button className="header-button" onClick={() => navigate('/language')} aria-label="Menu">
          <img src={menuIcon} alt="Menu" />
        </button>
      </div>

    </header>
  )
}