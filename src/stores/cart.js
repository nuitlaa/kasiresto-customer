import { defineStore } from 'pinia'

function cartKey(mejaId) {
  return `cart_${mejaId}`
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    mejaId: null,
    items: [],
    taxConfig: null,
    servicesConfig: [],
    locked: false,
    paymentMethod: null
  }),

  getters: {
    subtotal(state) {
      return state.items.reduce((sum, item) => {
        const harga = Number(item.harga) || 0
        return sum + harga * item.qty
      }, 0)
    },

    tax() {
      if (!this.taxConfig) return 0
      return Math.round(this.subtotal * (Number(this.taxConfig.value) || 0))
    },

    service() {
      if (!Array.isArray(this.servicesConfig)) return 0
      return this.servicesConfig.reduce(
        (sum, s) => sum + (Number(s.value) || 0),
        0
      )
    },

    total() {
      return this.subtotal + this.tax + this.service
    },

    totalQty(state) {
      return state.items.reduce((sum, i) => sum + i.qty, 0)
    }
  },

  actions: {
    /* ================= INIT ================= */
    init(mejaId) {
      this.mejaId = mejaId

      const saved = localStorage.getItem(cartKey(mejaId))
      if (saved) {
        const data = JSON.parse(saved)
        this.items = data.items || []
        this.taxConfig = data.taxConfig || null
        this.servicesConfig = data.servicesConfig || []
        this.locked = data.locked || false
      }
    },

    /* ================= SAVE ================= */
    save() {
      if (!this.mejaId) return

      localStorage.setItem(
        cartKey(this.mejaId),
        JSON.stringify({
          items: this.items,
          taxConfig: this.taxConfig,
          servicesConfig: this.servicesConfig,
          locked: this.locked
        })
      )
    },

    /* ================= CONFIG ================= */
    setConfig({ tax, services }) {
      this.taxConfig = tax
      this.servicesConfig = services || []
      this.save()
    },

    /* ================= CART ACTION ================= */
    add(menu) {
      if (this.locked) return

      const harga = Number(menu.harga) || 0
      const existing = this.items.find(
        i => i.variant_id === menu.variant_id
      )

      if (existing) existing.qty++
      else {
        this.items.push({
          variant_id: menu.variant_id,
          name: menu.variant_name || menu.product_name,
          harga,
          qty: 1
        })
      }

      this.save()
    },

    increase(id) {
      if (this.locked) return
      const item = this.items.find(i => i.variant_id === id)
      if (item) {
        item.qty++
        this.save()
      }
    },

    decrease(id) {
      if (this.locked) return
      const item = this.items.find(i => i.variant_id === id)
      if (!item) return

      if (item.qty > 1) item.qty--
      else this.remove(id)

      this.save()
    },

    remove(id) {
      if (this.locked) return
      this.items = this.items.filter(i => i.variant_id !== id)
      this.save()
    },

    /* ================= CHECKOUT ================= */
    lock() {
      this.locked = true
      this.save()
    },

    clear() {
      this.items = []
      this.locked = false
      this.paymentMethod = null
      this.subtotal = 0
      this.tax = 0
      this.service = 0
      this.total = 0 
      this.save()
      localStorage.removeItem('cart')
      localStorage.removeItem(cartKey(this.mejaId))
    },

    /* ==================== to Payment ================== */
    setPaymentMethod(method) {
      this.paymentMethod = method
      this.save()
    },
    payload() {
      return {
        meja_id: this.mejaId,
        payment_method: this.paymentMethod,
        items: this.items,
        subtotal: this.subtotal,
        tax: this.tax,
        service: this.service,
        total: this.total
      }
    },
    load() {
      const data = localStorage.getItem(`cart_${this.mejaId}`)
      if (data) {
        Object.assign(this.$state, JSON.parse(data))
      }
    }
  }
})
