import './Listing.css'
import Header from './Header.jsx'
import ListingHero from '../assets/SHOP LISTING/IMAGES/COLLECTION-BANNER.jpg'
import PrevIcon from '../assets/SHOP LISTING/ICONS/LEFT-ARROW.svg'
import NextIcon from '../assets/SHOP LISTING/ICONS/RIGHT-ARROW.svg'
import Product1 from '../assets/SHOP LISTING/IMAGES/FEATURED-ONE.png'
import Product2 from '../assets/SHOP LISTING/IMAGES/FEATURED-TWO.png'
import Product3 from '../assets/SHOP LISTING/IMAGES/FEATURED-THREE.png'
import LeatherHarness from '../assets/SHOP LISTING/IMAGES/HARNESS.png'
import HeritageChrono from '../assets/SHOP LISTING/IMAGES/CHRONO.png'
import NappaCasquette from '../assets/SHOP LISTING/IMAGES/CASQUETTE.png'
import Jacket from '../assets/SHOP LISTING/IMAGES/JACKET.png'
import Cuffs from '../assets/SHOP LISTING/IMAGES/CUFFS.png'
import Blousun from '../assets/SHOP LISTING/IMAGES/BLOUSUN.png'
import HeartIcon from '../assets/SHOP LISTING/ICONS/HEART.svg'


const collectionProducts = [
    { id: 1, name: 'LEATHER JACKET', image: Jacket },
    { id: 2, name: 'PLONGÉ BLOUSON', image: Blousun },
    { id: 3, name: 'SHEARLING CUFFS', image: Cuffs },
    { id: 4, name: 'LEATHER HARNESS', image: LeatherHarness },
    { id: 5, name: 'HERITAGE CHRONO', image: HeritageChrono },
    { id: 6, name: 'NAPPA CASQUETTE', image: NappaCasquette },
];

export default function Listing() {
    return (
        <>
            <section className="listing-section" id="listing-section">
                <div className="listing-header">
                    <Header isSolid={true} />
                </div>

                <div className="carousel-container">
                    <button className="carousel-button prev-button"><img src={PrevIcon} alt="Previous" /></button>
                    <img src={ListingHero} alt="Cavaliere Listing Hero" className="carousel-image" />
                    <button className="carousel-button next-button"><img src={NextIcon} alt="Next" /></button>
                    
                    <div className="listing-featured-products">
                        <div className="featured-product">
                            <img src={Product1} alt="Featured Product 1" className="featured-product-image" />
                        </div>
                        <div className="featured-product">
                            <img src={Product2} alt="Featured Product 2" className="featured-product-image" />
                        </div>
                        <div className="featured-product">
                            <img src={Product3} alt="Featured Product 3" className="featured-product-image" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="listing-content">
                <div className="categories-container">
                    <a href="#" className="category-link active">THE COLLECTION</a>
                    <a href="#" className="category-link">OUTERWEAR</a>
                    <a href="#" className="category-link">TAILORING</a>
                    <a href="#" className="category-link">FOOTWEAR</a>
                    <a href="#" className="category-link">TIMEPIECES</a>
                    <a href="#" className="category-link">ACCESSORIES</a>
                </div>

                {/* 3-Column Collection Product Grid */}
                <div className="product-grid">
                    {collectionProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <button className="wishlist-btn" aria-label="Add to wishlist">
                                <img src={HeartIcon} alt="Wishlist Icon" className="wishlist-icon" />
                            </button>
                            
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-img" />
                            </div>

                            <p className="product-name">{product.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}