<template>
  <RouterView v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </RouterView>

  <BottomNav />
</template>

<script setup>
import { ref, watch,onMounted  } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from './components/BottomNav.vue'
import { useCartStore } from '@/stores/cart'
 
const cart = useCartStore()
const route = useRoute()
const transitionName = ref('slide-left')

onMounted(() => {
  const mejaId = route.params.mejaId || localStorage.getItem('mejaId')
  cart.init(mejaId)
})

watch(
  () => route.fullPath,
  (to, from) => {
    transitionName.value =
      to.length > from.length ? 'slide-left' : 'slide-right'
  }
)
</script>

<style>
/* SLIDE LEFT */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}

/* SLIDE RIGHT */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(30%);
  opacity: 0;
}
</style>
