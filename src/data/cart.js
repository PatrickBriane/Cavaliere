const CART_STORAGE_KEY = 'cavaliere_cart_items'

export const getCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const saveCart = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new Event('cartUpdated'))
  } catch (e) {
    void e
  }
}

export const addToCart = (product, size) => {
  const current = getCart()
  const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard'
  const existingIndex = current.findIndex(
    item => item.id === product.id && item.size === chosenSize
  )

  if (existingIndex > -1) {
    current[existingIndex].qty += 1
  } else {
    current.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: chosenSize,
      qty: 1,
      image: product.image,
      desc: product.description ? product.description.split('\n')[0] : ''
    })
  }

  saveCart(current)
}

export const updateCartItemQty = (id, size, delta) => {
  let current = getCart()
  current = current
    .map(item => {
      if (item.id === id && item.size === size) {
        return { ...item, qty: item.qty + delta }
      }
      return item
    })
    .filter(item => item.qty > 0)

  saveCart(current)
  return current
}

export const removeCartItem = (id, size) => {
  const current = getCart().filter(item => !(item.id === id && item.size === size))
  saveCart(current)
  return current
}

export const getCartItemCount = () => {
  const items = getCart()
  return items.reduce((sum, item) => sum + item.qty, 0)
}

