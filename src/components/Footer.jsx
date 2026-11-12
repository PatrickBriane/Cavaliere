import './Footer.css'
import Instagram from '../assets/FOOTER/INSTAGRAM-ICON.svg'
import Facebook from '../assets/FOOTER/FACEBOOK-ICON.svg'
import X from '../assets/FOOTER/X-ICON.svg'
import brandLogo from '../assets/ICONS/BRAND-LOGO.svg'
import emailArrow from '../assets/FOOTER/EMAIL-ARROW.svg'
import qrCode from '../assets/FOOTER/QR-CODE.png'

export default function Footer() {
    return(
        <footer className="footer-container">
            <p>ESTABLISHED 2025 - THE HOUSE OF MODERN NOBILITY</p>
            <div className="footer-links-container">
                <div>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link head-link">
                        <p>EXPLORE</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <p>New Arrivals</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <p>COLLECTION</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <p>MEN'S</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <p>WOMEN'S</p>
                    </a>
                </div>
                
                <div className='separated'>
                    <div className="separator"></div>
                    <div>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link head-link">
                        <p>COMPANY</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <p>ABOUT US</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <p>TERMS & CONDITION</p>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <p>PRIVACY POLICY</p>
                    </a>
                    </div>
                </div>
                
                <div className='separated'>
                    <div className="separator"></div>
                    <div>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link head-link">
                        <p>CONTACT</p>
                    </a>
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
            <div className='brand-logo'>
                <img src={brandLogo} alt="Main Logo" className="logo-main" />
                <h1 className="brand-name">CAVALIÈRE</h1>
            </div>
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
                    <p className='qr-text bold'>DISCOVER THE COLLECTION NOW</p>
                    <p className='qr-text'>"WHERE THE ART OF DRESSING BECOMES THE ART OF BECOMING"</p>
                </div>
            </div>
        </footer>
    )
}