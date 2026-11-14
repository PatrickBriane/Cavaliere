import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Cart.css'
import Header from '../components/Header.jsx'
import { getCart, updateCartItemQty, saveCart } from '../data/cart.js'
import { getWishlist, removeFromWishlist } from '../data/wishlist.js'
import { getOrders, placeOrder } from '../data/orders.js'

const TAX_RATE = 0.08
const SHIPPING = 0

const TABS = ['My Cart', 'My Wishlist', 'My Orders']

export default function Cart() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('My Cart')
  const [items, setItems] = useState(() => getCart())
  const [wishlistItems, setWishlistItems] = useState(() => getWishlist())
  const [orders, setOrders] = useState(() => getOrders())

  const [showCheckout, setShowCheckout] = useState(false)
  const [form, setForm] = useState({ name: '', address: '', phone: '' })
  const [formError, setFormError] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(null)

  useEffect(() => {
    const handleCartUpdate = () => setItems(getCart())
    const handleWishlistUpdate = () => setWishlistItems(getWishlist())
    const handleOrdersUpdate = () => setOrders(getOrders())
    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    window.addEventListener('ordersUpdated', handleOrdersUpdate)
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
      window.removeEventListener('ordersUpdated', handleOrdersUpdate)
    }
  }, [])

  const changeQty = (id, size, delta) => {
    const updated = updateCartItemQty(id, size, delta)
    setItems(updated)
  }

  const handleRemoveWishlist = (id) => {
    const updated = removeFromWishlist(id)
    setWishlistItems(updated)
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const taxes = subtotal * TAX_RATE
  const total = subtotal + taxes + SHIPPING
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)

  const handleOpenCheckout = () => {
    setForm({ name: '', address: '', phone: '' })
    setFormError('')
    setOrderSuccess(null)
    setShowCheckout(true)
  }

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setFormError('')
  }

  const handlePlaceOrder = () => {
    if (!form.name.trim() || !form.address.trim() || !form.phone.trim()) {
      setFormError('Please fill in all fields.')
      return
    }
    const order = placeOrder({
      items: [...items],
      subtotal,
      taxes,
      total,
      name: form.name.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
    })
    saveCart([])
    setItems([])
    setOrders(getOrders())
    setOrderSuccess(order)
  }

  const handleCloseCheckout = () => {
    setShowCheckout(false)
    setOrderSuccess(null)
    if (orderSuccess) setActiveTab('My Orders')
  }

  const fmt = (n) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="cart-page">
      <div className="cart-header-sticky">
        <Header isSolid={true} />
      </div>

      <div className="cart-tab-nav">
        <button className="cart-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          ← Continue Shopping
        </button>
        {TABS.map(tab => (
          <button
            key={tab}
            className={`cart-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'My Cart' && (
        <div className="cart-body">
          <div className="cart-items-col">
            {items.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
                <Link to="/explore" className="cart-empty-link">Continue Shopping</Link>
              </div>
            ) : (
              items.map(item => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>
                  <div className="cart-item-info">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="cart-item-price">₱{Number(item.price).toLocaleString()}.00</p>
                    <p className="cart-item-desc">{item.desc}</p>
                    <p className="cart-item-size">Size: {item.size}</p>
                    <div className="cart-qty-row">
                      <button className="cart-qty-btn" onClick={() => changeQty(item.id, item.size, -1)} aria-label="Decrease quantity">−</button>
                      <span className="cart-qty-val">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => changeQty(item.id, item.size, +1)} aria-label="Increase quantity">+</button>
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
                <span>₱{fmt(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>₱{fmt(SHIPPING)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Taxes</span>
                <span>₱{fmt(taxes)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Discount</span>
                <span>₱0.00</span>
              </div>
              <hr className="cart-summary-divider" />
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>₱{fmt(total)}</span>
              </div>
              <button
                className="cart-checkout-btn"
                onClick={handleOpenCheckout}
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      )}

      {activeTab === 'My Wishlist' && (
        <div className="cart-body">
          <div className="cart-items-col">
            {wishlistItems.length === 0 ? (
              <div className="cart-empty">
                <p>Your wishlist is empty.</p>
                <Link to="/explore" className="cart-empty-link">Browse Collection</Link>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlistItems.map(item => (
                  <div key={item.id} className="wishlist-card">
                    <Link to={`/product/${item.slug || item.id}`} className="wishlist-card-link">
                      <div className="wishlist-card-img-wrap">
                        <img src={item.image} alt={item.name} className="wishlist-card-img" />
                      </div>
                      <div className="wishlist-card-info">
                        <p className="wishlist-card-name">{item.name}</p>
                        {item.edition && <p className="wishlist-card-edition">{item.edition}</p>}
                        <p className="wishlist-card-price">₱{Number(item.price).toLocaleString()}.00</p>
                      </div>
                    </Link>
                    <button
                      className="wishlist-card-remove"
                      onClick={() => handleRemoveWishlist(item.id)}
                      aria-label="Remove from wishlist"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'My Orders' && (
        <div className="cart-body">
          <div className="cart-items-col">
            {orders.length === 0 ? (
              <div className="cart-empty">
                <p>No orders placed yet.</p>
                <Link to="/explore" className="cart-empty-link">Start Shopping</Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div className="order-card-id-row">
                        <span className="order-id">{order.id}</span>
                        <span className="order-status">{order.status}</span>
                      </div>
                      <span className="order-date">
                        {new Date(order.placedAt).toLocaleDateString('en-PH', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="order-card-body">
                      <div className="order-info-col">
                        <p className="order-info-label">Recipient</p>
                        <p className="order-info-val">{order.name}</p>
                        <p className="order-info-label">Address</p>
                        <p className="order-info-val">{order.address}</p>
                        <p className="order-info-label">Phone</p>
                        <p className="order-info-val">{order.phone}</p>
                      </div>
                      <div className="order-items-col">
                        {order.items.map(item => (
                          <div key={`${item.id}-${item.size}`} className="order-item-row">
                            <img src={item.image} alt={item.name} className="order-item-img" />
                            <div className="order-item-details">
                              <p className="order-item-name">{item.name}</p>
                              <p className="order-item-meta">Size: {item.size} &nbsp;·&nbsp; Qty: {item.qty}</p>
                              <p className="order-item-price">₱{Number(item.price).toLocaleString()}.00</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-total-col">
                        <p className="order-total-label">Total</p>
                        <p className="order-total-val">₱{fmt(order.total)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="checkout-overlay" onClick={handleCloseCheckout}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            {orderSuccess ? (
              <div className="checkout-success">
                <p className="checkout-success-icon">✓</p>
                <h2 className="checkout-success-title">Order Placed</h2>
                <p className="checkout-success-id">{orderSuccess.id}</p>
                <p className="checkout-success-msg">
                  Thank you, {orderSuccess.name}. Your order is now being processed and will be delivered to your provided address.
                </p>
                <button className="checkout-close-btn" onClick={handleCloseCheckout}>
                  View My Orders
                </button>
              </div>
            ) : (
              <>
                <h2 className="checkout-modal-title">Delivery Details</h2>
                <hr className="checkout-modal-divider" />

                <div className="checkout-order-preview">
                  <p className="checkout-preview-label">Order Summary</p>
                  <div className="checkout-preview-row">
                    <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
                    <span>₱{fmt(subtotal)}</span>
                  </div>
                  <div className="checkout-preview-row">
                    <span>Taxes (8%)</span>
                    <span>₱{fmt(taxes)}</span>
                  </div>
                  <div className="checkout-preview-row checkout-preview-total">
                    <span>Total</span>
                    <span>₱{fmt(total)}</span>
                  </div>
                </div>

                <hr className="checkout-modal-divider" />

                <div className="checkout-form">
                  <label className="checkout-label">Full Name</label>
                  <input
                    className="checkout-input"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Juan dela Cruz"
                    autoComplete="name"
                  />

                  <label className="checkout-label">Delivery Address</label>
                  <input
                    className="checkout-input"
                    name="address"
                    value={form.address}
                    onChange={handleFormChange}
                    placeholder="Street, City, Province, ZIP"
                    autoComplete="street-address"
                  />

                  <label className="checkout-label">Phone Number</label>
                  <input
                    className="checkout-input"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="e.g. 09XX XXX XXXX"
                    autoComplete="tel"
                  />

                  {formError && <p className="checkout-error">{formError}</p>}
                </div>

                <button className="checkout-submit-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
                <button className="checkout-cancel-btn" onClick={handleCloseCheckout}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
