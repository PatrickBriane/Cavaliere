import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'
import brandLogo from '../assets/ICONS/BRAND-LOGO.svg'
import searchIcon from '../assets/ICONS/SEARCH-ICON.svg'
import cartIcon from '../assets/ICONS/SHOPPING-CART.svg'
import userIcon from '../assets/ICONS/USER-ICON.svg'
import menuIcon from '../assets/ICONS/MENU-ICON.svg'
import { products } from '../data/products.js'

export default function Header({ isSolid, tagline, variant }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const searchInputRef = useRef(null)
  const searchContainerRef = useRef(null)

  const closeSuggestions = () => {
    setSuggestions([])
    setActiveSuggestion(-1)
  }

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        closeSuggestions()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSearch = () => {
    setIsSearchOpen(prev => {
      if (prev) {
        setSearchQuery('')
        closeSuggestions()
      }
      return !prev
    })
  }

  const handleSearchChange = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    setActiveSuggestion(-1)
    if (q.trim().length < 1) {
      setSuggestions([])
      return
    }
    const lower = q.toLowerCase()
    const matched = products.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.category.some(c => c.toLowerCase().includes(lower))
    ).slice(0, 6)
    setSuggestions(matched)
  }

  const handleSuggestionClick = (product) => {
    setSearchQuery('')
    closeSuggestions()
    setIsSearchOpen(false)
    navigate(`/product/${product.slug}`)
  }

  const handleSearchKeyDown = (e) => {
    if (suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion(prev => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        handleSuggestionClick(suggestions[activeSuggestion])
      }
    } else if (e.key === 'Escape') {
      closeSuggestions()
      setIsSearchOpen(false)
    }
  }

  const toggleUserModal = () => {
    setIsUserModalOpen(prev => !prev)
  }

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

  const renderSearchGroup = () => (
    <div
      ref={searchContainerRef}
      className={`header-search-container ${isSearchOpen ? 'open' : ''}`}
    >
      <div className="header-search-inner">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="SEARCH THE HOUSE..."
          className="header-search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onClick={e => e.stopPropagation()}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul className="search-suggestions">
            {suggestions.map((product, i) => (
              <li
                key={product.id}
                className={`search-suggestion-item ${i === activeSuggestion ? 'active' : ''}`}
                onMouseDown={() => handleSuggestionClick(product)}
              >
                <img src={product.image} alt={product.name} className="suggestion-img" />
                <div className="suggestion-text">
                  <span className="suggestion-name">{product.name}</span>
                  <span className="suggestion-category">{product.category[0]}</span>
                </div>
                <span className="suggestion-price">₱{Number(product.price).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="button"
        className="header-button search-toggle-btn"
        onClick={toggleSearch}
        aria-label="Toggle search input"
      >
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  )

  const renderUserModal = () => {
    if (!isUserModalOpen) return null
    return (
      <div className="user-modal-backdrop" onClick={toggleUserModal}>
        <div className="user-modal-card" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="user-modal-close"
            onClick={toggleUserModal}
            aria-label="Close user profile"
          >
            ✕
          </button>

          <div className="user-modal-avatar-wrap">
            <img src={userIcon} alt="User Avatar" className="user-modal-avatar" />
          </div>

          <p className="user-modal-badge">CLIENT NO. 2026-CVL</p>
          <h2 className="user-modal-name">Phenelope</h2>
          <p className="user-modal-tier">VIP NOBILITY MEMBER</p>

          <div className="user-modal-details">
            <div className="user-modal-row">
              <span className="user-modal-label">STATUS</span>
              <span className="user-modal-value">ACTIVE CLIENT</span>
            </div>
            <div className="user-modal-row">
              <span className="user-modal-label">SALON PREFERENCE</span>
              <span className="user-modal-value">FLAGSHIP ATELIER</span>
            </div>
            <div className="user-modal-row">
              <span className="user-modal-label">CURRENCY</span>
              <span className="user-modal-value">PHP (₱)</span>
            </div>
          </div>
        </div>
      </div>
    )
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
          {renderSearchGroup()}
          <button className="header-button" onClick={() => navigate('/cart')} aria-label="Cart">
            <img src={cartIcon} alt="Cart" />
          </button>
          <button className="header-button" onClick={toggleUserModal} aria-label="User">
            <img src={userIcon} alt="User" />
          </button>
          <button className="header-button" onClick={() => navigate('/language')} aria-label="Menu">
            <img src={menuIcon} alt="Menu" />
          </button>
        </div>
        {renderUserModal()}
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
        {renderSearchGroup()}
        <button className="header-button" onClick={() => navigate('/cart')} aria-label="Cart">
          <img src={cartIcon} alt="Cart" />
        </button>
        <button className="header-button" onClick={toggleUserModal} aria-label="User">
          <img src={userIcon} alt="User" />
        </button>
        <button className="header-button" onClick={() => navigate('/language')} aria-label="Menu">
          <img src={menuIcon} alt="Menu" />
        </button>
      </div>

      {renderUserModal()}
    </header>
  )
}
