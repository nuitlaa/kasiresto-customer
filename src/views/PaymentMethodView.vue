<template>
  <div class="page">
    <h2>Pilih Metode Pembayaran</h2>

    <div class="methods">
      <div
        class="method"
        :class="{ active: selected === 'tunai' }"
        @click="select('tunai')"
      >
        💵 Tunai
      </div>

      <div
        class="method"
        :class="{ active: selected === 'va' }"
        @click="select('va')"
      >
        🏦 Virtual Account
      </div>

      <div
        class="method"
        :class="{ active: selected === 'qris' }"
        @click="select('qris')"
      >
        📱 QR Code
      </div>
    </div>

    <button
      class="btn-confirm"
      :disabled="!selected"
      @click="confirm"
    >
      Lanjutkan
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const router = useRouter()
const selected = ref(null)

function select(method) {
  selected.value = method
}

function confirm() {
  cart.setPaymentMethod(selected.value)
  router.push('/checkout')
}
</script>

<style scoped>
.page {
  padding: 16px;
}

.methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
}

.method {
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.method.active {
  border-color: #e53935;
  background: #fff3f3;
}

.btn-confirm {
  width: 100%;
  padding: 14px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 10px;
}
</style>
