import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Footer.css'
import Instagram from '../assets/FOOTER/INSTAGRAM-ICON.svg'
import Facebook from '../assets/FOOTER/FACEBOOK-ICON.svg'
import X from '../assets/FOOTER/X-ICON.svg'
import brandLogo from '../assets/ICONS/BRAND-LOGO.svg'
import emailArrow from '../assets/FOOTER/EMAIL-ARROW.svg'
import qrCode from '../assets/FOOTER/QR-CODE.png'
import LegalModal from './LegalModal.jsx'

export default function Footer() {
    const navigate = useNavigate()
    const location = useLocation()
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'terms' })

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

    const openModal = (type, e) => {
        if (e) e.preventDefault()
        setModalConfig({ isOpen: true, type })
    }

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }))
    }

    return (
        <footer className="footer-container">
            <p>ESTABLISHED 2025 - THE HOUSE OF MODERN NOBILITY</p>
            <div className="footer-links-container">
                <div>
                    <div className="footer-header">
                        <p>EXPLORE</p>
                    </div>
                    <Link
                        to="/explore?category=NEW ARRIVALS"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="footer-link"
                    >
                        <p>New Arrivals</p>
                    </Link>
                    <Link
                        to="/explore?category=THE COLLECTION"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="footer-link"
                    >
                        <p>COLLECTION</p>
                    </Link>
                    <Link
                        to="/explore?category=MEN'S"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="footer-link"
                    >
                        <p>MEN'S</p>
                    </Link>
                    <Link
                        to="/explore?category=WOMEN'S"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="footer-link"
                    >
                        <p>WOMEN'S</p>
                    </Link>
                </div>
                
                <div className='separated'>
                    <div className="separator"></div>
                    <div>
                    <div className="footer-header">
                        <p>COMPANY</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAboutClick}
                        className="footer-link"
                    >
                        <p>ABOUT US</p>
                    </button>
                    <button
                        type="button"
                        onClick={(e) => openModal('terms', e)}
                        className="footer-link"
                    >
                        <p>TERMS & CONDITION</p>
                    </button>
                    <button
                        type="button"
                        onClick={(e) => openModal('privacy', e)}
                        className="footer-link"
                    >
                        <p>PRIVACY POLICY</p>
                    </button>
                    </div>
                </div>
                
                <div className='separated'>
                    <div className="separator"></div>
                    <div>
                    <div className="footer-header">
                        <p>CONTACT</p>
                    </div>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <img src={Instagram}></img>
                        <p>@CAVALIERE.CO</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <img src={Facebook}></img>
                        <p>CAVALIERE OFFICIAL</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <img src={X}></img>
                        <p>CAVALIERELUXURY</p>
                    </a>
                    </div>
                </div>
            </div>
            <p>
                WHERE TRADITION WEARS A MONOCLE AND THE FUTURE WEARS CONFIDENCE.
            </p>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className='brand-logo'>
                <img src={brandLogo} alt="Main Logo" className="logo-main" />
                <h1 className="brand-name">CAVALIÈRE</h1>
            </Link>
            <div className='footer-email'>
                <p id='bold-footer'>BE UPDATED</p>
                <p>RECEIVE NEWS, COLLECTIONS, AND MORE.</p>
                <div className='email-field'>
                    <input placeholder='Email'></input>
                    <button className="email-button">
                    <img src={emailArrow} />
                    </button>
                </div>
            </div>
            <div className='qr-code-container'>
                <div className='qr-code'>
                    <img src={qrCode} />
                </div>
                <div>
                    <Link
                        to="/explore?category=THE COLLECTION"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        <p className='qr-text bold'>DISCOVER THE COLLECTION NOW</p>
                    </Link>
                    <p className='qr-text'>"WHERE THE ART OF DRESSING BECOMES THE ART OF BECOMING"</p>
                </div>
            </div>

            <LegalModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                type={modalConfig.type}
            />
        </footer>
    )
}
