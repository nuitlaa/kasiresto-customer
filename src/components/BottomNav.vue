<template>
  <nav class="bottom-nav">
    <router-link to="/" class="item">🏠<span>Home</span></router-link>
    <router-link to="/trending" class="item">🔥<span>Trending</span></router-link>

    <router-link to="/cart" class="cart">
  🛒
      <span v-if="cart.totalQty" class="badge">
        {{ cart.totalQty }}
      </span>
    </router-link>


    <router-link to="/favorite" class="item">❤️<span>Favorite</span></router-link>
    <router-link to="/profile" class="item">👤<span>Profile</span></router-link>
  </nav>
</template>
<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<style scoped>
  .badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #fff;
    color: #e53935;
    font-size: 11px;
    font-weight: bold;
    min-width: 20px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #e53935;
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 65px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0,0,0,.1);
  }

  .item {
    font-size: 12px;
    color: #777;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .router-link-active {
    color: #e53935;
  }

  .cart {
    position: relative; /* ⬅️ INI KUNCI */
    width: 56px;
    height: 56px;
    background: #e53935;
    color: #fff;
    border-radius: 50%;
    font-size: 22px;
    text-align: center;
    line-height: 56px;
    margin-top: -30px;
    text-decoration: none;
  }

</style>
