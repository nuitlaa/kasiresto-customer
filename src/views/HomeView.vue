<template>
  <div class="page">
    <h2 class="title">Daftar Menu</h2>

    <div class="grid">
      <div class="card" v-for="menu in menus" :key="menu.variant_id" @click="goDetail(menu.variant_id)" >
        <img :src="menuImage(menu)" />

        <div class="info">
          <h4>{{ menuName(menu) }}</h4>

          <p class="price">
            {{ menu.harga ? formatRupiah(menu.harga) : 'Harga belum tersedia' }}
          </p>

          <button class="btn-add" @click.stop="cart.add(menu)">
            + Tambah
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCartStore } from '@/stores/cart' 
  
  const cart = useCartStore()

  const route = useRoute()
  const router = useRouter()

  const menus = ref([])
  const DEFAULT_MEJA = 'UFvW9cztYj'

  async function loadMenu() {
    const mejaId = route.params.mejaId || localStorage.getItem('mejaId') || DEFAULT_MEJA

    localStorage.setItem('mejaId', mejaId)
    cart.init(mejaId)

    const res = await fetch(`/api/${mejaId}/menu`)
    const data = await res.json()
    cart.setConfig({
      tax: data.tax,
      services: data.services || []
    })

    menus.value = data.menu || []
  }

  onMounted(loadMenu)

  // 🔥 ini kunci penting
  watch(
    () => route.params.mejaId,
    () => {
      loadMenu()
    }
  )

  function goDetail(id) {
    router.push(`/menu/${id}`)
  }

  function menuName(menu) {
    return menu.variant_name || menu.product_name
  }

  function menuImage(menu) {
    if (!menu.foto) {
      return 'https://via.placeholder.com/300x200?text=No+Image'
    }

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
  }

  .title {
    margin-bottom: 12px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 70px;
  }

  .card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }

  .card img {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  .info {
    padding: 8px;
  }

  .info h4 {
    margin: 0;
    font-size: 14px;
  }

  .price {
    font-size: 12px;
    color: #666;
  }
</style>
