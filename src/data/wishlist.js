import { products } from './products.js'

const WISHLIST_KEY = 'cavaliere_wishlist'

export const getWishlist = () => {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    const list = raw ? JSON.parse(raw) : []
    return list.map(item => {
      if (!item.slug) {
        const found = products.find(p => p.id === item.id)
        if (found) {
          return { ...item, slug: found.slug }
        }
      }
      return item
    })
  } catch {
    return []
  }
}

const saveWishlist = (items) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
    window.dispatchEvent(new Event('wishlistUpdated'))
  } catch (e) {
    void e
  }
}

export const isWishlisted = (id) => getWishlist().some(item => item.id === id)

export const toggleWishlistItem = (product) => {
  const current = getWishlist()
  const idx = current.findIndex(item => item.id === product.id)
  if (idx > -1) {
    current.splice(idx, 1)
  } else {
    current.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      edition: product.edition || '',
    })
  }
  saveWishlist(current)
  return idx === -1
}

export const removeFromWishlist = (id) => {
  const updated = getWishlist().filter(item => item.id !== id)
  saveWishlist(updated)
  return updated
}
