import { Link } from 'react-router-dom'
import './Story.css'
import History from '../assets/BRAND STORY/HISTORY-BACKGROUND.jpg'
import Couture from '../assets/BRAND STORY/COTOURE-BACKGROUND.jpg'

export default function Story() {
    return (
        <section className="story-section" id="story-section">
            <Link to="/history">
            <div className="story-image-container">
                <img src={History} alt="Brand History" />
                <p className="story-text">HISTORY OF THE NOBILITY HOUSE</p>
            </div>
            </Link>
            <Link to="/couture">
            <div className="story-image-container">
                <img src={Couture} alt="Couture" />
                <p className="story-text">FASHION SHOW COTOURE</p>
            </div>
            </Link>
        </section>
    )
}
