<template>
  <div class="page">
    <button class="back" @click="$router.back()">←</button>

    <img :src="menuImage(menu)" class="image" />

    <h2>{{ menuName(menu) }}</h2>

    <p class="price">
      {{ menu.harga ? formatRupiah(menu.harga) : 'Harga belum tersedia' }}
    </p>

    <button class="btn-add" @click="cart.add(menu)">
      Tambah ke Keranjang
    </button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCartStore } from '@/stores/cart'

  const route = useRoute()
  const cart = useCartStore()
  const menu = ref({})

  onMounted(async () => {
    const mejaId = localStorage.getItem('mejaId')
    const res = await fetch(`/api/${mejaId}/menu`)
    const data = await res.json()

    menu.value = data.menu.find(
      m => m.variant_id == route.params.id
    )
  })

  function menuName(menu) {
    return menu.variant_name || menu.product_name
  }

  function menuImage(menu) {
    if (!menu?.foto)
      return 'https://via.placeholder.com/400x300'

    return menu.foto.startsWith('http')
      ? menu.foto
      : `https://${menu.foto}`
  }

  function formatRupiah(val) {
    return 'Rp ' + Number(val).toLocaleString('id-ID')
  }
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 90px;
}

.back {
  background: none;
  border: none;
  font-size: 16px;
  margin-bottom: 8px;
}

.hero {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 12px;
}
</style>
