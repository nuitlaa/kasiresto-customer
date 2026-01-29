<template>
  <div class="page">
    <h2>Konfirmasi Pesanan</h2>

    
    <!-- INFORMASI PELANGGAN -->
    <section class="customer-info">
      <h3>Informasi Pelanggan</h3>
      <p class="helper">
        Bantu kami melayani Anda dengan lebih baik.  
        Informasi ini juga digunakan untuk pengiriman struk dan promo selanjutnya.
      </p>

      <label>
        Nama Pembeli
        <input type="text" v-model="customer.name" placeholder="Masukkan nama Anda" />
      </label>

      <label>
        Nomor Telepon
        <input type="tel" v-model="customer.phone" placeholder="08xxxxxxxxxx" />
        <small>Digunakan untuk informasi & promo berikutnya</small>
      </label>

      <label>
        Email
        <input type="email" v-model="customer.email" placeholder="email@contoh.com" />
        <small>Struk pembayaran akan dikirim ke email ini</small>
      </label>
    </section>
    <hr />

    <p>Metode Pembayaran:</p>
    <strong>{{ labelPayment }}</strong>

    <hr />

    <p>Subtotal: {{ rupiah(cart.subtotal) }}</p>
    <p>Pajak: {{ rupiah(cart.tax) }}</p>
    <p>Service: {{ rupiah(cart.service) }}</p>

    <h3>Total: {{ rupiah(cart.total) }}</h3>

    <button class="btn-pay" @click="checkout">
      Bayar Sekarang
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const router = useRouter()
const customer = reactive({
  name: '',
  phone: '',
  email: ''
})

const labelPayment = {
  cash: 'Tunai',
  va: 'Virtual Account',
  qris: 'QR Code'
}[cart.paymentMethod]

function rupiah(v) {
  return 'Rp ' + Number(v).toLocaleString('id-ID')
}

async function checkout() {
    const mejaId = localStorage.getItem('mejaId')

    const payload = {
        ...cart.payload(),
        payment_method: cart.paymentMethod, // pastikan ikut
        customer: {
            name: customer.name,
            phone: customer.phone,
            email: customer.email
        }
    }

    const res = await fetch(`/api/${mejaId}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    const result = await res.json()

    if (result.status) {
        cart.clear()                 // 🧹 kosongkan cart
        router.replace('/')          // 🏠 balik ke home
    } else {
        alert(result.msg || 'Checkout gagal')
    }
}

</script>
<style scoped>

.page {
  padding: 16px;
}

.customer-info {
  margin-bottom: 20px;
}

.customer-info h3 {
  margin-bottom: 6px;
}

.helper {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

small {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #777;
}

.btn-pay {
    margin-bottom: 70px;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background: #2c7be5;
  color: white;
  border: none;
  border-radius: 8px;
}
</style>