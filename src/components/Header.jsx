import './Header.css'
import brandLogo from '../assets/ICONS/BRAND-LOGO.svg'
import searchIcon from '../assets/ICONS/SEARCH-ICON.svg'
import userIcon from '../assets/ICONS/USER-ICON.svg'
import menuIcon from '../assets/ICONS/MENU-ICON.svg'

export default function Header({ isSolid, tagline }) {
  return (
    <header className={`header-container ${isSolid ? 'solid-bg' : 'transparent-bg'}`}>
      
      <div className="header-left">
        <img src={brandLogo} alt="Small Logo" className="logo-small" />
        <span className="about-text">ABOUT US</span>
      </div>

      <div className="header-center">
        {tagline ? (
          <span className="header-tagline">{tagline}</span>
        ) : (
          <>
            <img src={brandLogo} alt="Main Logo" className="logo-main" />
            <h1 className="brand-name">CAVALIÈRE</h1>
          </>
        )}
      </div>

      <div className="header-right">
        <button className="header-button"><img src={searchIcon} alt="Search" /></button>
        <button className="header-button"><img src={userIcon} alt="User" /></button>
        <button className="header-button"><img src={menuIcon} alt="Menu" /></button>
      </div>

    </header>
  )
}