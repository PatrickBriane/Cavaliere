import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import Header from '../components/Header.jsx'
import Jacket from '../assets/SHOP LISTING/IMAGES/JACKET.png'
import Blousun from '../assets/SHOP LISTING/IMAGES/BLOUSUN.png'
import Cuffs from '../assets/SHOP LISTING/IMAGES/CUFFS.png'
import Harness from '../assets/SHOP LISTING/IMAGES/HARNESS.png'

const initialItems = [
  { id: 1, name: 'Leather Jacket',  price: 89.99,  size: 'L', qty: 1, image: Jacket,  desc: 'Hand-stitched full-grain leather jacket with tailored silhouette and heritage brass hardware.' },
  { id: 2, name: 'Plongé Blouson', price: 79.99,  size: 'M', qty: 1, image: Blousun, desc: 'Butter-soft plongé leather blouson with an effortless drape and refined matte finish.' },
  { id: 3, name: 'Shearling Cuffs', price: 49.99, size: 'L', qty: 1, image: Cuffs,   desc: 'Sumptuous shearling-lined cuffs crafted from supple nappa leather for structured elegance.' },
  { id: 4, name: 'Leather Harness', price: 59.99, size: 'L', qty: 1, image: Harness, desc: 'Architectural leather harness with adjustable buckle detailing and heritage-engraved clasps.' },
]

const TAX_RATE = 0.08
const SHIPPING = 0

export default function Cart() {
  const [items, setItems] = useState(initialItems)

  const changeQty = (id, delta) => {
    setItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const taxes = subtotal * TAX_RATE
  const total = subtotal + taxes + SHIPPING
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="cart-page">
      <div className="cart-header-sticky">
        <Header isSolid={true} />
      </div>

      <div className="cart-body">
        <div className="cart-items-col">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/explore" className="cart-empty-link">Continue Shopping</Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-wrap">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                <div className="cart-item-info">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <p className="cart-item-desc">{item.desc}</p>
                  <p className="cart-item-size">Size: {item.size}</p>
                  <div className="cart-qty-row">
                    <button className="cart-qty-btn" onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                    <span className="cart-qty-val">{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => changeQty(item.id, +1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="cart-summary-col">
          <div className="cart-summary-box">
            <h2 className="cart-summary-title">Order Summary</h2>
            <hr className="cart-summary-divider" />
            <div className="cart-summary-row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>${SHIPPING.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Discount</span>
              <span>$0.00</span>
            </div>
            <hr className="cart-summary-divider" />
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="cart-checkout-btn">Proceed to Checkout</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
