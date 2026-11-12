import { useSearchParams, Link } from 'react-router-dom'
import './Listing.css'
import Header from './Header.jsx'
import ListingHero from '../assets/SHOP LISTING/IMAGES/COLLECTION-BANNER.jpg'
import PrevIcon from '../assets/SHOP LISTING/ICONS/LEFT-ARROW.svg'
import NextIcon from '../assets/SHOP LISTING/ICONS/RIGHT-ARROW.svg'
import Product1 from '../assets/SHOP LISTING/IMAGES/FEATURED-ONE.png'
import Product2 from '../assets/SHOP LISTING/IMAGES/FEATURED-TWO.png'
import Product3 from '../assets/SHOP LISTING/IMAGES/FEATURED-THREE.png'
import HeartIcon from '../assets/SHOP LISTING/ICONS/HEART.svg'
import CartIcon from '../assets/ICONS/SHOPPING-CART.svg'
import { products } from '../data/products.js'

const categories = [
    'THE COLLECTION',
    'OUTERWEAR',
    'TAILORING',
    'FOOTWEAR',
    'TIMEPIECES',
    'ACCESSORIES',
    'NEW ARRIVALS',
    "MEN'S",
    "WOMEN'S"
]

const collectionProducts = products.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name.toUpperCase(),
    price: p.price,
    category: p.category,
    image: p.image,
}))

export default function Listing() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeCategory = searchParams.get('category') || 'THE COLLECTION'

    const handleCategoryClick = (category) => {
        setSearchParams({ category })
    }

    const filteredProducts = activeCategory === 'THE COLLECTION'
        ? collectionProducts
        : collectionProducts.filter(product => product.category.includes(activeCategory))

    return (
        <>
            <section className="listing-section" id="listing-section">
                <div className="listing-header">
                    <Header isSolid={true} />
                </div>

                <div className="carousel-container">
                    <button className="carousel-button prev-button" aria-label="Previous"><img src={PrevIcon} alt="Previous" /></button>
                    <img src={ListingHero} alt="Cavaliere Listing Hero" className="carousel-image" />
                    <button className="carousel-button next-button" aria-label="Next"><img src={NextIcon} alt="Next" /></button>
                    
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
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`category-link ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.slug}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <button className="wishlist-btn" aria-label="Add to wishlist" onClick={e => e.preventDefault()}>
                                    <img src={HeartIcon} alt="Wishlist Icon" className="wishlist-icon" />
                                </button>
                                
                                <div className="product-image-container">
                                    <img src={product.image} alt={product.name} className="product-img" />
                                </div>

                                <div className="product-overlay-shadow" aria-hidden="true"></div>

                                <div className="product-info-bottom">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">${Number(product.price).toFixed(2)}</p>
                                </div>

                                <button
                                    className="product-cart-btn"
                                    aria-label="Add to cart"
                                    onClick={e => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                >
                                    <img src={CartIcon} alt="Add to cart" className="product-cart-icon" />
                                </button>
                            </Link>
                        ))
                    ) : (
                        <div className="empty-category-message">
                            <p>NO PRODUCTS FOUND IN THIS CATEGORY</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
