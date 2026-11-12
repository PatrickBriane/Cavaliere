import './Story.css'
import History from '../assets/BRAND STORY/HISTORY-BACKGROUND.jpg'
import Couture from '../assets/BRAND STORY/COTOURE-BACKGROUND.jpg'

export default function Story() {
    return (
        <section className="story-section">
            <a href="#" target="_blank" rel="noopener noreferrer">
            <div className="story-image-container">
                <img src={History} alt="Brand History" />
                <p className="story-text">HISTORY OF THE NOBILITY HOUSE</p>
            </div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"   >
            <div className="story-image-container">
                <img src={Couture} alt="Couture" />
                <p className="story-text">FASHION SHOW COTOURE</p>
            </div>
            </a>
        </section>
    )
}