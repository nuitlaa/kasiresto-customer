<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
const cart = useCartStore()
const router = useRouter()


function formatRupiah(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}
async function checkout() {
  if (cart.locked) return

  const payload = {
    meja_id: cart.mejaId,
    items: cart.items.map(i => ({
      variant_id: i.variant_id,
      qty: i.qty,
      harga: i.harga,
      subtotal: i.harga * i.qty
    })),
    subtotal: cart.subtotal,
    tax: {
      name: cart.taxConfig?.name,
      value: cart.tax
    },
    services: cart.servicesConfig,
    total: cart.total
  }

  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    cart.lock()
    alert('Order berhasil dikirim ke kasir')
  }
}
function goPayment() {
  router.push('/payment')
}

</script>

<template>
  <div class="page">
    <h2>Keranjang</h2>

    <div v-for="item in cart.items" :key="item.variant_id" class="cart-item">
      <div class="info">
        <h4>{{ item.name }}</h4>

        <div class="price-row">
          <span>{{ formatRupiah(item.harga) }}</span>
          <span>Subtotal: {{ formatRupiah(item.harga * item.qty) }}</span>
        </div>

        <div class="qty">
          <button @click="cart.decrease(item.variant_id)">−</button>
          <span>{{ item.qty }}</span>
          <button @click="cart.increase(item.variant_id)">+</button>
        </div>
      </div>

      <button class="btn-remove" @click="cart.remove(item.variant_id)">✕</button>
    </div>

    <div class="total">
      Total:
      <b>{{ formatRupiah(cart.subtotal) }}</b>
    </div>
    <div class="summary">
      <div>
        Pajak ({{ cart.taxConfig?.name }})
        <span>{{ formatRupiah(cart.tax) }}</span>
      </div>

      <div
        v-for="s in cart.servicesConfig"
        :key="s.name"
      >
        {{ s.name }}
        <span>{{ formatRupiah(s.value) }}</span>
      </div>

      <hr />

      <div class="grand">
        Total <b>{{ formatRupiah(cart.total) }}</b>
      </div>
    </div>


    <button class="btn-checkout" @click="goPayment">
      Checkout
    </button>

  </div>
</template>
<style scoped>
.summary {
  margin-top: 16px;
  font-size: 14px;
}

.summary div {
  display: flex;
  justify-content: space-between;
}

.grand {
  font-size: 18px;
}

.qty {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.qty button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: #e53935;
  color: #fff;
  font-size: 18px;
}

.page {
  padding: 16px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info h4 {
  margin: 0;
  font-size: 15px;
}

.price-row {
  font-size: 13px;
  color: #555;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.btn-remove {
  border: none;
  background: transparent;
  color: #e53935;
  font-size: 18px;
  cursor: pointer;
}

.total {
  margin-top: 16px;
  font-size: 18px;
  text-align: right;
}
</style>
