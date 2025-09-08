// E-commerce utilities for future scaling
export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: 'RUB' | 'USD' | 'EUR'
  category: string
  images: string[]
  tags: string[]
  inStock: boolean
  digitalProduct: boolean
  downloadUrl?: string
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId?: string
  items: CartItem[]
  total: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentMethod: 'card' | 'yoomoney' | 'sber' | 'tinkoff'
  customerInfo: {
    email: string
    name: string
    phone: string
  }
  createdAt: string
  updatedAt: string
}

// Russian payment providers integration
export class PaymentProcessor {
  static async processYooMoney(order: Order): Promise<{ success: boolean; paymentUrl?: string; error?: string }> {
    // YooMoney (Яндекс.Касса) integration
    try {
      // Mock implementation - replace with actual YooMoney API
      const paymentData = {
        amount: {
          value: order.total.toString(),
          currency: order.currency
        },
        confirmation: {
          type: 'redirect',
          return_url: `${window.location.origin}/payment/success`
        },
        capture: true,
        description: `Заказ #${order.id}`
      }

      // Here would be actual API call to YooMoney
      console.log('Processing YooMoney payment:', paymentData)
      
      return {
        success: true,
        paymentUrl: `https://money.yandex.ru/payments/external/confirmation?orderId=${order.id}`
      }
    } catch (error) {
      return {
        success: false,
        error: 'Ошибка при обработке платежа через YooMoney'
      }
    }
  }

  static async processSberPay(order: Order): Promise<{ success: boolean; paymentUrl?: string; error?: string }> {
    // Sberbank integration
    try {
      const paymentData = {
        orderNumber: order.id,
        amount: order.total * 100, // в копейках
        returnUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/failure`,
        description: `Заказ #${order.id}`
      }

      console.log('Processing Sberbank payment:', paymentData)
      
      return {
        success: true,
        paymentUrl: `https://3dsec.sberbank.ru/payment/merchants/test/payment_ru.html?mdOrder=${order.id}`
      }
    } catch (error) {
      return {
        success: false,
        error: 'Ошибка при обработке платежа через Сбербанк'
      }
    }
  }

  static async processTinkoffPay(order: Order): Promise<{ success: boolean; paymentUrl?: string; error?: string }> {
    // Tinkoff Bank integration
    try {
      const paymentData = {
        Amount: order.total * 100, // в копейках
        OrderId: order.id,
        Description: `Заказ #${order.id}`,
        NotificationURL: `${window.location.origin}/api/tinkoff/notification`,
        SuccessURL: `${window.location.origin}/payment/success`,
        FailURL: `${window.location.origin}/payment/failure`
      }

      console.log('Processing Tinkoff payment:', paymentData)
      
      return {
        success: true,
        paymentUrl: `https://securepay.tinkoff.ru/v2/Init?OrderId=${order.id}`
      }
    } catch (error) {
      return {
        success: false,
        error: 'Ошибка при обработке платежа через Тинькофф'
      }
    }
  }
}

// Shopping cart management
export class ShoppingCart {
  private items: CartItem[] = []

  constructor() {
    this.loadFromStorage()
  }

  addItem(productId: string, quantity: number = 1, price: number): void {
    const existingItem = this.items.find(item => item.productId === productId)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({ productId, quantity, price })
    }
    
    this.saveToStorage()
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.productId !== productId)
    this.saveToStorage()
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.productId === productId)
    if (item) {
      item.quantity = quantity
      this.saveToStorage()
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  getItems(): CartItem[] {
    return [...this.items]
  }

  clear(): void {
    this.items = []
    this.saveToStorage()
  }

  private saveToStorage(): void {
    localStorage.setItem('shopping-cart', JSON.stringify(this.items))
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem('shopping-cart')
      if (saved) {
        this.items = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error)
      this.items = []
    }
  }
}

// Product catalog management
export class ProductCatalog {
  static getProducts(): Product[] {
    try {
      const saved = localStorage.getItem('product-catalog')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading products:', error)
      return []
    }
  }

  static saveProducts(products: Product[]): void {
    localStorage.setItem('product-catalog', JSON.stringify(products))
  }

  static addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const products = this.getProducts()
    products.push(newProduct)
    this.saveProducts(products)
    
    return newProduct
  }

  static updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) return null
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.saveProducts(products)
    return products[index]
  }

  static deleteProduct(id: string): boolean {
    const products = this.getProducts()
    const filtered = products.filter(p => p.id !== id)
    
    if (filtered.length === products.length) return false
    
    this.saveProducts(filtered)
    return true
  }
}

// Order management
export class OrderManager {
  static createOrder(
    items: CartItem[],
    customerInfo: Order['customerInfo'],
    paymentMethod: Order['paymentMethod']
  ): Order {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    const order: Order = {
      id: Date.now().toString(),
      items,
      total,
      currency: 'RUB',
      status: 'pending',
      paymentMethod,
      customerInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.saveOrder(order)
    return order
  }

  static getOrders(): Order[] {
    try {
      const saved = localStorage.getItem('orders')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading orders:', error)
      return []
    }
  }

  static saveOrder(order: Order): void {
    const orders = this.getOrders()
    const index = orders.findIndex(o => o.id === order.id)
    
    if (index === -1) {
      orders.push(order)
    } else {
      orders[index] = order
    }
    
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  static updateOrderStatus(orderId: string, status: Order['status']): boolean {
    const orders = this.getOrders()
    const order = orders.find(o => o.id === orderId)
    
    if (!order) return false
    
    order.status = status
    order.updatedAt = new Date().toISOString()
    
    this.saveOrder(order)
    return true
  }
}

// Analytics tracking for e-commerce
export const trackPurchase = (order: Order) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: order.currency,
      items: order.items.map(item => ({
        item_id: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    })
  }
}

export const trackAddToCart = (productId: string, productName: string, price: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'RUB',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        price: price,
        quantity: 1
      }]
    })
  }
}

export const trackViewItem = (product: Product) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_item', {
      currency: product.currency,
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1
      }]
    })
  }
}