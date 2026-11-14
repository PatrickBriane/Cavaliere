const ORDERS_KEY = 'cavaliere_orders'

export const getOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const placeOrder = ({ items, subtotal, taxes, total, name, address, phone }) => {
  const orders = getOrders()
  const order = {
    id: `CVL-${Date.now()}`,
    placedAt: new Date().toISOString(),
    name,
    address,
    phone,
    items,
    subtotal,
    taxes,
    total,
    status: 'Processing',
  }
  orders.unshift(order)
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    window.dispatchEvent(new Event('ordersUpdated'))
  } catch (e) {
    void e
  }
  return order
}

